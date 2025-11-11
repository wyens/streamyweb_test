import { Model } from "../../Base/Model";
import { controllers } from "../../Controllers/Controllers";
import { BPlayer } from "./BPlayer";

class BFullScreen extends Model {

    private _player: BPlayer
    private _enabled: boolean = false

    constructor(player: BPlayer){
        super()
        this._player = player
    }

    get bPlayer(){
        return this._player
    }
    get enabled(){
        return this._enabled
    }


    setEnabled = (bool: boolean) => {
        if(this._enabled === bool){
            return
        }
        this._enabled = bool
        controllers().main.menu.setVisible(!this._enabled)
        controllers().statusBar.setVisible(!this._enabled)
        this.bPlayer.video.updateMe()
        this.updateMe()
    }

    turnOn = () => {
        this.setEnabled(true)
    }
    turnOff = () => {
        this.setEnabled(false)
    }
    toggle = () => {
        this.setEnabled(!this._enabled)
    }
}
export { BFullScreen }