import React, {useEffect, useState} from "react";
import styles from './styles.module.css';
import Card from "../../components/card";
import Loading from "../../components/loading";
import Sidebar from "../../components/sidebar";
import Table from "../../components/table";
import Topbar from "../../components/topbar";
import Form from "../../components/form";
import useForceUpdate from "../../Hooks/forceUpdate";
import Swal from 'sweetalert2'
import Actions from "../../components/actions";
import * as Events from "./Events";

export default function ClientsMgr(props) {
    const forceUpdate = useForceUpdate();
    const [isLoading, setisLoading] = useState(true);
    const [tableLoading, settableLoading] = useState(true);
    const [limit, setlimit] = useState(localStorage.getItem("limit") || 10);
    const [offset, setoffset] = useState(localStorage.getItem("offset") || 0);
    const [totalCount, settotalCount] = useState(localStorage.getItem("totalCount") || -1);
    const [selectedLine, setselectedLine] = useState(localStorage.getItem("selectedLine")?localStorage.getItem("selectedLine").split('\t') : []);
    const [readOnly, setreadOnly] = useState(localStorage.getItem("readOnly") || true);
    const [data, setdata] = useState({
        header: [],
        body: []
    });
    const [tableItemSelected, settableItemSelected] = useState(false);
    const  header = ["Client Code","First Name","Last Name","Phone","Email","Address","Tax Number","Postal Code","Fax","Observations"]




    //const {fscreen, setFScreen} = useFullscreen(false)

    const getDataUser = async () => {
        settableLoading(true);
        let res = null;
        try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/getClients?limit=${limit}&offset=${offset}`);
            res = await response.json();
            const body = await Promise.all(res.map(obj => {
                const temp = [];
                temp.push(obj.codeClient);
                temp.push(obj.fname);
                temp.push(obj.lname);
                temp.push(obj.phone);
                temp.push(obj.email);
                temp.push(obj.address);
                temp.push(obj.taxNumber);
                temp.push(obj.postalCode);
                temp.push(obj.fax);
                temp.push(obj.observations);
                return temp;
            }));
            setdata({
                header: header,
                body: body
            });
            // localStorage.setItem("totalCount",res.totalCount);
            setTimeout(() => {
                settableLoading(false);
            }, 100);
        } catch(e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }
    }

    useEffect(() => {
        getDataUser();
    },[]);

    useEffect(() => {
        forceUpdate();
    },[selectedLine]);

    const HandleStorageEvent = () => {
        window.onstorage = () => {
            // When local storage changes, dump the list to
            // the console.
            setlimit(localStorage.getItem("limit") || 10);
            setoffset(localStorage.getItem("offset") || 10);
            settotalCount(localStorage.getItem("totalCount") || -1);
            setselectedLine(localStorage.getItem("selectedLine") ? localStorage.getItem("selectedLine").split('\t') : []);
            setreadOnly(localStorage.getItem("readOnly")=="true"?true:false);
            
        };
    }

    useEffect(()=>{
        if(selectedLine.length>0) {
            settableItemSelected(true)
        }
    },[selectedLine])

    useEffect(()=>{
        HandleStorageEvent();
        // getDataUser();
        setTimeout(()=>{
            setisLoading(false);
        },1000);
        if(!eval(localStorage.tableDisabled)) {
            localStorage.removeItem("selectedLine")
        }
    },[]);

    return <div>
        {isLoading && <Loading />}
        {isLoading ||
            <div>
                <Topbar />
                <Sidebar />
                <main>
                    <Card title="Clients Management" text="From this table you can manage the list of client:" />
                    <Actions 
                        visibility={!tableLoading} 
                        data={data} 
                        onAdd={Events.addClient}
                        onEdit={Events.editClient}
                        onDelete={Events.deleteClient}
                        onConfirmAdd={Events.confirmAddClient}
                        onConfirmEdit={Events.confirmEditClient}
                        onCancel={Events.cancelOperation}
                    />
                    <Table data={data} loading={tableLoading} offset={setoffset} limit={setlimit}  />
                    <Card title="Client Details:" text="Here the details of the selected client are show one by one:" />
                    <Form visibility={tableItemSelected} data={data} selectedLine={selectedLine} readOnly={readOnly} classname={styles.orm} />
                </main>
            </div>
        }
    </div>
}
