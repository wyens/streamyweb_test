import { UserDataProvider, loadData } from "../../Base/UserDataProvider";
import { Dictionary } from "./Dictionary";


class MovieCategoryDictionary extends Dictionary {

    async query(){
        const response = await loadData(UserDataProvider.loadCategoryMovies, {})

        if(!response.data || !response.data.length){
            return []
        }
    
        return response.data
    }

    // get selectOptions(){
    //     return this.items.map(i=>{
    //         return {
    //             label: capitalize(i.genre),
    //             value: i.id
    //         }
    //     })
    // }
}

export { MovieCategoryDictionary }