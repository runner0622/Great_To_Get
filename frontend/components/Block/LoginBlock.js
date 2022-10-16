import { useState } from "react";
import { url } from "../../helper";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffectAsync } from "../../helper";
import hasher from 'js-sha256';
import customToast from "./swal/customToast";

const Loginpage = (props) => {
    const router = useRouter();
    const [path, setPATH] = useState('');

    useEffectAsync(() => {
        if (!router.isReady)
            return;

        setPATH(router.asPath?.split('/')?.pop())


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

    const loginHandler = async () => {
        // e.preventDefault();

        try {
            localStorage.clear();
            const loginResult = await axios.post(
                url("/auth/user/login"),
                {
                    username: username,
                    password: hasher.sha256(password).toString()
                }, {
                headers: {
                    'Content-Type': 'application/json',
                }
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

                customToast(
                    "success",
                    "Logged in Successfilly"
                );
            }
        } catch (error) {
            customToast(
                "warning",
                "Login Failed"
            );
        }
    };

    return (
        <div className="loginwrapper">
            <div className="centerwrapper">
                <div className="centerwrapper__section centerwrapper__adminlogin">
                    {
                        path === 'checkout' ?
                            "Please login to checkout products" :
                            "Login User"
                    }
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
