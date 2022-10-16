import { useState } from "react";
import { url } from "../../helper";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffectAsync } from "../../helper";
import hasher from 'js-sha256';
import customToast from "./swal/customToast";

const RegisterBlock = (props) => {
    const router = useRouter();


    // const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const usernameChangeHandler = ({ target: { value } }) => {
        setUsername(value);
    };
    const passwordChangeHandler = ({ target: { value } }) => {
        setPassword(value);
    };
    const emailChangeHandler = ({ target: { value } }) => {
        setEmail(value);
    };

    const registerHandler = async () => {
        // e.preventDefault();

        try {
            localStorage.clear();
            const result = await axios.post(
                url("/auth/user/register"),
                {
                    username: username,
                    password: hasher.sha256(password).toString(),
                    email: email
                }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });


            if (result.status === 200) {

                // redirect to homepage
                router.push('/login')

                customToast(
                    "success",
                    "User Registration Successfilly"
                );
            }
        } catch (error) {
            customToast(
                "warning",
                error.response?.data?.message || "Register Failed"
            );
        }
    };

    return (
        <div className="loginwrapper">
            <div className="centerwrapper">
                <div className="centerwrapper__section centerwrapper__adminlogin">
                    Register New User
                </div>
                <div className="centerwrapper__section">
                    <input
                        type="email"
                        onChange={emailChangeHandler}
                        placeholder="Email"
                        className="centerwrapper__section__input"
                        required={true}
                    />
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
                        onClick={registerHandler}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterBlock;
