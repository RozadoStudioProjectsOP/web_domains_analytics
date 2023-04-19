const SocialLogins = () => {
    const googleLogin = async () => {
        window.open("http://localhost:3000/auth/google/callback", "_self");
    }

    const facebookLogin = () => {
        window.open("http://localhost:3000/auth/facebook/callback", "_self");
    }

    const githubLogin = () => {
        window.open("http://localhost:3000/auth/github/callback", "_self");
    }

    return (
        <div >
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
        </div>
    )
}

export { SocialLogins }