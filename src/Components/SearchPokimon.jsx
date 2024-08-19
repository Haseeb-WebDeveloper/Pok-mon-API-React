import React, { useState } from 'react';

function SearchPokimon({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='mx-auto mb-8 max-w-[300px]'>
      <input 
        className='w-full p-2 border border-gray-300 rounded focus:outline-none' 
        type="search" 
        name='search' 
        placeholder='Search Pokémon' 
        value={searchTerm} 
        onChange={handleSearch} 
      />
    </div>
  );
}

export default SearchPokimon;
