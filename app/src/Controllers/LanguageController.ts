import { Model } from "../Base/Model";
import { loadData, UserDataProvider } from "../Base/UserDataProvider";
import type {langs} from "../Constants/AppSettings";
import type {changeLanguageBody} from "../DataTypes/BaseResponse";
import { coreupdate } from "../Helpers/actions";
import { UPDATE } from "../Helpers/constants";
import { controllers } from "./Controllers";
import { English } from "./Languages/English";
import { Lang } from "./Languages/Lang";
import { Hungary } from "./Languages/Hungary";

class LanguageController extends Model {

    private _languages: Array<Lang>
    private _language: langs
    private _isMobile: boolean
    private _needToLanguage: Array<string>;
    private _defaultLanguage: langs = "ua"
    constructor(){
        super();
        this._languages = [
            new English(),
            new Hungary(),
        ]
        this._isMobile = false
        this._language = this._defaultLanguage
        this.setLanguage(this._defaultLanguage, true)
        this._needToLanguage = []
    }

    get needToLanguage(){
        return this._needToLanguage
    }

    setNeedToLanguage = (item: string) => {
        const find = this._needToLanguage.find(it=> it == item)
        if(find){

        } else {
            this._needToLanguage.push(item)
        }
    }


    get isMobile() {
        return this._isMobile
    }

    setIsMobile = (bool: boolean) => {
        if(this._isMobile === bool){
            return
        }
        this._isMobile = bool
        this.updateMe()
    }

    updateProvider = () => {
        coreupdate(UPDATE.LANG)
    }

    get language(){
        return this._language
    }

    setLanguage = (lang: langs|null|undefined, first: boolean = false) => {
        if(lang === null || lang === undefined){
            return
        }
        if(this._language === lang && !first){
            return
        }
        this._language = lang
        this.setSelected(lang)
        // console.error("THIS LANGUAGE", this._language)
        if(!first){
            this.updateLanguage(lang)
            this.updateProvider()
            controllers().auth.saveLanguage()
        }
    }

    setSelected = ( name : langs) => {
        this._languages.forEach(l => {
            l.setSelected(l.name === name)
        })
        this.updateMe()
    }

    updateLanguage = async (lang: langs) => { 
        this._language = lang

        const userToken = controllers().auth.userToken
        if(userToken === null){
            return
        }

        const body:changeLanguageBody = {
            language: lang, 
            userToken: userToken
        }
        console.log('body', body)
        loadData(UserDataProvider.changeLanguage,body)
        // console.log("RESPONSE", response)
    }

    get selectedLanguage(){
        return this._language
    }

    get lang(){
        return this._languages.find(l=>l.name === this._language)
    }

    get langs(){
        return this._languages
    }
}

export { LanguageController }