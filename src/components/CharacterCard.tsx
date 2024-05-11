import { useEffect, useState } from "react";
import data from "../../type-char.json";
import Spinner from "./Spinner";
import FindTypeColor from "../utils/FindTypeColor";

const CharacterCard = ({ details, count }) => {
  const [selectedId, setSelectedId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pokeIndex, setPokeIndex] = useState(parseInt(details.id));
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [type, setType] = useState([]);
  const [image, setImage] = useState(details.image);
  const [weaknesses, setWeaknesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPokemonInfo(pokeIndex);
  }, [pokeIndex]);

  const handleCardClick = () => {
    setSelectedId(details.id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setPokeIndex(parseInt(details.id));
  };
  const handleNextPokemon = () => {
    setPokeIndex((prevIndex) => (prevIndex + 1) % count);
    console.log("next button clicked");
  };

  const handlePrevPokemon = () => {
    console.log("previous button clicked");
    setPokeIndex((prevIndex) => (prevIndex - 1 + count) % count);
  };

  function getPokemonInfo(id) {
    setIsLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);

        setPokemonInfo(json);
        setType(json.types.map((type) => type.type.name));
        setBackgroundColor(getButtonTypeClass(json.types[0].type.name));
        const formatted_id = String(id).padStart(3, "0");
        setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatted_id}.png`
        );
        findWeakness(json.types[0].type.name);
      });
  }

  function findWeakness(pokemon_type) {
    const type_info = data.items.find(
      (one_type) => pokemon_type.toLowerCase() === one_type.type.toLowerCase()
    );
    if (type_info) {
      const weakness = [
        { label: "Weak against", values: type_info.weak_against },
        { label: "Vulnerable to", values: type_info.vulnerable_to },
      ];
      setWeaknesses(weakness);
    }
  }

  return (
    <>
      <div
        className="flex flex-col gap-3 py-5 px-8 border-2 bg-white rounded-2xl shadow-sm lg:w-1/5 md:w-1/2 sm:w-3/5 w-4/5"
        onClick={handleCardClick}
      >
        <img
          src={details.image}
          className="h-[60%] self-center w-auto object-cover"
        ></img>
        <div className="flex flex-col align-middle justify-center items-center">
          <h1 className="text-lg lg:text-2xl md:text-xl sm:text-lg font-semibold">
            {details.name}
          </h1>
          <p className=" text-gray-600">#{details.id}</p>

          {type.map((typeName, index) => (
            <span
              key={index}
              style={{ backgroundColor: FindTypeColor(typeName) }}
            >
              {typeName}
            </span>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 -auto flex justify-center items-center">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white flex flex-col justify-center items-center rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
              <div className="w-[100%] flex justify-end pe-2">
                <button
                  type="button"
                  onClick={handleClose}
                  class="focus:outline-none w-10 text-slate-900 focus:ring-4 focus:ring-red-300 rounded-lg text-5xl"
                >
                  ×
                </button>
              </div>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="px-10 py-5 flex align-middle justify-center items-center">
                  <div className="">
                    <div className="flex flex-col justify-center align-middle items-center">
                      <img src={image} className="w-[60%]  object-cover"></img>{" "}
                      <h1 className="">#{pokeIndex}</h1>
                      <p className="font-bold text-2xl text-center">
                        {pokemonInfo.name}
                      </p>
                    </div>
                    <div className="flex justify-evenly">
                      <div className="flex flex-col  justify-center items-center ">
                        <p className="font-bold text-sm">HEIGHT</p>
                        <p className="py-1 px-10 mb-2 text-md font-light bg-slate-400  justify-center text-white rounded-2xl border-2">
                          {pokemonInfo.height}
                        </p>
                      </div>
                      <div className="flex flex-col  justify-center items-center ">
                        <p className="font-bold text-sm">WEIGHT</p>
                        <p className="py-1 px-10 mb-2 text-md font-light bg-gray-400 text-white rounded-2xl">
                          {pokemonInfo.weight}
                        </p>
                      </div>{" "}
                    </div>
                    <p>Type: {pokemonInfo.types[0].type.name}</p>
                    <p>Base stats {pokemonInfo.stats[0].base_stat}</p>
                    <p>Effort {pokemonInfo.stats[0].effort}</p>
                    <p>Stat Name: {pokemonInfo.stats[0].stat.name}</p>
                    <p>
                      Abilities:{" "}
                      {pokemonInfo.abilities &&
                        pokemonInfo.abilities
                          .map((ability) => ability.ability.name)
                          .join(", ")}
                    </p>
                    {weaknesses.map((weakness, index) => (
                      <div className="border-2">
                        <p>
                          {weakness.label}: {weakness.values}
                        </p>
                      </div>
                    ))}
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={handlePrevPokemon}
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={handleNextPokemon}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default CharacterCard;
