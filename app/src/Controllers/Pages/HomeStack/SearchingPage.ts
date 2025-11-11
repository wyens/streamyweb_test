import { PageModel } from "../../../Base/PageModel";
import { Timeout } from "../../../Base/Timeout";
import { PageHeader } from "../../../Views/Core/PageHeader";
import { SearchingController } from "./Searching/SearchingComponents/SearchingController";

class SearchingPage extends PageModel {
    private _pageHeader: PageHeader
    private _timeout: Timeout = new Timeout(1000)
    private _searchingController: SearchingController
    private _inputText: string = ''

    constructor(pageName: string){
        super(pageName)
        this.showMenu = false
        this._searchingController = new SearchingController()
        this._pageHeader = new PageHeader("searching")
    }

    get pageHeader(){
        return this._pageHeader
    }

    get searchingController(){
        return this._searchingController
    }

    onType = (e: any) => {
        this._pageHeader.setTitle(e)
        this._inputText = e
        this._timeout.set(this.find)
    }

    find = () => {
        this.searchingController.makeSearching(this._inputText)
    }
}

export { SearchingPage }