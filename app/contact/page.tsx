import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import styles from "./Contact.module.scss";
import Image from "next/image";
import { getSiteImageDimensions } from '@/lib/images/siteImageData';
import { CONTACT_BACKGROUND_IMAGE_SIZES } from '@/lib/images/siteSizes';

const backgroundImageSrc = '/images/world-wide-map-optimized.svg';
const backgroundImageDimensions = getSiteImageDimensions(backgroundImageSrc, { width: 940, height: 415 });

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduardo-aparicio-cardenes.website';
  return {
    title: "Contact - Eduardo Aparicio Cardenes",
    description:
      "Get in touch with Eduardo Aparicio Cardenes for business inquiries, collaborations, or any questions.",
    openGraph: {
      images: [`${baseUrl}/images/world-wide-map-optimized.svg`],
    },
  };
}

export default function ContactPage() {
  return (
    <div className={styles.contact_or_hire_me}>
      <Image
        src={backgroundImageSrc}
        alt=""
        width={backgroundImageDimensions.width}
        height={backgroundImageDimensions.height}
        className={styles.wold_wide_map}
        sizes={CONTACT_BACKGROUND_IMAGE_SIZES}
        aria-hidden="true"
      />
      <div className={styles.heading_block}>
        <h1>Hire or contact me</h1>
        <p>
          If you want to hire me or just want to contact me, you can do it
          through the following form. I will get back to you as soon as
          possible.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
