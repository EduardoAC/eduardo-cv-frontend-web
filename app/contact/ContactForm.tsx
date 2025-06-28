'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Contact.module.scss';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission,
    // e.g., send the data to an API endpoint.
    setSubmitted(true);
  };

  return (
    <>
      <Image
        src="/images/world-wide-map-high-res.svg"
        alt="World map"
        width={1920}
        height={1080}
        className={styles.wold_wide_map}
      />
      
      {submitted ? (
        <div className="snap-alert snap-alert-success">
          Thank you for your message! I will get back to you as soon as
          possible.
        </div>
      ) : (
        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="snap-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="snap-form-control"
              required
            />
          </div>
          <div className="snap-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="snap-form-control"
              required
            />
          </div>
          <div className="snap-form-group">
            <label htmlFor="body">Message</label>
            <textarea
              id="body"
              name="body"
              className="snap-form-control"
              rows={6}
              required
            ></textarea>
          </div>
          <div className="snap-form-group">
            <button
              type="submit"
              className="snap-btn snap-btn-primary"
              name="contact-button"
            >
              Send Message
            </button>
          </div>
        </form>
      )}
    </>
  );
} 