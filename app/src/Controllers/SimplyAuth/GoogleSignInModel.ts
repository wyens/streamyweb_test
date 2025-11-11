// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { UserDataProvider, loadData } from '../../Base/UserDataProvider';
import { controllers } from '../Controllers';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   isErrorWithCode,
//   isSuccessResponse,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

class GoogleSignInModel {

    configure = () => {
        // GoogleSignin.configure({
        //     // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        //     webClientId: '1018810947680-n8pl93aehc4kavmakac46abrrbkg9m6c.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        //     offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        //     // hostedDomain: '', // specifies a hosted domain restriction
        //     // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        //     // accountName: '', // [Android] specifies an account name on the device that should be used
        //     iosClientId: '1018810947680-gempg3pv8cjg460gd6ging17tre261op.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        //     // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        //     // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
        //     profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
        //   });
        // GoogleSignin.configure({
        //     // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        //     webClientId: '1018810947680-0a55dqp9ui5vvc1r0bph449j8pknmebe.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        //     // hostedDomain: '', // specifies a hosted domain restriction
        //     // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        //     // accountName: '', // [Android] specifies an account name on the device that should be used
        //     iosClientId: '1018810947680-gempg3pv8cjg460gd6ging17tre261op.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        //     // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        //     // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
        //     profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
        //   })
        // GoogleSignin.configure({
        //   webClientId: 'autoDetect',
        // });
    }

    loadingTo = async (userInfo:any) => {
      const body =  {token_id: userInfo.data.idToken}
      const response = await loadData(UserDataProvider.googleAuthorization, {token_id: userInfo.data.idToken})
      console.error("resp", response)
      controllers().auth.login(response.data.userToken)
    }
    signIn = async () => {
        this.configure()
        
        // try {
          // const hasService = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          // if(!hasService){
          //   return;
          // }
          // GoogleSignin.signIn()
          //   .then(userInfo => {
          //     this.loadingTo(userInfo)
          //   })
          //   .catch(error => {
          //     console.error("Google Sign-In Error:", error);
          //   });
            
          // } catch (error:any) {
          //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          //     // user cancelled the login flow
          //   } else if (error.code === statusCodes.IN_PROGRESS) {
          //     // operation (e.g. sign in) is in progress already
          //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          //     // play services not available or outdated
          //   } else {
          //     // some other error happened
          //   }
          // }
    };

    signOut = () => {
      this.configure()
      // GoogleSignin.signOut()
    }

      // signIn = async () => {
      //   this.configure()
      //   try {
      //     await GoogleSignin.hasPlayServices();
      //     const response = await GoogleSignin.signIn();
      //     if (isSuccessResponse(response)) {
      //       console.error(response)
      //     } else {
      //       // sign in was cancelled by user
      //     }
      //   } catch (error) {
      //     console.error("ERROR", error)
      //     if (isErrorWithCode(error)) {
      //       switch (error.code) {
      //         case statusCodes.IN_PROGRESS:
      //           // operation (eg. sign in) already in progress
      //           console.error("progress")
      //           break;
      //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
      //           console.error("not a service")
      //           // Android only, play services not available or outdated
      //           break;
      //         default:
      //         // some other error happened
      //       }
      //     } else {
      //       consolne.error("error", error)
      //       // an error that's not related to google sign in occurred
      //     }
      //   }
      // };
}

export { GoogleSignInModel }