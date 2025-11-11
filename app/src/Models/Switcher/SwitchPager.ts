import { Model } from "../../Base/Model";
import { HomePage } from "../../Controllers/Pages/HomeStack/HomePage";
import { IptvPageModel } from "../../Controllers/Pages/HomeStack/IptvPage/IptvPageModel";



class SwitchPager extends Model {

    private _home: IptvPageModel;

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
}

export { SwitchPager }