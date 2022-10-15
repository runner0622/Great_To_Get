import { useState, useEffect } from "react";
import { isEmpty, url } from "../helper";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffectAsync } from "../helper";

const Loginpage = (props) => {
    const router = useRouter();

    useEffectAsync(() => {
        if (!router.isReady)
            return;

        if (localStorage.getItem()){
            
        }


    }, [router.isReady])

    // const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameChangeHandler = ({ target: { value } }) => {
        setUsername(value);
    };
    const passwordChangeHandler = ({ target: { value } }) => {
        setPassword(value);
    };

    // 'top' | 'top-start' | 'top-end' | 'top-left' | 'top-right' |
    // 'center' | 'center-start' | 'center-end' | 'center-left' | 'center-right' |
    // 'bottom' | 'bottom-start' | 'bottom-end' | 'bottom-left' | 'bottom-right';
    const loginHandler = async () => {
        // e.preventDefault();
        try {
            localStorage.clear();
            const loginResult = await axios.post(url("/auth/user/login"), {
                username: username,
                password: password,
            });

            if (
                loginResult.status === 200 &&
                loginResult.data.msg === "success"
            ) {
                localStorage.setItem(
                    "accessTokenUser",
                    loginResult.data.accessToken
                );
                localStorage.setItem(
                    "refreshTokenUser",
                    loginResult.data.refreshToken
                );
                localStorage.setItem("authed", true);

                // redirect to homepage
                router.push('/')
            }
        } catch (error) {
            console.error('login error main -->', error.response);
        }
    };

    return (
        <div className="loginwrapper">
            <div className="centerwrapper">
                <div className="centerwrapper__section centerwrapper__adminlogin">
                    Login
                </div>
                <div className="centerwrapper__section">
                    <input
                        type="text"
                        onChange={usernameChangeHandler}
                        placeholder="Username"
                        className="centerwrapper__section__input"
                        required={true}
                    />
                </div>
                <div className="centerwrapper__section">
                    <input
                        type="password"
                        onChange={passwordChangeHandler}
                        placeholder="Password"
                        className="centerwrapper__section__input"
                        required={true}
                    />
                </div>
                <div className="centerwrapper__section">
                    <button
                        className="centerwrapper__section__button"
                        type="submit"
                        value="submit"
                        onClick={loginHandler}
                    >
                        login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;
