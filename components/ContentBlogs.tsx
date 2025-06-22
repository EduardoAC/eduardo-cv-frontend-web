import Image from 'next/image'
import Link from 'next/link'
import styles from './ContentBlogs.module.scss'

export default function ContentBlogs() {
  return (
    <section className={`container clearfix ${styles['content-blogs']}`}>
      <h2>Business and Technology Addiction</h2>
      <div className="col-md-5">
        <Image
          src="/images/ideas-content-blog.jpg"
          alt="Ideas Content Blog"
          width={400}
          height={300}
          className="img-responsive"
        />
      </div>
      <div className="col-md-7">
        <p className="text">
          I'm passionate about technology, business and personal growing so I wanted to contribute to internet sharing
        </p>
        <p className="text">
          Therefore I added two areas in that will contribute with my own posts and ideas about it
        </p>
        <p className="text">
          These are <Link href="/blog">business and technology blog</Link> and <Link href="/forum">the brainstorming forum</Link>
        </p>
        <p className="text">
          where I publish different about topic related with all the topics that I mentioned before
        </p>
      </div>
    </section>
  )
} 