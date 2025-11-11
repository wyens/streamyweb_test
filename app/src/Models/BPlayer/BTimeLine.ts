import { Model } from "../../Base/Model";
import { BPlayer } from "./BPlayer";


class BTimeLine extends Model {
    private _player: BPlayer
    private _currentTime:number = 0
    private _duration:number = 0
    private _sliderIsActive: boolean = false;

    constructor(player: BPlayer){
        super()
        this._player = player
    }

    get player(){
        return this._player
    }

    clear = () => {
        this._currentTime = 0
        this._duration = 0
        this._sliderIsActive = false;
        this.updateMe()
    }

    get currentTime(){
        return this._currentTime
    }
    get showingTime(){
        return this.formatTime(this._currentTime)
    }

    formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
      
        const formattedTime = [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          remainingSeconds.toString().padStart(2, '0')
        ].join(':');
      
        return formattedTime;
    }
    calculateSeek(currentTime:number, duration:number) {
        if (duration <= 0) {
          return 0;
        }
      
        // Ensure currentTime is within the valid range [0, duration]
        currentTime = Math.max(0, Math.min(currentTime, duration));
      
        return currentTime / duration;
      }

    get duration(){
        return this._duration
    }

    setTime = (time: number) => {
        if(this._sliderIsActive){
            return
        }
        this._currentTime = time
        this.updateMe()
    }
    showTime = (time: number) => {
        this._currentTime = time
        this.updateMe()
    }

    handleTimeUpdate = (value: any) => {
        // console.error("VALUE", value)
        this.showTime(value)
    }

    setSliding = (bool: boolean) => {
        if(this._sliderIsActive === bool){
            return
        }
        this._sliderIsActive = bool
        this.updateMe()
    }

    onSlidingStart = () => {
        this.setSliding(true)
    }

    onSlidingComplete = () => {

        // SEND CURRENT TIME TO PLAYER

        this.setSliding(false)

        // console.error(this._player.video.screen.playerRef)
        try{
            this._player.video.screen.seek(this.calculateSeek(this._currentTime, this._duration))
        } catch(e){
            console.error("E", e)
        }
    }

    setDuration = (an: any) => {
        this._duration = an
        this.updateMe()
    }


}

export { BTimeLine }