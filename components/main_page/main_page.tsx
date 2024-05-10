"use client";

import styles from "./main_page.module.css";
import { RootState } from "@utils/my-redux-store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function MainPage() {
    const { token, username } = useSelector((state: RootState) => state.userInfo.value);
    const [requestPending, setRequestPending] = useState<boolean>(true);
    const roles = useRef<Array<String>>(new Array<String>());
    const router = useRouter();

    function showInvoiceList(event: MouseEvent) {
        event.preventDefault();
        router.push("/invoice_list");
    }

    function logout(event: MouseEvent) {
        event.preventDefault();
        console.log("itt");
        console.log(token);

        axios.post("http://localhost:8082/auth/logout", { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            console.log(response.data);
            router.push("/");
        })
        .catch(error => {
            console.log(error);
        });  
    }

    useEffect(() => {
        if (requestPending) {
            axios.get(`http://localhost:8082/users/getRole/${username}`, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                console.log(response.data);
                const listOfRoles = response.data as Array<String>;
                listOfRoles.forEach((element) => {
                    roles.current.push(element);
                });
                setRequestPending(false);
            })
            .catch(error => {
                console.log(error);
            });            
        }
    }) 

    return (
        (requestPending) ? (<></>) : (
            <section className={styles.btn_section}>
                { (roles.current.indexOf("ADMINISTRATOR") > -1) && <button className={styles.menu_btn} id="administrator_page_btn">Administration Page</button> }
                <button onClick={showInvoiceList} className={styles.menu_btn} id="invoice_list_btn">List of Invoices</button>
                <button onClick={logout} className={styles.menu_btn} id="logout_btn">Logout</button>
            </section>
        )
    )
}