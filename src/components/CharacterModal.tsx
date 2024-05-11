import { useEffect } from "react";
import FindTypeColor from "../utils/FindTypeColor";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CharacterModal = ({
  pokemonInfo,
  weaknesses,
  handleClose,
  handleNextPokemon,
  handlePrevPokemon,
}) => {
  useEffect(() => {
    console.log(pokemonInfo.stats);
  }, []);
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>

        <div className="bg-white w-[30%] py-5  flex flex-col justify-center items-center rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
          <div className="w-[100%] flex justify-between align-middle items-center px-10">
            <div className="flex gap-2">
              <h1 className="text-slate-500 text-2xl">#{pokemonInfo.id}</h1>
              <h1 className="text-slate-800 font-bold text-2xl">
                {pokemonInfo.name}
              </h1>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="focus:outline-none w-10 text-slate-900 focus:ring-4 focus:ring-red-300 rounded-lg text-5xl"
            >
              ×
            </button>
          </div>

          <div className="px-10 flex align-middle justify-center items-center">
            <div className="">
              <div className="flex flex-row gap-5">
                <img
                  src={pokemonInfo.image}
                  className="w-[60%] object-cover"
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
                      {pokemonInfo.type.map((typeName, index) => (
                        <span
                          key={index}
                          className="px-4 py-1.5 rounded-2xl text-white text-sm"
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
              <div className="flex flex-col gap-2">
                <p className="font-bold text-sm">WEAKNESSES</p>

                <div className="flex flex-wrap gap-1">
                  {weaknesses.map((weakness, index) => (
                    <span
                      className="px-4 py-1.5 rounded-2xl text-white text-sm"
                      style={{
                        backgroundColor: FindTypeColor(weakness.toLowerCase()),
                      }}
                    >
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
              <table
                className=""
                style={{
                  backgroundColor: "#00FF00",
                  width: "100%",
                  borderCollapse: "collapse",
                  borderRadius: "8px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "red", color: "#FFF" }}>
                    <th style={{ padding: "8px", border: "1px solid #FFF" }}>
                      Name
                    </th>
                    <th style={{ padding: "8px", border: "1px solid #FFF" }}>
                      Base stat
                    </th>
                    <th style={{ padding: "8px", border: "1px solid #FFF" }}>
                      Effort
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pokemonInfo.stats.map((stat, index) => (
                    <tr
                      key={index}
                      style={{ backgroundColor: "#FFF", color: "#000" }}
                    >
                      <td style={{ padding: "8px", border: "1px solid #000" }}>
                        {stat.name}
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #000" }}>
                        {stat.base_stat}
                      </td>
                      <td style={{ padding: "8px", border: "1px solid #000" }}>
                        {stat.effort}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  onClick={handlePrevPokemon}
                >
                  <FaArrowLeft></FaArrowLeft>
                </button>
                <button
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  onClick={handleNextPokemon}
                >
                  <FaArrowRight></FaArrowRight>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default CharacterModal;
