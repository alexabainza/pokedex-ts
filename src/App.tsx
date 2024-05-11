import { useState, useEffect } from "react";
import pokedexlogo from "./assets/pokedex-logo.png";
import CharacterCard from "./components/CharacterCard";
import Spinner from "./components/Spinner";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonCount, setPokemonCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(5);
  function getPokemonList(limit) {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=0`)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setPokemonCount(json.count);

        console.log("data", json.count);
        const initial_data = json.results.map((pokemon, index) => {
          const id = pokemon.url.split("/")[6];
          const formatted_id = String(id).padStart(3, "0");

          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatted_id}.png`;
          return { ...pokemon, id: id, image: image };
        });

        setPokemonList(initial_data);
      });
  }

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    getPokemonList(limit);
  }, [limit]);

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 20);
  };

  return (
    <div className="">
      <header className="bg-blue-700 py-10 flex items-center justify-center mb-12 h-16 lg:h-32 md:h-20 sm:h-16">
        <img src={pokedexlogo} className="h-12 lg:h-20 md:h-16 sm:h-12" />
      </header>

      <div className="flex flex-col justify-center items-center align-middle">
        <div className="w-screen px-10">
          <div className="relative w-full shadow-lg spread-1 rounded-2xl lg:mb-4 md:mb-3 sm:mb- mb-2">
            <input
              value={searchTerm}
              onChange={handleSearch}
              type="search"
              id="search-dropdown"
              className="block lg:px-8 md:px-6 sm:px-4 px-4 py-2.5 w-full z-20 lg:text-lg md:text-md sm:text-sm text-md text-gray-900 bg-gray-50 rounded-2xl border-gray-300 h-12 lg:h-20 md:h-16 sm:h-4"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 lg:p-2.5 md:p-2 sm:p-1  p-2.5 text-sm font-medium h-full text-white bg-[#FF5350] rounded-e-xl border  hover:bg-red-600"
            >
              <svg
                className="w-8 lg:w-10 md:w-8 sm:w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center mx-2 lg:mx-8 md:mx-4 sm:mx-2 gap-2">
          {pokemonList
            .filter(
              (pokemon) =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pokemon.id.startsWith(searchTerm.toLowerCase())
            )
            .map((pokemon) => (
              <CharacterCard
                key={pokemon.id}
                details={pokemon}
                count={pokemonCount}
                // type={pokemon.types[0].type.name} // Pass the type as a prop
              />
            ))}
        </div>
        {isLoading && <Spinner />}
        <button
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-red-700 text-white rounded-lg"
          onClick={handleShowMore}
        >
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
