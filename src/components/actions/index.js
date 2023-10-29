import React, { useEffect, useState } from "react";
import Button from "../button";
import styles from './styles.module.css';

import Swal from 'sweetalert2'

export default function Actions (props) {
    const [workingMode, setworkingMode] = useState(localStorage.mode || "default");


    const mode = () => {
        let _mode = localStorage.mode || "default";
        switch(_mode) {
            case "default":
                return  <section className={styles.sectionStyle}>
                            <Button type="success" label="Add" icon="plus-square-o" style={{margin:5}} onClick={props.onAdd} />
                            <Button type="warning" label="Edit" icon="edit" style={{margin:5}} onClick={props.onEdit} />
                            <Button type="error" label="Delete" icon="trash-o" style={{margin:5}} onClick={props.onDelete} />
                            <Button type="primary" label="Add Sale" icon="user" style={{margin:5}} />
                        </section>
            case "save-cancel":
                return  <section className={styles.sectionStyle}>
                            <Button type="success" label="Save" icon="save" style={{margin:5}} onClick={props.onConfirmEdit} />
                            <Button type="error" label="Cancel" icon="ban" style={{margin:5}} onClick={props.onCancel} />
                        </section>
            case "add-cancel":
                return  <section className={styles.sectionStyle}>
                            <Button type="success" label="Add" icon="plus-square-o" style={{margin:5}} onClick={props.onConfirmAdd} />
                            <Button type="error" label="Cancel" icon="ban" style={{margin:5}} onClick={props.onCancel} />
                        </section>
        }
    }

    useEffect(()=>{
        mode();
    },[workingMode]);

    const HandleStorageEvent = () => {
        window.addEventListener("storage", () => {
            setworkingMode(localStorage.mode || "default");
        })        
    }

    useEffect(()=>{
        HandleStorageEvent();
    },[]);

    // const data = localStorage.getItem('selectedLine').split('\t');
    if(props.visibility ) {
        // console.table();
        return mode();
    }
}

const section = {
    display: "flex"
}