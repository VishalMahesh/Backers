import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { AccessToken, LoginManager } from "react-native-fbsdk";


class Backend {


    isUndefined(x) {
        return typeof x === "undefined";
    }

    isNull(x) {
        return x === null;
    }

    exists(x) {
        return !this.isUndefined(x) && !this.isNull(x);
    }

    initFaceBookfunction(token, cb) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                let user = {}
                user.name = json.name
                user.id = json.id
                user.email = json.email
                user.username = json.name
                cb(user)
            })
            .catch((err) => {
                console.log(err);
                cb(false)
            })
    }

    fbIinfo(cb) {
        AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data
            this.initFaceBookfunction(accessToken, user => {
                cb(user)
            })
        })
    }


}

export default new Backend();