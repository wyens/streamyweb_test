import { Model } from "../../Base/Model"
import { IptvPageModel, hometabs } from "../../Controllers/Pages/HomeStack/IptvPage/IptvPageModel"


class Switcher extends Model {
    private _home: IptvPageModel
    constructor(homePage: IptvPageModel){
        super()
        this._home = homePage
    }

    get rides(){
        return this._home
    }

    get currentType(){
        return this._home.currentType
    }

    onPressSwitchItem = (type: hometabs) => {
        if(this.currentType === type){
            return
        }
        this._home.chooseType(type)
        this.ref.animateToType(type)
    }
}

export { Switcher }