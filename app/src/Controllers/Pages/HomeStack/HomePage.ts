import { PageModel } from "../../../Base/PageModel";
import { controllers } from "../../Controllers";
import { IptvPageModel } from "./IptvPage/IptvPageModel";

class HomePage extends PageModel {
    // private _vPlayer: VPlayer;
    private _iptvPage: IptvPageModel
    constructor(title: string) {
        super(title);
        this._iptvPage = new IptvPageModel()
        // this._vPlayer = new VPlayer({isLive: true})
    }

    get iptvPage(){
        return this._iptvPage
    }

    onFocus = () => {
        // controllers().main.menu.justChoose("Home")
    }
    

}

export { HomePage };
