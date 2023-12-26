// import {useDispatch, useSelector} from "react-redux";
// import {fetchMoveData} from "../redux/actions/pokeBattleActions";
// import {updatePokemon} from "../redux/actions/pokemonActions";
// export const pokeBattleEngine = (playerPokemon, playerAction, opponentPokemon, opponentAction) => {
//
//     const dispatch = useDispatch()
//
//     function chooseFirstToGo(playerPokemon, opponentPokemon){
//         if (playerAction.type === "USE_BAG" || playerPokemon.speed > opponentPokemon.speed){
//             return [playerPokemon,opponentPokemon];
//         }
//         else if (playerPokemon.speed > opponentPokemon.speed){
//             return [opponentPokemon,playerPokemon]
//         }
//         else{
//             return Math.random() < 0.5 ? [playerPokemon, opponentPokemon] : [opponentPokemon, playerPokemon];
//         }
//     }
//
//     function useMove(attacker, defender, moveName){
//
//         const moveData = fetchMoveData(moveName)
//         const moveDataType = moveData.damage_class.name
//
//         switch (moveDataType){
//             case ("special" || "physical"):
//                 const damage = Math.floor((2 * attacker.attack * moveData.power) / defender.defence / 5) + 2;
//                 defender.hp = Math.max(0, defender.hp)
//                 if(defender.hp === 0){
//                     defender.isFainted = true
//                 }
//                 dispatch(updatePokemon(defender))
//                 break;
//             case ("status"):
//                 // TODO: Logic for when a move is status instead of damage
//                 console.log("Start Status boost")
//                 break;
//         }
//
//     }
//
//     function executeAction(attacker, defender, action){
//         switch (action.type){
//             case "USE_MOVE":
//                 // Damage Defender and update the defender
//                 useMove(attacker, defender, action.name)
//                 if(defender.isFainted){
//                     dispatch()
//                 }
//                 // handle if the defender has fainted and force swap dispatch swap
//                 // handle if defender no longer has any pokemon (GAMEOVER OR YOUWIN)
//                 break;
//             case "USE_BAG":
//                 // use item from bag
//                 break;
//             case "SWITCH_POKEMON":
//                 //Switch Pokemon
//             case "RUN":
//                 // ATTEMPT RUN and only allow if Wild Pokemon
//         }
//     }
//
//     const turnOrder = chooseFirstToGo(playerPokemon, opponentPokemon);
//     const firstToGo = turnOrder[0]
//     const secondToGo = turnOrder[1]
// }



// import {chooseFightMove, startTurn, performMove, calculateDamage, handleFainted, getUserResponse, endTurn} from "../redux/actions/pokeBattleActions";
// import {useDispatch} from "react-redux";

// function pokeBattleEngine() {
//     const dispatch = useDispatch()
//     dispatch(startTurn());
//     dispatch(performMove(move));
//     dispatch(calculateDamage());
//     dispatch(handleFainted());
//     dispatch(getUserResponse());
//     dispatch(endTurn());
// }