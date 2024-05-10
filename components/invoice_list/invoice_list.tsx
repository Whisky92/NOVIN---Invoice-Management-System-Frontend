"use client";

import { RootState } from "@utils/my-redux-store/store";
import axios from "axios";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./invoice_list.module.css";

interface Invoice {
    id: number;
    customerName: String;
    creationDate: Date;
    deadline: Date;
    itemName: String;
    comment: String;
    price: number;
}

export default function InvoiceList() {
    const { token } = useSelector((state: RootState) => state.userInfo.value);
    const [requestPending, setRequestPending] = useState<boolean>(true);
    const invoices = useRef<Array<Invoice>>(new Array<Invoice>());
    console.log(invoices);

    function createInvoice(event: MouseEvent) {
        event.preventDefault();
    }

    useEffect(() => {
        if (requestPending) {
            axios.get('http://localhost:8082/invoices/getAllInvoices', { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                console.log(response.data);
                const listOfRoles = response.data as Array<Invoice>;
                invoices.current = listOfRoles;
                setRequestPending(false);
            })
            .catch(error => {
                console.log(error);
            });  
        }
    })

    return (
        <div className={styles.invoice_div}>
            <table className={styles.invoice_table}>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">CustomerName</th>
                        <th scope="col">CreationDate</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">ItemName</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.current.map((invoice) => {
                        return <tr key={invoice.id}>
                            <th>{invoice.id}</th>
                            <td className={styles.field}>{invoice.customerName}</td>
                            <td>{invoice.creationDate.toString()}</td>
                            <td>{invoice.deadline.toString()}</td>
                            <td>{invoice.itemName}</td>
                            <td>{invoice.comment}</td>
                            <td>{invoice.price}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className={styles.btn_div}>
                <button onClick={createInvoice} className={styles.create_invoice_btn}>Create new invoice</button>
            </div>
        </div>
    )
}