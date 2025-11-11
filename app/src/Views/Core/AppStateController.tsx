import React from 'react';
import { controllers } from '../../Controllers/Controllers';

class AppStateController extends React.Component {
  async componentDidMount() {
    await AppStateController.restoreData();
    // controllers().media.updateScreen(Dimensions);
    // controllers().media.onChange();
    // this.testRequest()
    // await controllers().updateModule.compareVersion();
    // controllers().simplyAuth.google.configure();
    // dictionary().loadAll();
    // controllers().remoteControls.startListening();
  }

  testRequest = async () =>{
    // console.error("TEST REQUEST")
    // try{
    //   const response = await fetch("https://api.menfecto.com/user/channel_categories", {
    //     method: "GET",
    //     headers: { "Accept": "application/json" },
    //   });
    //   console.error("response", response)
    // } catch(e){
    //   console.error("ERROR GETTING RESPONSE", e)
    // }
  }

  componentWillUnmount() {}

  // _keyboardDidShow(e: any) {
  //   controllers().media.setParams(
  //     e.endCoordinates.height,
  //     Dimensions.get('window').height,
  //     Dimensions.get('window').height - e.endCoordinates.height
  //   );
  // }

  static async restoreData() {
    await controllers().auth.restoreMe();
    await controllers().auth.checkToken(true);
    if (controllers().auth.isLogin) {
      await controllers().auth.getUserInfo(true);
      // controllers().firebaseController.deviceToken.init().then();
    }
    // setTimeout(controllers().loader.hide, 500);
  }

  render() {
    return null;
  }
}

export { AppStateController };
