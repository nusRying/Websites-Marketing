'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import Joyride dynamically to avoid SSR and build-time export issues
const Joyride = dynamic(() => import('react-joyride').then((mod: any) => {
  // react-joyride 3.0.1+ uses named export Joyride
  return mod.Joyride || mod.default || mod;
}), { 
  ssr: false,
  loading: () => null 
});

// STATUS constants from react-joyride
const JOYRIDE_STATUS = {
  FINISHED: 'finished',
  SKIPPED: 'skipped',
};

export default function WelcomeTour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Only run tour for first-time users
    const hasSeenTour = localStorage.getItem('onboarding_complete');
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const steps: any[] = [
    {
      target: 'body',
      content: 'Welcome to the Lead Intelligence Command Center! Let’s get you started with your first high-conversion campaign.',
      placement: 'center',
    },
    {
      target: '[data-tour="batches"]',
      content: 'This is your Pipeline Batch history. Select a target scrape here to load your leads into the engine.',
      placement: 'right',
    },
    {
      target: '[data-tour="stats"]',
      content: 'Monitor your entire funnel here—from identified leads to closed deals.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="lead-table"]',
      content: 'Your qualified leads appear here. You can filter by quality, status, or search for specific businesses.',
      placement: 'top',
    },
    {
      target: '[data-tour="actions"]',
      content: 'Quickly preview a sample site or copy a personalized link for your outreach.',
      placement: 'left',
    },
    {
      target: '[data-tour="system-monitor"]',
      content: 'Keep an eye on the System Engine. It shows you the real-time status of your scraper and AI enrichment workers.',
      placement: 'top',
    }
  ];

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    if ([JOYRIDE_STATUS.FINISHED, JOYRIDE_STATUS.SKIPPED].includes(status as any)) {
      setRun(false);
      localStorage.setItem('onboarding_complete', 'true');
    }
  };

  const JoyrideComponent = Joyride as any;

  return (
    <JoyrideComponent
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          primaryColor: '#3b82f6',
          zIndex: 10000,
          backgroundColor: '#ffffff',
          textColor: '#0f172a',
        },
        tooltipContainer: {
          fontFamily: 'var(--font-inter), sans-serif',
          textAlign: 'left'
        },
        buttonNext: {
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: 700
        }
      }}
    />
  );
}
