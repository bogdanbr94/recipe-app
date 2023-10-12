import React from 'react';
import { useState } from "react";

const SearchForm = ({ onSearch, onClose }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
      e.preventDefault();
      onSearch(query);
      onClose();
      setQuery('');
    };
  
    return (
        <div className="searchMeal">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search by meal name" value={query} onChange={(e) => setQuery(e.target.value)}/> 
        <button type="submit">Search</button>
      </form>
      </div>
    );
  };

export default SearchForm;