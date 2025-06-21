import Image from 'next/image'

export default function Introduction() {
  return (
    <section className="introduction">
      <Image
        src="/images/introduction-image-1280.jpg"
        alt="Eduardo Aparicio Cardenes Introduction"
        width={1280}
        height={853}
        className="img-responsive"
        priority
      />
      <div className="title-block">
        <h1>
          <p>Welcome to my interactive curriculum</p>
          <p>My name is Eduardo Aparicio Cardenes</p>
        </h1>
        <p className="hidden-xs">One place that define my worker soul and share with you</p>
      </div>
    </section>
  )
} 