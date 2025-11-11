import { Dimensions } from "react-native";
import { controllers } from "./Controllers";

type screenType = {
    w: number;
    h: number;
    keyboardHeight: number;
    normalHeight: number;
    shortHeight: number;
}

class MediaController {
    private _screen: screenType;
    private _saLayout: any = {};
    constructor(){
        this._screen = {w:0,h:0, keyboardHeight: 0, normalHeight: 0, shortHeight: 0}
    }

    get screen(){
        return this._screen
    }

    onChange = () => {
        Dimensions.addEventListener('change', this.updateOrientation);
    }

    updateOrientation = (dimensions:any) => {
        this.updateDimensions(dimensions)
    }

    get isLandscape() {
        return this._screen.w>this._screen.h
    }
    get isPortrait() {
        return this._screen.h>this._screen.w
    }

    updateDimensions = (dimensions: any) => {
        this._screen.w = dimensions.screen.width
        this._screen.h = dimensions.screen.height
    }

    updateScreen = (dimetions:any) => {
        this._screen.w = dimetions.get('screen').width 
        this._screen.h = dimetions.get('screen').height 
    }

    setParams(keyboardHeight: number, normalHeight: number, shortHeight: number) {
        this._screen.keyboardHeight = keyboardHeight
        this._screen.normalHeight = normalHeight
        this._screen.shortHeight = shortHeight
    }
    
    get w():number{
        return this._screen?.w
    }
    get h():number{
        return this._screen?.h
    }

    safeAreaLayout = (e:any) =>{ 
        const { width, height } = e.nativeEvent.layout;
        this._saLayout = {
            width, height
        }
    }

    get asLayout(){
        return this._saLayout
    }

    get asLayoutFullScreen(){
        return {
            width: this._saLayout?.width||0,
            height: this._saLayout?.height||0
            // width: 100,
            // height: 100
        }
    }
}

export { MediaController }