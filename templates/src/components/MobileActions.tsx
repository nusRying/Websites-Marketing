'use client';

import { Phone, MessageSquare, Calendar } from 'lucide-react';
import styles from './MobileActions.module.css';

interface Props {
  phone: string;
  name: string;
}

export default function MobileActions({ phone, name }: Props) {
  return (
    <div className={styles.mobileBar}>
      <a href={`tel:${phone}`} className={styles.mobileAction}>
        <Phone size={20} />
        <span>Call</span>
      </a>
      <a href={`sms:${phone}`} className={styles.mobileAction}>
        <MessageSquare size={20} />
        <span>Text</span>
      </a>
      <a href="#book" className={styles.primaryAction}>
        <Calendar size={18} />
        <span>Book {name.split(' ')[0]}</span>
      </a>
    </div>
  );
}
