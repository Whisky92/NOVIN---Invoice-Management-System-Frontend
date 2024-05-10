"use client";

import { RootState } from "@utils/my-redux-store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./user_list.module.css";
import { useSelector } from "react-redux";

interface Role {
    id: number;
    name: string;
    description: string;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    roles: Array<Role>;
}

interface MyFormElements extends HTMLFormControlsCollection {
    user_btn: HTMLInputElement
    accountant_btn: HTMLInputElement
    administrator_btn: HTMLInputElement
}

interface MyFormElements extends HTMLFormElement {
    readonly elements: MyFormElements
}

export default function UserList() {
    const { token } = useSelector((state: RootState) => state.userInfo.value);
    const [requestPending, setRequestPending] = useState<boolean>(true);
    const users = useRef<Array<User>>(new Array());
    const router = useRouter();

    function deleteUser(id: number) {
        axios.delete(`http://localhost:8082/users/delete/${id}`, { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            alert("User successfully deleted");
            router.push("/main_page");
        })
        .catch(error => {
            console.log(error);
        });
    }

    function changeRoles(event: FormEvent<MyFormElements>, id: number) {
        event.preventDefault();

        const userCheckBox = event.currentTarget.elements.user_btn.checked;
        const accountantCheckBox = event.currentTarget.elements.accountant_btn.checked;
        const administratorCheckBox = event.currentTarget.elements.administrator_btn.checked;

        if (!(userCheckBox || accountantCheckBox || administratorCheckBox)) {
            alert("At least one checkbox must be selected");
            return;
        }

        const newRoles = new Array<String>();
        if (userCheckBox) {
            newRoles.push("USER");
        }
        if (accountantCheckBox) {
            newRoles.push("ACCOUNTANT");
        }
        if (administratorCheckBox) {
            newRoles.push("ADMINISTRATOR");
        }

        axios.put(`http://localhost:8082/users/${id}/setRoles`, 
        {
            roles: newRoles,
        }, 
        { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            alert("Roles successfully updated");
            router.push("/main_page");
        })
        .catch(error => {
            console.log(error);
        });
    }   


    useEffect(() => {
        if (requestPending) {
            axios.get(`http://localhost:8082/users/getAllUsers`, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                const listOfUsers = response.data as Array<User>;
                users.current = listOfUsers;
                setRequestPending(false);
            })
            .catch(error => {
                console.log(error);
            });
        }
    })

    return (
        <div className={styles.user_div}>
            <table className={styles.user_table}>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Delete User</th>
                        <th scope="col">Change Roles</th>
                    </tr>
                </thead>
                <tbody>
                    {users.current.map((user) => {
                        return <tr key={user.id}>
                            <th>{user.id}</th>
                            <td className={styles.field}>{user.userName}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)} className={styles.view_btn}>
                                    Delete user
                                </button>
                            </td>
                            <td>
                                <form onSubmit={(event: React.FormEvent<MyFormElements>) => changeRoles(event, user.id)}>
                                    <div>
                                        <input type="checkbox" id={`user_btn`} name="role" value="user"/>
                                        <label htmlFor="user_btn">User</label> 
                                    </div>
                                    <div>
                                        <input type="checkbox" id={`accountant_btn`} name="role" value="accountant"/>
                                        <label htmlFor="accountant_btn">Accountant</label> 
                                    </div>
                                    <div>
                                        <input type="checkbox" id={`administrator_btn`} name="role" value="administrator"/>
                                        <label htmlFor="administrator_btn">Administrator</label>
                                    </div>
                                    <div>
                                        <button type="submit" id={styles.submit_btn}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}