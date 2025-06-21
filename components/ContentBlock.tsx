import Image from 'next/image';
import styles from './ContentBlock.module.scss';

interface ContentBlockProps {
  title: string;
  description: string;
  imgUrl: string;
  odd: boolean;
}

export default function ContentBlock({
  title,
  description,
  imgUrl,
  odd,
}: ContentBlockProps) {
  const colLeftSwap = 'col-sm-push-6 col-md-push-8';
  const colRightSwap = 'col-sm-pull-6 col-md-pull-4';
  const leftClass = odd ? '' : colLeftSwap;
  const rightClass = odd ? '' : colRightSwap;

  return (
    <div className={styles.content_block}>
      <div className="row">
        <div className={`logo col-sm-6 col-md-4 ${leftClass}`}>
          <div className={styles.thumbnail_mid_container}>
            <div className={styles.thumbnail_mid}>
              <Image
                src={imgUrl}
                alt={title}
                width={300}
                height={300}
                className="img-responsive img-thumbnail"
              />
            </div>
          </div>
        </div>
        <div className={`details col-sm-6 col-md-8 ${rightClass}`}>
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