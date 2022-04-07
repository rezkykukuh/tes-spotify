import { deleteStorage, getStorage } from "./storage";

export const isAuth = !!getStorage('token')
const hash = window.location.hash;

export const authGenerate = () => {
    if (isAuth) {
        return {
            token : getStorage('token'),
        }
    }

    if (!hash) {
        const errorMessage = window.location.href.split('error=')[1]
        if (errorMessage) {
            throw new Error(errorMessage)
        } else {
            throw new Error("Not authenticated")
        }
    }

    const token = hash
    .substring(1)
    .split("&")
    .find((elem) => elem.startsWith("access_token"))
    .split("=")[1]
    window.location.hash = "";
    window.location.reload();

    return {
        token : token
    }
}

export const Logout = () => {
    console.log("logout")
    
    deleteStorage();
    window.location.reload();
  };