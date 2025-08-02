'use client';

import React, { useState } from 'react';
import styles from './Blog.module.scss';

interface SearchBarProps {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onChange, 
  placeholder = 'Search...',
  className = ''
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onChange?.(value);
  };

  return (
    <div className={`${styles['search-container']} ${className}`} role="search">
      <div className={styles['search-icon']}>
        <svg
          className={styles['search-svg']}
          fill="none"
          width="24"
          height="24"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <input
        type="text"
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder={placeholder}
        className={styles['search-input']}
      />
      
      {searchValue && (
        <button
          onClick={() => onChange('')}
          className={styles['clear-button']}
          aria-label="Clear search"
        >
          <svg
            className={styles['clear-svg']}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar; 