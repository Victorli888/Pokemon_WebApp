
import {
    gymLeaderBrockTeam, pokeTrainerDaleTeam,
    pokeTrainerLockeTeam,
    pokeTrainerMarkTeam
} from "./gamePokeTeams";
import imagePaths from "./imagePaths";

export const pokemonBattles = {
    "trainerBattleDale": {
        team: pokeTrainerDaleTeam,
        stageType: imagePaths.grassyBattleBG,
    },
    "trainerBattleLocke": {
        team: pokeTrainerLockeTeam,
        stageType: imagePaths.grassyBattleBG,
    },
    "trainerBattleMark": {
        team: pokeTrainerMarkTeam,
        stageType: imagePaths.grassyBattleBG,
    },
    "gymLeaderBrock": {
        team: gymLeaderBrockTeam,
        stageType: imagePaths.grassyBattleBG,
    },
    // Add any more relevant trainer battle information here
};