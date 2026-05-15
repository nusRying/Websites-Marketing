import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) return null

  return new Stripe(secretKey, {
    apiVersion: '2026-03-25.dahlia' as any,
  })
}

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) return null

  return createClient(supabaseUrl, serviceRoleKey)
}

export async function POST(request: Request) {
  const stripe = getStripe()
  const supabaseAdmin = getSupabaseAdmin()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripe || !supabaseAdmin || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook is not configured yet.' },
      { status: 503 }
    )
  }

  const body = await request.text()
  const sig = (await headers()).get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id
        const customerId = session.customer as string

        if (userId) {
          const { error } = await supabaseAdmin
            .from('profiles')
            .update({ 
              stripe_customer_id: customerId,
              subscription_status: 'active' 
            })
            .eq('id', userId)
          
          if (error) throw error
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ subscription_status: subscription.status })
          .eq('stripe_customer_id', customerId)

        if (error) throw error
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ subscription_status: 'inactive' })
          .eq('stripe_customer_id', customerId)
        
        if (error) throw error
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook processing failed:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
