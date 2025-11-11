import { PageController } from '../PageController';
import  {LoginPageModel} from "~/src/Controllers/Pages/NewScreens/LoginPageModel";
import {MainListPageModel} from "~/src/Controllers/Pages/NewScreens/MainListPageModel";
import {VideoPlayerPageModel} from "~/src/Controllers/Pages/NewScreens/VideoPlayerPageModel";

class HomeStackModel extends PageController {
  private readonly _videoPlayerPage: VideoPlayerPageModel;
  private readonly _mainListPage: MainListPageModel;
  private readonly _loginPageModel: LoginPageModel;

  constructor() {
    super();
    this._videoPlayerPage = new VideoPlayerPageModel();
    this._mainListPage = new MainListPageModel();
    this._loginPageModel = new LoginPageModel();
    this.pages = [];
  }

  get videoPlayerPage() {
    return this._videoPlayerPage;
  }
  get mainListPage() {
    return this._mainListPage;
  }
  get loginPageModel() {
    return this._loginPageModel;
  }
}

export { HomeStackModel };
