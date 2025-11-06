import React from 'react';
import './movies.css';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';

export default function Filter({
  minYear, setMinYear,
  maxYear, setMaxYear,
  sort, setSort,
  genres, setGenres,
  title, setTitle
}) {

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'highestrated', label: 'Highest Rated' },
    { value: 'lowestrated', label: 'Lowest Rated' },
  ];

  const genresList = [
    'action', 'drama', 'comedy', 'biography', 'romance', 
    'thriller', 'war', 'history', 'sport', 'sci-fi', 
    'documentary', 'crime', 'fantasy'
  ];

  return (
    <div className="filter-container">
      <div className="filter-row">
        <div className="filter-search-bar">
          <SearchBar title={title} setTitle={setTitle} />
        </div>
        <div className="filter-inputs">
          <Input
            label="Min Year"
            type="number"
            value={minYear}
            setValue={setMinYear}
            inputAttributes={{ placeholder: '1970' }}
          />
          <Input
            label="Max Year"
            type="number"
            value={maxYear}
            setValue={setMaxYear}
            inputAttributes={{ placeholder: '2023' }}
          />
          <SelectInput
            label="Sort By"
            options={sortOptions}
            value={sort}
            setValue={setSort}
          />
        </div>
      </div>
      <div className="filter-row">
        <ul className="filter-tags-list">
          {genresList.map((genre) => (
            <Tag 
              key={genre}
              genre={genre}
              filter={true}
              genres={genres}
              setGenres={setGenres}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

