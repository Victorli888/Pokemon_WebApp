import {showText} from "../redux/actions/pokeBattleActions";
import {useDispatch} from "react-redux";

const PokeBattleWinner = () => {

    const dispatch = useDispatch()

    dispatch(showText(["YOU WIN!"]))

}

export default PokeBattleWinner;
