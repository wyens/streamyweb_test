import {LoginPage} from "~/src/ViewsNew/LoginPage/LoginPage";
import {controllers} from "~/src/Controllers/Controllers";



export default function Login() {
  return <LoginPage ref={controllers().main.loginPageModel.set} controller={controllers().main.loginPageModel} />;
}
