'use client';

import React from 'react';
import styles from './TagFilter.module.scss';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onTagToggle,
  onClearAll,
}) => {
  if (tags.length === 0) return null;

  return (
    <div className={styles.tagFilter}>
      <div className={styles.tagFilterHeader}>
        <h3 className='heading4'>Filter by tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className={styles.clearAll}
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className={styles.tagList}>
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`${styles.tagButton} ${isSelected ? styles.activeTag : ''}`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagFilter; 