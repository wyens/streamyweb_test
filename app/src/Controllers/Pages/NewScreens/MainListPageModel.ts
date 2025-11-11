import { Model } from "../../../Base/Model"
import { RemoteEventType } from "../../../Base/RemoteControls"
import { Timeout } from "../../../Base/Timeout"
import { controllers } from "../../Controllers"
import { IptvPageList } from "../MainPage/IptvList/IptvPageList"
import { MainCategory } from "../MainPage/MainCategory/MainCategory"
import { OneCategory } from "../MainPage/MainCategory/OneCategory"
import React from 'react';
import { HeaderPageWithName } from '../../../Views/Components/HeaderPage/HeaderPageWithName.tsx';
import { ControllerLogout } from "../../../Models/ControllerControlsVideo/ControllerLogout.ts"



class MainListPageModel extends Model {
    private _headerRef: any;
    private _headerLogout: ControllerLogout
    private _categories: MainCategory
    private _iptvPage: IptvPageList
    private _categoryGenreNow: any = "all"
    private _timeout: Timeout = new Timeout(800)


    constructor(){
        super()
        this._categories = new MainCategory({categoryChanged:this.categoryChanged})
        this._iptvPage = new IptvPageList({listLoaded: this.listLoaded, control: this})
        this._headerRef = React.createRef<HeaderPageWithName>();
        this._headerLogout = new ControllerLogout();
    }

    listLoaded = () => {
        this._categories.setTrapFocusDown(false)
    }

    categoryChanged = (category: OneCategory) =>{
        this._categories.setTrapFocusDown(this._categoryGenreNow != category.genre)
        this._timeout.set(()=>this.switchCategory(category))
    }

    switchCategory = (category:OneCategory) =>{
        if(this._categoryGenreNow === category.genre){
            this._categories.setTrapFocusDown(false)
            return
        }
        this._iptvPage.setEpgCountToLoad()
        this._categoryGenreNow = category.genre
        this._iptvPage.iptvHeader.scrollHorizontally(0)
        this._iptvPage.iptvList.setSelectedCategory(category)
    }

    init = () => {

    }

    blur = () => {
    }

    get controllerLogout(){
        return this._headerLogout
    }

    RemoteEvent = (type: RemoteEventType) => {
      console.log('MainListPage RemoteEvent type', type)
        if(type === RemoteEventType.Left){
            const find = this._iptvPage.iptvList.localitems.find(oc=>oc.isMainTypeFocused)
            if(find){
                this._categories.focusOnSelectedItem()
            }
        }
        if(type === RemoteEventType.Back){
          if (this.controllerLogout.isVisible){
            this.controllerLogout.hideControllers()
            return
          }
            const find = this._iptvPage.iptvList.localitems.find(oc=>oc.isMainTypeFocused)
            if(find){
                this._categories.focusOnSelectedItem()
            }
        }
    }

    get categories(){
        return this._categories
    }

    get iptvPage(){
        return this._iptvPage
    }

    public get headerRef(){
      return this._headerRef
    }
    public set headerRef(value){
        this._headerRef = value;
        console.log('value', value)

    }
}

export { MainListPageModel }
