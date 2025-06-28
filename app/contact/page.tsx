import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import styles from './Contact.module.scss';

export const metadata: Metadata = {
  title: 'Contact - Eduardo Aparicio Cardenes',
  description: 'Get in touch with Eduardo Aparicio Cardenes for business inquiries, collaborations, or any questions.',
  openGraph: {
    images: ['/images/world-wide-map-high-res.svg'],
  },
};

export default function ContactPage() {
  return (
    <div className={styles.contact_or_hire_me}>
      <div className={styles.heading_block}>
        <h1>Hire or contact me</h1>
        <p>
          If you want to hire me or just want to contact me, you can do it
          through the following form. I will get back to you as soon as possible.
        </p>
      </div>
      <ContactForm />
    </div>
  );
} 