import { Modal } from "../../Models/Modal";


class TrailerModal extends Modal {

    private _url: string = "";
    private _webRef: any;

    show = (url: string) => {
        this._url = url
        this.setVisible(true)
    }

    hide = () => { 
        this._url = ""
        this.setVisible(false)
    }

    get url(){
        return this._url
    }

    setWebRef = (ref: any) => { 
        this._webRef = ref 
    }
}

export{ TrailerModal }