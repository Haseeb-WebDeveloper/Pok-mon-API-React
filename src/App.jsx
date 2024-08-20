import { useEffect, useState, useCallback } from 'react';
import './App.css';
import PokemonCard from './Components/PokemonCard';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [search, setSearch] = useState("")

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

  // Search Functionality
  const searchPokemon = pokemonDetails.filter((currentPokemon) =>
    currentPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        {/* {pokemonList.length  && <div>Pokémon list loaded successfully!</div>}
        {pokemonDetails.length  && <h1>Pokémon details loaded successfully!</h1>} */}
      </div>
      <div className=''>
        <div className='max-w-[1400px] mx-auto flex flex-col py-4'>
          <div>
            <h1 className='text-center text-[6vw] md:text-[4vw] font-semibold text-gray-950 pb-4'>Let's Catch Pokémon</h1>
          </div>
          <div id='Search'>
            <div className='mx-auto mb-8 max-w-[300px]'>
              <input
                className='w-full p-2 border border-gray-300 rounded focus:outline-none'
                type="search"
                name='search'
                placeholder='Search Pokémon'
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 px-4 md:px-6 lg:px-10'>
            {searchPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} PokimonData={pokemon} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
