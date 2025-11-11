import { PageModel } from "../../../Base/PageModel";
import { Profile } from "./Profile/Profile";


class ProfilePage extends PageModel {
    private _profile: Profile = new Profile()

    get profile(){
        return this._profile
    }

}

export { ProfilePage }