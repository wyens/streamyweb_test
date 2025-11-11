import { BPlayer } from "./BPlayer"


class BControl {
    private _player: BPlayer

    constructor(player: BPlayer){
        this._player = player
    }

    get bPlayer(){
        return this._player
    }

    pause = () => {
        this._player.video.pause()
    }

    play = () => {
        this._player.video.play()
    }

    togglePlaying(){
        if(this.bPlayer.state.isPlaying){
            this.pause()
        } else {
            this.play()
        }
    }

}

export { BControl }