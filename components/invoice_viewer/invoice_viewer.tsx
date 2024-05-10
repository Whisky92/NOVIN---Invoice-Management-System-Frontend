"use client";

import styles from "./invoice_viewer.module.css";
import { RootState } from "@utils/my-redux-store/store";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface Invoice {
    id: number;
    customerName: string;
    creationDate: Date;
    deadline: Date;
    itemName: string;
    comment: string;
    price: number;
}

type propsType = {
    id: string;
}

export default function InvoiceViewer({id}: propsType) {
    const { token } = useSelector((state: RootState) => state.userInfo.value);
    const [requestPending, setRequestPending] = useState<boolean>(true);
    const invoice = useRef<Invoice | null>(null);
    const router = useRouter();

    function backToInvoiceList(event: MouseEvent) {
        event.preventDefault();
        router.push("/invoice_list");
    }

    useEffect(() => {
        if (requestPending) {
            axios.get(`http://localhost:8082/invoices/get/${id}`, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                invoice.current = response.data as Invoice;
                setRequestPending(false);
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            const customerNameInput = document.getElementById("customer_name") as HTMLInputElement;
            const creationDateInput = document.getElementById("creation_date") as HTMLInputElement;
            const deadlineInput = document.getElementById("deadline") as HTMLInputElement;
            const itemNameInput = document.getElementById("item_name") as HTMLInputElement;
            const comment = document.getElementById("comment") as HTMLInputElement;
            const price = document.getElementById("price") as HTMLInputElement;

            if (customerNameInput && creationDateInput 
                && deadlineInput && itemNameInput && comment && price) {
            
                const formattedCreationDate = moment(invoice.current.creationDate).format('YYYY-MM-DD');
                const formattedDeadline = moment(invoice.current.deadline).format('YYYY-MM-DD');

                customerNameInput.value = invoice.current.customerName;
                creationDateInput.value = formattedCreationDate;
                deadlineInput.value = formattedDeadline;
                itemNameInput.value = invoice.current.itemName;
                comment.value = invoice.current.comment;
                price.value = invoice.current.price.toString();
            }
        }
    })

    return (
        <section className={styles.outer_section}>
            <div className={styles.popup} id="myForm">
                <h1 className={styles.header}>Invoice</h1>
                <section className={styles.section_container}>
                    <div className={styles.label_div}>
                        <label htmlFor="customer_name" className={styles.input_label}><b>Customer name</b></label>
                        <input className={styles.input_field} type="text" placeholder="Customer name" name="customer_name" id="customer_name" disabled/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="creation_date" className={styles.input_label}><b>Creation date</b></label>
                        <input className={styles.input_field} type="date" placeholder="Creation date" name="creation_date" id="creation_date" disabled/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="deadline" className={styles.input_label}><b>Deadline</b></label>
                        <input className={styles.input_field} type="date" placeholder="Deadline" name="deadline" id="deadline" disabled/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="item_name" className={styles.input_label}><b>Item name</b></label>
                        <input className={styles.input_field} type="text" placeholder="Item name" name="item_name" id="item_name" disabled/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="comment" className={styles.input_label}><b>Comment</b></label>
                        <input className={styles.input_field} type="text" placeholder="Comment" name="comment" id="comment" disabled/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="price" className={styles.input_label}><b>Price</b></label>
                        <input className={styles.input_field} type="number" placeholder="Price" name="price" id="price" disabled/>
                    </div>
                </section>
                <div className={styles.btn_div} id={styles.back_btn_div}>
                    <button onClick={backToInvoiceList} className={styles.btn}>
                        Back
                    </button>
                </div>
            </div>
        </section>
    );
}