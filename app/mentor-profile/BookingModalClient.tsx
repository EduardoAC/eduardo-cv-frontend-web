"use client";
import React, { useState } from 'react';
import Modal from './Modal';
import styles from './MentorProfile.module.scss';

interface Platform {
  name: string;
  url: string;
  logo: string;
  logoWidth: number;
  description: string;
  bookingWidget?: string;
}

export default function BookingModalClient({ platform }: { platform: Platform }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const handleBookSession = () => {
    if (platform.bookingWidget) {
      setModalContent(platform.bookingWidget);
      setModalOpen(true);
    } else {
      window.open(platform.url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <>
      <div
        className={styles.bookSessionPlain}
        onClick={handleBookSession}
        role="button"
        tabIndex={0}
        onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleBookSession(); }}
        style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
      >
        Book a session
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginLeft: 8 }}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent && (
          <div dangerouslySetInnerHTML={{ __html: modalContent }} />
        )}
      </Modal>
    </>
  );
} 