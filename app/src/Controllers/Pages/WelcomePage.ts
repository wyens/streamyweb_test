import { PageModel } from '../../Base/PageModel';
import { controllers } from '../Controllers';
// import { PhoneInput } from './WelcomePage/PhoneInput';
// import { dictionary } from '../Dictionaries';
type welcomePageTypes = {
  pageName: string;
};
class WelcomePage extends PageModel {

  constructor(props: welcomePageTypes) {
    super(props.pageName);
  }
  submit = async () => {
    // console.error("CLICKED")
    controllers().modals.authWebView.show()
  };

  onGooglePress = () => {
    controllers().simplyAuth.google.signIn()
  }

}

export { WelcomePage };
