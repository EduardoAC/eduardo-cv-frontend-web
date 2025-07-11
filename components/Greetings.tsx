import Image from 'next/image'
import Link from 'next/link'
import styles from './Greetings.module.scss'

export default function Greetings() {
  return (
    <section className={styles['greetings-contact']}>
      <div className="snap-container">
        <h2>Thanks for reading my interactive curriculum</h2>
        <div className="snap-grid">
          <div className="snap-col snap-col-md-5">
            <Image
              src="/images/finding-the-secrets-optimized-1280.webp"
              alt="Finding the Secrets"
              width={400}
              height={300}
              className="snap-img-fluid"
            />
          </div>
          <div className="snap-col snap-col-md-7">
            <p className="text">
              I hope you like it. Discover more in each page some of them have amazing secrets. As my frontend career is done in Angular and NodeJs
            </p>
            <p className="text">
              Are you ready to discover all of them? Then go to <Link href="/projects/how-do-i-build-it">how did i build my interactive CV</Link>
            </p>
            <p className="text">
              Do you want to hire me or give me some feedback? You can <a href="mailto:eduardo@dreammakerfactory.com">contact me by email</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 