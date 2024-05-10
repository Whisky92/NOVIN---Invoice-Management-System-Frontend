'use client';

import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./invoice_form.module.css";
import { useRouter } from "next/navigation";
import axios, { HttpStatusCode } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@utils/my-redux-store/store";

interface MyFormElements extends HTMLFormControlsCollection {
    customer_name: HTMLInputElement
    creation_date: HTMLInputElement
    deadline: HTMLInputElement
    item_name: HTMLInputElement
    comment: HTMLInputElement
    price: HTMLInputElement
}

interface MyFormElements extends HTMLFormElement {
    readonly elements: MyFormElements
}

export default function InvoiceForm() {
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.userInfo.value);


    function backToInvoiceList(event: MouseEvent) {
        event.preventDefault();
        router.push("/invoice_list");
    }

    function createInvoice(event: React.FormEvent<MyFormElements>) {
        event.preventDefault();

        const customerName = event.currentTarget.elements.customer_name.value;
        const creationDate = event.currentTarget.elements.creation_date.value;
        const deadline = event.currentTarget.elements.deadline.value;
        const itemName = event.currentTarget.elements.item_name.value;
        const comment = event.currentTarget.elements.comment.value;
        const price = event.currentTarget.elements.price.value;

        if (deadline <= creationDate) {
            alert("Deadline should be after creation date!");
            return;
        }

        if (parseInt(price) < 1) {
            alert("Price must be greater than zero");
            return;
        }

        axios.post("http://localhost:8082/invoices/createInvoice", {
            customerName: customerName,
            creationDate: creationDate,
            deadline: deadline,
            itemName: itemName,
            comment: comment,
            price: price
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            alert('Invoice successfully created!');
            router.push("/invoice_list");
        })
        .catch((error) => {
            alert("Something went wrong");
        })
    }

    function setVisibility(button: HTMLButtonElement, inputFields: Array<HTMLInputElement>) {
        const inputFieldsFilled = inputFields.every((inputField) => inputField.value.trim() != "");

        if (inputFieldsFilled) {
            button.style.visibility = "visible";
        } else {
            button.style.visibility = "hidden";
        }
    }

    useEffect(() => {

        const button = document.getElementById("submit_btn") as HTMLButtonElement;
        const customerNameInput = document.getElementById("customer_name") as HTMLInputElement;
        const creationDateInput = document.getElementById("creation_date") as HTMLInputElement;
        const deadlineInput = document.getElementById("deadline") as HTMLInputElement;
        const itemNameInput = document.getElementById("item_name") as HTMLInputElement;
        const comment = document.getElementById("comment") as HTMLInputElement;
        const price = document.getElementById("price") as HTMLInputElement;

        const inputFields: HTMLInputElement[] = new Array(
            customerNameInput, creationDateInput, deadlineInput,
            itemNameInput, comment, price
        );

        if (button && customerNameInput && creationDateInput 
            && deadlineInput && itemNameInput && comment && price) {
            button.style.visibility = "hidden";

            customerNameInput.addEventListener("change", (ev) => {
                setVisibility(button, inputFields);
            })
            creationDateInput.addEventListener("change", (ev) => {
                setVisibility(button, inputFields);
            })
            deadlineInput.addEventListener("change", (ev) => {
                setVisibility(button, inputFields);
            })
            itemNameInput.addEventListener("change", (ev) => {
                setVisibility(button, inputFields);
            })
            comment.addEventListener("change", (ev) => {
                setVisibility(button, inputFields);
            })
            price.addEventListener("change", (ev) => {
                setVisibility(button, inputFields);
            })
        }
    })

    return (
        
        <section className={styles.form_section}>
            <div className={styles.form_popup} id="myForm">
                <h1 className={styles.form_header}>Create Invoice</h1>
                <form onSubmit={createInvoice} className={styles.form_container}>
                    <div className={styles.label_div}>
                        <label htmlFor="customer_name" className={styles.input_label}><b>Customer name</b></label>
                        <input className={styles.input_field} type="text" placeholder="Customer name" name="customer_name" id="customer_name" required/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="creation_date" className={styles.input_label}><b>Creation date</b></label>
                        <input className={styles.input_field} type="date" placeholder="Creation date" name="creation_date" id="creation_date" required/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="deadline" className={styles.input_label}><b>Deadline</b></label>
                        <input className={styles.input_field} type="date" placeholder="Deadline" name="deadline" id="deadline" required/>
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="item_name" className={styles.input_label}><b>Item name</b></label>
                        <input className={styles.input_field} type="text" placeholder="Item name" name="item_name" id="item_name" required />
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="comment" className={styles.input_label}><b>Comment</b></label>
                        <input className={styles.input_field} type="text" placeholder="Comment" name="comment" id="comment" required />
                    </div>
                    <div className={styles.label_div}>
                        <label htmlFor="price" className={styles.input_label}><b>Price</b></label>
                        <input className={styles.input_field} type="number" placeholder="Price" name="price" id="price" required />
                    </div>
                    <div className={styles.btn_div} id={styles.submit_btn_div}>
                        <button type="submit" className={styles.btn} id="submit_btn">
                            Submit
                        </button>
                    </div>
                </form>
                <div className={styles.btn_div} id={styles.back_btn_div}>
                    <button onClick={backToInvoiceList} className={styles.btn}>
                        Back
                    </button>
                </div>
            </div>
        </section>
    );
}