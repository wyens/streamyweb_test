import { PageModel } from "../../../Base/PageModel";
import { IptvPageModel } from "./IptvPage/IptvPageModel";
import { SeriesCategories } from "./Series/SeriesCategories";

class SeriesPage extends PageModel {
    
    private _categories: SeriesCategories
    constructor(title: string) {
        super(title);
        this._categories = new SeriesCategories()
    }

    get categories(){
        return this._categories
    }
}

export { SeriesPage };
