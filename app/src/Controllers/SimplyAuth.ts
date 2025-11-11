import { GoogleSignInModel } from "./SimplyAuth/GoogleSignInModel"


class SimplyAuth {

    private _google: GoogleSignInModel = new GoogleSignInModel()


    get google(){
        return this._google
    }
}

export { SimplyAuth }