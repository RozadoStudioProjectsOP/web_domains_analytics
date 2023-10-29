import React from "react";
import "./Loginfunc.css"
import googleImage from "../../assets/googleImage.png";
import githubImage from "../../assets/githubImage.png";
import { BASE_URL } from "../../utils/base_url.js";

//Login with google and github
const SocialLogins = () => {
    const googleLogin = async () => {
        window.open(`${BASE_URL}/auth/google/callback`, "_self");
        sessionStorage.setItem('isLoggedIn', true);
    }

    const githubLogin = () => {
        window.open(`${BASE_URL}/auth/github/callback`, "_self");
        sessionStorage.setItem('isLoggedIn', true);
    }

    return (
        <div className="socialContainer">
            <p style={{textAlign: "center"}}>Login with social media</p>
            <div className="socials">
                {typeof(googleImage) == 'string' ? (
                    <>
                        <div className="socialItem" onClick={googleLogin}>
                            <img src={googleImage} alt="google" />
                        </div>
                        <div className="socialItem" onClick={githubLogin}>
                            <img src={githubImage} alt="github" />
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export { SocialLogins }