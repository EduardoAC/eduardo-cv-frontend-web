import Image from 'next/image';
import styles from './ContentBlock.module.scss';

interface ContentBlockProps {
  title: string;
  description: string;
  imgUrl: string;
  odd: boolean;
  swap?: boolean;
}

export default function ContentBlock({
  title,
  description,
  imgUrl,
  odd,
  swap,
}: ContentBlockProps) {
  const leftClass = swap ? 'snap-order-sm-2 snap-order-md-2' : '';
  const rightClass = swap ? 'snap-order-sm-1 snap-order-md-1' : '';

  return (
    <div className={styles.content_block}>
      <div className="snap-grid">
        <div className={`logo snap-col snap-col-sm-6 snap-col-md-4 ${leftClass}`}>
          <div className={styles.thumbnail_mid_container}>
            <div className={styles.thumbnail_mid}>
              <Image
                src={imgUrl}
                alt={title}
                width={300}
                height={300}
                className="snap-img-fluid"
              />
            </div>
          </div>
        </div>
        <div className={`details snap-col snap-col-sm-6 snap-col-md-8 ${rightClass}`}>
          <h2>{title}</h2>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    </div>
  );
} 