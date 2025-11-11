import { ListItem } from "../../Models/List/ListItem";
import { Modal } from "../../Models/Modal";
import { SearchableItem } from "../../Models/SearchableSelector/SearchableItem";
import { SearchableSelector } from "../../Models/SearchableSelector/SearchableSelector";
import { controllers } from "../Controllers";
import { AppLangsList } from "./AppLangsList";


class AppLangModal extends Modal {

    private _searchable: SearchableSelector;
    private _appLangsList: AppLangsList
    constructor(){
        super("Select language")
        this._appLangsList = new AppLangsList({title: "Available languages",pageSize: 7, onPressItem: this.onPressItem})
        this._searchable = new SearchableSelector(this._appLangsList)
    }

    onPressItem = (item: SearchableItem) => {
        this.hide()
        if(typeof(item.value) === "string"){
            // @ts-ignore
            controllers().language.setLanguage(item.value.toLowerCase())
        }
    }

    get searchable(){
        return this._searchable
    }
}

export { AppLangModal }