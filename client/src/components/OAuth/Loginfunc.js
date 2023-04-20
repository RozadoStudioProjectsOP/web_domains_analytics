import React from "react";
import { BASE_URL } from "../../utils/base_url.js";

const SocialLogins = () => {
    const googleLogin = async () => {
        window.open(`${BASE_URL}/auth/google/callback`, "_self");
        sessionStorage.setItem('isLoggedIn', true);
    }

    const facebookLogin = () => {
        window.open(`${BASE_URL}/auth/facebook/callback`, "_self");
        sessionStorage.setItem('isLoggedIn', true);
    }

    const githubLogin = () => {
        window.open(`${BASE_URL}/auth/github/callback`, "_self");
        sessionStorage.setItem('isLoggedIn', true);
    }

    return (
        <div>
            <div onClick={googleLogin}>
                <p>Login With Google</p>
            </div>
            <div onClick={facebookLogin}>
                <p>Login With Facebook</p>
            </div>
            <div onClick={githubLogin}>
                <p>Login With Github</p>
            </div>
        </div>
    )
}

export { SocialLogins }