// import { LANG_ICONS } from "../../Constants/icons";
import { List } from "../../Models/List/List";
import { SearchableItem } from "../../Models/SearchableSelector/SearchableItem";


class AppLangsList extends List {

    query = async (params?: any, pageIndex: number = 0, pageSize: number = this.pageSize): Promise<Array<SearchableItem>> => {
        return [
            new SearchableItem({
                id: 1,
                label: "HU",
                value: "HU",
                // icon: LANG_ICONS.UA,
                list: this
            }),
            new SearchableItem({
                id: 2,
                label: "EN",
                value: "EN",
                // icon: LANG_ICONS.EN,
                list: this
            }),
            // new SearchableItem({
            //     id: 3,
            //     label: "DE",
            //     value: "DE",
            //     list: this
            // }),
            // new SearchableItem({
            //     id: 4,
            //     label: "HU",
            //     value: "HU",
            //     list: this
            // }),
        ]
    }
}

export { AppLangsList }