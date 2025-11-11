import { Model } from "../../Base/Model";
import { BPlayer } from "./BPlayer";


class BState extends Model {
    private _player: BPlayer
    private _isPlaying: boolean = false;
    private _isLoading: boolean = true;

    constructor(player: BPlayer){
        super()
        this._player = player
    }

    get bPlayer(){
        return this._player
    }

    get isPlaying(){
        return this._isPlaying
    }

    get isLoading(){
        return this._isLoading
    }

    setPlaying = (bool: boolean) => {
        this._isPlaying = bool
        this.updateMe()
    }

    setLoading = (bool: boolean) => {
        this._isLoading = bool
        this.updateMe()
    }

    play = () => {
        this.bPlayer.control.play()
    }

}

export { BState }