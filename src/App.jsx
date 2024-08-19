import { useEffect, useState, useCallback } from 'react';
import './App.css';
import PokemonCard from './Components/PokemonCard';
import SearchPokimon from './Components/SearchPokimon';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [filteredPokemonDetails, setFilteredPokemonDetails] = useState([]);

  const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  const fetchPokemonList = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPokemonList(data.results);
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
    }
  }, []);

  const fetchPokemonDetails = useCallback(async () => {
    try {
      if (pokemonList.length > 0) {
        const detailPromises = pokemonList.map(pokemon =>
          fetch(pokemon.url).then(response => response.json())
        );
        const details = await Promise.all(detailPromises);
        setPokemonDetails(details);
        setFilteredPokemonDetails(details); // Initialize the filtered list with all Pokémon
      }
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  }, [pokemonList]);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [fetchPokemonDetails]);

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredPokemonDetails(pokemonDetails);
    } else {
      const filtered = pokemonDetails.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemonDetails(filtered);
    }
  };

  return (
    <>
      <div>
        {/* {pokemonList.length  && <div>Pokémon list loaded successfully!</div>}
        {pokemonDetails.length  && <h1>Pokémon details loaded successfully!</h1>} */}
      </div>
      <div className=''>
        <div className='max-w-[1200px] mx-auto flex flex-col py-4'>
          <div>
            <h1 className='text-center text-[6vw] md:text-[4vw] font-semibold text-gray-950 pb-4'>Let's Catch Pokémon</h1>
          </div>
          <div id='Search'>
            <SearchPokimon onSearch={handleSearch} />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 md:px-6 lg:px-10'>
            {filteredPokemonDetails.map((pokemon) => (
              <PokemonCard key={pokemon.id} PokimonData={pokemon} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
