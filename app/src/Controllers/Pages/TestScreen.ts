import { RMap } from "../../Models/RMap/RMap";
import { RNavigationMap } from "../../Models/RMap/RNavigationMap";
import { TransporterPageModel } from "./TransporterStackPages/TransporterPageModel";


class TestScreen  extends TransporterPageModel {

    private _rmap: RNavigationMap = new RNavigationMap();

    get rmap(){
        return this._rmap
    }
}

export { TestScreen }