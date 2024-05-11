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
  };

  const handlePrevPokemon = () => {
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
        style={{ height: "60vh", width: "20vw" }}
        className="flex flex-col gap-3 py-5 px-8 border-2 bg-white rounded-2xl shadow-xl hover:scale-125 transition-transform duration-300 ease-in-out border-red-200"
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
            {type.map((typeName, index) => (
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
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>

            <div className="bg-white w-[30%] py-5  flex flex-col justify-center items-center rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
              <div className="w-[100%] flex justify-between align-middle items-center border-2 px-10">
                <h1 className="text-slate-500 text-2xl">#{pokeIndex}</h1>

                <button
                  type="button"
                  onClick={handleClose}
                  className="focus:outline-none w-10 text-slate-900 focus:ring-4 focus:ring-red-300 rounded-lg text-5xl"
                >
                  ×
                </button>
              </div>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="px-10 flex align-middle justify-center items-center">
                  <div className="">
                    <div className="flex flex-row gap-5">
                      <img
                        src={image}
                        className="w-[60%] border-2 object-cover"
                      ></img>

                      <div className="flex flex-col w-[100%] gap-3">
                        <div className="flex flex-col justify-start  align-middle">
                          <p className="font-bold text-md">HEIGHT:</p>
                          <p className="mb-2 text-md font-regular text-slate-700 rounded-xl bg-slate-200 px-[20px] py-2 ">
                            {pokemonInfo.height} cm
                          </p>
                        </div>
                        <div className="flex flex-col justify- align-middle">
                          <p className="font-bold text-sm">WEIGHT</p>
                          <p className="mb-2 text-md font-regular text-slate-700 rounded-xl bg-slate-200 px-[20px] py-2">
                            {pokemonInfo.weight} lb
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-sm">TYPE</p>
                          <div className="flex flex-wrap gap-1">
                            {type.map((typeName, index) => (
                              <span
                                key={index}
                                className="px-5 slign-middle text-lg font-2xl text-white rounded-3xl"
                                style={{
                                  backgroundColor: FindTypeColor(typeName),
                                }}
                              >
                                {typeName}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
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
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={handlePrevPokemon}
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
