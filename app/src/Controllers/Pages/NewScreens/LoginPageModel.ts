import { Model } from "~/src/Base/Model";
import { LoginMainModel } from "~/src/Models/LoginMainModel/LoginMainModel";

class LoginPageModel extends Model {
  private readonly _loginMainModel: LoginMainModel;
  constructor() {
    super();
    this._loginMainModel = new LoginMainModel();
  }
  public init = () => {
    this._loginMainModel.init();
  };
  public blur = () => {
    this._loginMainModel.blur();
  };
  public get loginMainModel() {
    return this._loginMainModel;
  }
}

export { LoginPageModel };
