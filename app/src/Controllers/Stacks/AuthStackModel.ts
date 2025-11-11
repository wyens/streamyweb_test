import { PageController } from '../PageController';
import { WelcomePage } from '../Pages/WelcomePage';
export type inputUserSelected = {
  code: string;
  initial: string;
  icon: string;
  phone: string;
};
class AuthStackModel extends PageController {
  private readonly _welcome: WelcomePage;

  constructor() {
    super();
    this._welcome = new WelcomePage({ pageName: 'Welcome'});
    this.pages = [this._welcome];
  }

  get welcome() {
    return this._welcome;
  }
}

export { AuthStackModel };
