import {useDispatch} from "react-redux";
import {showText} from "../redux/actions/pokeBattleActions";

const PokeBattleGameOver= () => {

    const dispatch = useDispatch()
    const textLog = []
    textLog.push("All of your Pokémon are down for the count! You blacked out!")
    textLog.push("GAME OVER!")

    dispatch(showText(textLog))

}

export default PokeBattleGameOver;
