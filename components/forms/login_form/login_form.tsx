'use client'

import { MouseEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./login_form.module.css";
import axios, { HttpStatusCode } from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserName } from "@utils/my-redux-store/slices/userInfoSlice";

interface MyFormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement
    password: HTMLInputElement
}

interface MyFormElements extends HTMLFormElement {
    readonly elements: MyFormElements
}

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch();

    function register(ev: MouseEvent) {
        ev.preventDefault();
        router.push("/register");
    }

    function login(event: React.FormEvent<MyFormElements>) {
        event.preventDefault();

        const userName = event.currentTarget.elements.username.value;
        const password = event.currentTarget.elements.password.value;

        axios.post("http://localhost:8082/auth/login", {
            userName: userName,
            password: password,
        })
        .then((response) => {
            console.log(response.data);
            console.log(response.status);
            if (response.status === HttpStatusCode.Ok) {
                console.log(response.data.token);
                dispatch(setToken(response.data.token));
                dispatch(setUserName(userName));
                router.push("/main_page");
            }
        })
        .catch((error) => {
            alert("Something went wrong!");
        })
    }

    function setVisibility(button: HTMLButtonElement, usernameInput: HTMLInputElement, passwordInput: HTMLInputElement) {
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
                <form onSubmit={login} className={styles.form_container}>
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
                    <button onClick={register} className={styles.btn}>
                        Register
                    </button>
                </div>
            </div>
        </section>
    );
}