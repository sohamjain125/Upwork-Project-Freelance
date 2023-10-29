import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import styles from './styles.module.css';
import RegistrationPage from '../../Pages/Register'
import Checkbox from '../../components/checkbox'
import Button from "../../components/button";
import Loading from "../../components/loading";

export default function Login(props) {
    useEffect(()=>{
        document.getElementsByTagName('body')[0].classList.add('no-extra');
    },[]);

    return (
        <div>
            <Loading />
            <img src="/assets/img/bg.jpg" alt="background"/>
            <div className={styles.externalSection}>
                <h3 className={styles.title}>Login</h3>
                <hr />
                <div className={styles.inputsContainer}>
                    <input className="form-control" type="email" placeholder="Your email:" />
                    <input className="form-control" type="password"  placeholder="Your password:"/>
                    <div className={styles.flexSpaceBetween}>
                        <div>
                            <Checkbox label="Remember me"/>
                        </div>
                        <Link to="/registration"> {RegistrationPage}
                            <a>Register</a>
                        </Link>
                        <Link to="/forgot_password"> {/* Link to the forgot password page */}
                            <a>Forgot Password</a>
                        </Link>
                    </div>
                </div>
                <Button type="primary" label="Login" onClick={() => alert("ahp me")} />
                <hr />
                <div className={styles.flexSpaceBetween}>
                    <p>
                        Thank you and enjoy our website.<br/>
                        <strong>Your Authentication Team</strong>
                    </p>
                    <img alt="logo" className={styles.smallLogo} src="https://technext.github.io/guruable/assets/images/auth/Logo-small-bottom.png" />
                </div>
            </div>
        </div>
    )
}
