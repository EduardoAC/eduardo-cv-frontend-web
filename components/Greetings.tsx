import Image from 'next/image'
import Link from 'next/link'

export default function Greetings() {
  return (
    <section className="container clearfix greetings-contact">
      <h2>Thanks for reading my interactive curriculum</h2>
      <div className="col-md-5">
        <Image
          src="/images/finding-the-secrets.jpg"
          alt="Finding the Secrets"
          width={400}
          height={300}
          className="img-responsive"
        />
      </div>
      <div className="col-md-7">
        <p className="text">
          I hope you like it. Discover more in each page some of them have amazing secrets. As my frontend career is done in Angular and NodeJs
        </p>
        <p className="text">
          Are you ready to discover all of them? Then go to <Link href="/projects/how-did-i-build-my-interactive-cv">how did i build my interactive CV</Link>
        </p>
        <p className="text">
          Do you want to hire me or give me some feedback? You can <a href="mailto:eduardo@dreammakerfactory.com">contact me by email</a>
        </p>
        <div className="social-icons">
          <a href="https://github.com/EduardoAC" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/eduardo-aparicio-cardenes" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-linkedin"></i>
          </a>
        </div>
      </div>
    </section>
  )
} 