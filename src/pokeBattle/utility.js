export function convertToPokemonObjects(trainerPokemonTeam, pokemonData) {
    console.log(`This is the team we are converting: ${trainerPokemonTeam}`);
    return trainerPokemonTeam.map((name) => pokemonData[name]);
}