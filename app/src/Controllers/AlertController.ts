import { Model } from "../Base/Model";


class AlertController extends Model {

    private _visible: boolean;
    private _title: string;
    private _message: string;
    constructor(){
        super();
        this._visible = false
        this._title = ""
        this._message = ""
    }

    get message(){
        return this._message
    }

    get title(){
        return this._title
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

    show = () => {
        this.setVisible(true)
    }
    hide = () => {
        this._message = ""
        this.setVisible(false)
    }

    warning = (message: string, title: string = "Warning") => {
        this._title = title
        this._message = message
        this.show()
    }
    success = (message: string, title: string = "Success") => {
        this._title = title
        this._message = message
        this.show()
    }
    error = (message: string, title: string = "Error") => {
        this._title = title
        this._message = message
        this.show()
    }
}

export { AlertController }