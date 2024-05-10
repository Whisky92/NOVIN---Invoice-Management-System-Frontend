'use client';

import { useEffect } from "react";
import styles from "./login_form.module.css";

export default function LoginForm() {

    const setVisibility = (button: HTMLButtonElement, usernameInput: HTMLInputElement, passwordInput: HTMLInputElement) => {
        const usernameInputFilled = usernameInput.value.trim() != "";
        const passwordInputFilled = passwordInput.value != "";

        if (usernameInputFilled && passwordInputFilled) {
            button.style.visibility = "visible";
        } else {
            button.style.visibility = "hidden";
        }
    }

    useEffect(() => {
        const button = document.getElementById("submit_btn") as HTMLButtonElement;
        const usernameInput = document.getElementById("username") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;

        if (button && usernameInput && passwordInput) {
            button.style.visibility = "hidden";

            usernameInput.addEventListener("change", (ev) => {
                setVisibility(button, usernameInput, passwordInput);
            })
            passwordInput.addEventListener("change", (ev) => {
                setVisibility(button, usernameInput, passwordInput);
            })

        }
    })

    return (
        <section className={styles.form_section}>
            <div className={styles.form_popup} id="myForm">
                <h1 className={styles.form_header}>Login</h1>
                <form className={styles.form_container}>
                    <div className={styles.label_div}>
                        <label htmlFor="username" className={styles.input_label}><b>Username</b></label>
                        <input className={styles.input_field} type="text" placeholder="Username" name="username" id="username" required/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="password" className={styles.input_label}><b>Password</b></label>
                        <input className={styles.input_field} type="password" placeholder="Password" name="password" id="password" required />
                    </div>
                    <div className={styles.btn_div} id={styles.submit_btn_div}>
                        <button type="submit" className={styles.btn} id="submit_btn">
                            Login
                        </button>
                    </div>
                </form>
                <div className={styles.btn_div} id={styles.register_btn_div}>
                    <button className={styles.btn}>
                        Register
                    </button>
                </div>
            </div>
        </section>
    );
}