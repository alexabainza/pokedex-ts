import { useEffect, useState } from "react";
import data from "../../type-char.json";
import FindTypeColor from "../utils/FindTypeColor";
import CharacterModal from "./CharacterModal";

const CharacterCard = ({ details, count }) => {
  const [showModal, setShowModal] = useState(false);
  const [pokeIndex, setPokeIndex] = useState(parseInt(details.id));
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [type, setType] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listViewType, setListViewType] = useState([]);
  useEffect(() => {
    getPokemonInfo(pokeIndex);
    getType(details.id);
  }, [pokeIndex]);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setPokeIndex(parseInt(details.id));
  };
  const handleNextPokemon = () => {
    setPokeIndex((prevIndex) => (prevIndex + 1) % count);
  };

  const handlePrevPokemon = () => {
    setPokeIndex((prevIndex) => (prevIndex - 1 + count) % count);
  };

  function getType(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setListViewType(json.types.map((type) => type.type.name));
      });
  }
  function getPokemonInfo(id: number) {
    setIsLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);

        setPokemonInfo(json);
        setType(
          json.types.map((type: { type: { name: any } }) => type.type.name)
        );
        const formatted_id = String(id).padStart(3, "0");
        const updatedPokemonInfo = {
          ...json,
          type: json.types.map((type) => type.type.name),
          image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatted_id}.png`,
          stats: json.stats.map((stat) => ({
            name: stat.stat.name,
            effort: stat.effort,
            base_stat: stat.base_stat,
          })),
        };

        setPokemonInfo(updatedPokemonInfo);
        findWeakness(json.types.map((type) => type.type.name));
      });
  }

  function findWeakness(pokemon_types) {
    const allWeaknesses = pokemon_types.reduce((accumulator, type) => {
      const type_info = data.items.find(
        (one_type) => type.toLowerCase() === one_type.type.toLowerCase()
      );
      if (type_info) {
        const weakAgainst = type_info.weak_against.split(", ").filter(Boolean);
        accumulator.push(...weakAgainst);
      }
      return accumulator;
    }, []);

    setWeaknesses(allWeaknesses);
  }

  return (
    <>
      <div
        style={{ height: "60vh", width: "20vw" }}
        className="flex flex-col py-5 px-8 border-2 bg-white rounded-2xl shadow-xl hover:scale-125 transition-transform duration-300 ease-in-out border-red-200"
        onClick={handleCardClick}
      >
        <img
          src={details.image}
          className="h-[65%] self-center w-auto object-cover"
        ></img>
        <div className="flex flex-col align-middle justify-left items-left">
          <div className="flex flex-col mb-5">
            <h1 className="text-2xl lg:text-3xl md:text-xl sm:text-lg font-semibold text-blue-800">
              {details.name}
            </h1>
            <p className=" text-gray-500 lg:text-xl md:text-lg sm:text-md  text-xl font-regular">
              #{String(details.id).padStart(3, "0")}
            </p>
          </div>
          <div className="flex gap-2">
            {listViewType.map((typeName, index) => (
              <span
                key={index}
                className="py-2.5 px-5 me-2 mb-2 text-lg font-medium text-white rounded-lg"
                style={{ backgroundColor: FindTypeColor(typeName) }}
              >
                {typeName}
              </span>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <CharacterModal
          pokemonInfo={pokemonInfo}
          weaknesses={weaknesses}
          handleClose={handleClose}
          handleNextPokemon={handleNextPokemon}
          handlePrevPokemon={handlePrevPokemon}
        />
      )}
    </>
  );
};

export default CharacterCard;
