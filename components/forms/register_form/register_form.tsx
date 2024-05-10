'use client';

import { MouseEvent, useEffect } from "react";
import styles from "./register_form.module.css";
import { useRouter } from "next/navigation";
import axios, { HttpStatusCode } from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserName } from "@utils/my-redux-store/slices/userInfoSlice";

interface MyFormElements extends HTMLFormControlsCollection {
    first_name: HTMLInputElement
    last_name: HTMLInputElement
    username: HTMLInputElement
    password: HTMLInputElement
    user_btn: HTMLInputElement
    accountant_btn: HTMLInputElement
}

interface MyFormElements extends HTMLFormElement {
    readonly elements: MyFormElements
}

export default function RegisterForm() {
    const router = useRouter();
    const dispatch = useDispatch();

    function backToLogin(ev: MouseEvent) {
        ev.preventDefault();
        router.push("/");
    }

    function register(event: React.FormEvent<MyFormElements>) {
        event.preventDefault();

        const firstName = event.currentTarget.elements.first_name.value;
        const lastName = event.currentTarget.elements.last_name.value;
        const userName = event.currentTarget.elements.username.value;
        const password = event.currentTarget.elements.password.value;
        const userRadioButton = event.currentTarget.elements.user_btn.checked;
        
        const selectedRole: String[] = new Array();
        if (userRadioButton) {
            selectedRole.push("USER");
        } else {
            selectedRole.push("ACCOUNTANT");
        }

        axios.post("http://localhost:8082/auth/register", {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            roles: {
                roles: selectedRole
            }
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
            alert(error.response.data);
        })
    }

    function setVisibility(button: HTMLButtonElement, inputFields: Array<HTMLInputElement>,
        passwordInputField: HTMLInputElement, radioBtns: Array<HTMLInputElement>) {
        const inputFieldsFilled = inputFields.every((inputField) => inputField.value.trim() != "");
        const passwordInputFilled = passwordInputField.value != "";
        const radioBtnSelected = radioBtns.some((radioBtn) => radioBtn.checked);

        if (inputFieldsFilled && passwordInputFilled && radioBtnSelected) {
            button.style.visibility = "visible";
        } else {
            button.style.visibility = "hidden";
        }
    }

    useEffect(() => {
        const button = document.getElementById("submit_btn") as HTMLButtonElement;
        const usernameInput = document.getElementById("username") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;
        const firstNameInput = document.getElementById("first_name") as HTMLInputElement;
        const lastNameInput = document.getElementById("last_name") as HTMLInputElement;
        const userRadioBtn = document.getElementById("user_btn") as HTMLInputElement;
        const accountantRadioBtn = document.getElementById("accountant_btn") as HTMLInputElement;

        const inputFields: HTMLInputElement[] = new Array(usernameInput, firstNameInput, lastNameInput);
        const radioBtns: HTMLInputElement[] = new Array(userRadioBtn, accountantRadioBtn);

        if (button && usernameInput && passwordInput 
            && firstNameInput && lastNameInput && userRadioBtn && accountantRadioBtn) {
            button.style.visibility = "hidden";

            usernameInput.addEventListener("change", (ev) => {
                setVisibility(button, inputFields, passwordInput, radioBtns);
            })
            passwordInput.addEventListener("change", (ev) => {
                setVisibility(button, inputFields, passwordInput, radioBtns);
            })
            firstNameInput.addEventListener("change", (ev) => {
                setVisibility(button, inputFields, passwordInput, radioBtns);
            })
            lastNameInput.addEventListener("change", (ev) => {
                setVisibility(button, inputFields, passwordInput, radioBtns);
            })
            userRadioBtn.addEventListener("change", (ev) => {
                setVisibility(button, inputFields, passwordInput, radioBtns);
            })
            accountantRadioBtn.addEventListener("change", (ev) => {
                setVisibility(button, inputFields, passwordInput, radioBtns);
            })
        }
    })

    return (
        <section className={styles.form_section}>
            <div className={styles.form_popup} id="myForm">
                <h1 className={styles.form_header}>Register</h1>
                <form onSubmit={register} className={styles.form_container}>
                    <div className={styles.label_div}>
                        <label htmlFor="first_name" className={styles.input_label}><b>First name</b></label>
                        <input className={styles.input_field} type="text" placeholder="First name" name="first_name" id="first_name" required/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="last_name" className={styles.input_label}><b>Last name</b></label>
                        <input className={styles.input_field} type="text" placeholder="Last name" name="last_name" id="last_name" required/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="username" className={styles.input_label}><b>Username</b></label>
                        <input className={styles.input_field} type="text" placeholder="Username" name="username" id="username" required/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="password" className={styles.input_label}><b>Password</b></label>
                        <input className={styles.input_field} type="password" placeholder="Password" name="password" id="password" required />
                    </div>
                    <div className={styles.label_div}>
                        <div className={styles.input_label}><b>Role</b></div>
                        <div className={styles.radio_container}>
                            <div className={styles.radio_btn_div}>
                                <input type="radio" id="user_btn" name="role" value="user"/>
                                <label htmlFor="user_btn">User</label> 
                            </div>
                            <div className={styles.radio_btn_div}>
                                <input type="radio" id="accountant_btn" name="role" value="accountant"/>
                                <label htmlFor="accountant_btn">Accountant</label> 
                            </div>
                        </div>
                    </div>
                    <div className={styles.btn_div} id={styles.submit_btn_div}>
                        <button type="submit" className={styles.btn} id="submit_btn">
                            Register
                        </button>
                    </div>
                </form>
                <div className={styles.btn_div} id={styles.back_btn_div}>
                    <button onClick={backToLogin} className={styles.btn}>
                        Back
                    </button>
                </div>
            </div>
        </section>
    );
}