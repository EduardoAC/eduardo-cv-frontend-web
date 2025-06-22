'use client';
import { useState } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './Contact.module.scss';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission,
    // e.g., send the data to an API endpoint.
    setSubmitted(true);
  };

  return (
    <div className={styles.contact_or_hire_me}>
      <Image
        src="/images/world-wide-map-high-res.svg"
        alt="World map"
        width={1920}
        height={1080}
        className={styles.wold_wide_map}
      />
      <div className={styles.heading_block}>
        <h1>Hire or contact me</h1>

        {submitted ? (
          <div className="alert alert-success">
            Thank you for contacting us. We will respond to you as soon as
            possible.
          </div>
        ) : (
          <>
            <p>
              If you have business inquiries or other questions, please fill
              out the following form to contact us. Thank you.
            </p>

            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="body">Message</label>
                <textarea
                  id="body"
                  name="body"
                  className="form-control"
                  rows={6}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="snap-btn snap-btn-primary"
                  name="contact-button"
                >
                  Send Message
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
} 