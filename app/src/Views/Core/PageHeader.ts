import { Model } from "../../Base/Model";
import { controllers } from "../../Controllers/Controllers";
import { navigator } from "../../Controllers/Navigation";

const CHANGER = 150

class PageHeader extends Model {

    private _name: string;
    private _title: string = ""
    private _visible:boolean = false
    private _automount: boolean = true
    private _hidden: boolean = false;
    private _withoutScroll: boolean = false;
    private _pageRef: any;

    constructor(name: string, automount: boolean = true){
        super()
        this._name = name
        this._automount = automount
    }

    setPageRef = (ref: any) => {
        this._pageRef = ref
    }

    clear = () => {
        this._title = ""
        this.setVisible(false)
    }

    get visible(){
        return this._visible
    }
    setVisible = (bool: boolean) => {
        if(this._visible === bool){
            return
        }
        this._visible = bool
        this.updateMe()
    }

    get hidden(){
        return this._hidden
    }
    setHidden = (bool: boolean) => {
        if(this._hidden === bool){
            return
        }
        this._hidden = bool
        this.updateMe()
    }

    get withoutScroll(){
        return this._withoutScroll
    }
    setWithoutScroll = (bool: boolean) => {
        if(this._withoutScroll === bool){
            return
        }
        this._withoutScroll = bool
        this._pageRef.forceUpdate()
    }

    get title(){
        return this._title
    }
    setTitle = (title: string) => {
        this._title = title
        this.updateMe()
    }

    onGoBack = () => {
        navigator().back();
    }

    onMountMe = () => {
        setTimeout(()=>controllers().main.scroll.setCustomListener(this.showMeOnScroll, this._name, "position"),500)
    }
    unmountMe = () => {
        controllers().main.scroll.clearOneListener(this._name)
    }
    
    get automount(){
        return this._automount
    }

    showMeOnScroll = (pos: number) => {
        if(pos>CHANGER && !this._visible){
            this.setVisible(true)
        } else if(pos<CHANGER && this._visible){
            this.setVisible(false)
        }
    }

}

export { PageHeader }