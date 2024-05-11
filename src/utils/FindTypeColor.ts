import { PokemonTypes } from "../enums/PokemonTypes"

const typeToColorMapping: Record<PokemonTypes, string> = {
  [PokemonTypes.BUG]: "#A6B91A",
  [PokemonTypes.DARK]: "#705746",
  [PokemonTypes.DRAGON]: "#6F35FC",
  [PokemonTypes.ELECTRIC]: "#F7D02C",
  [PokemonTypes.FAIRY]: "#D685AD",
  [PokemonTypes.FIGHTING]: "#C22E28",
  [PokemonTypes.FIRE]: "#EE8130",
  [PokemonTypes.FLYING]: "#A98FF3",
  [PokemonTypes.GHOST]: "#735797",
  [PokemonTypes.GRASS]: "#7AC74C",
  [PokemonTypes.GROUND]: "#E2BF65",
  [PokemonTypes.ICE]: "#96D9D6",
  [PokemonTypes.NORMAL]: "#A8A77A",
  [PokemonTypes.POISON]: "#A33EA1",
  [PokemonTypes.PSYCHIC]: "#F95587",
  [PokemonTypes.ROCK]: "#B6A136",
  [PokemonTypes.STEEL]: "#B7B7CE",
  [PokemonTypes.WATER]: "#6390F0",
}

const determineTypeColor = (type: PokemonTypes): string => {
  return typeToColorMapping[type]
}

export default determineTypeColor
