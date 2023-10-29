import React, { Fragment, useEffect, useState } from "react";
import styles from './styles.module.css';


const sideBarData = [
    { label:"Dashboard", icon:"home", color:"#4680ff", path:"/" },
    // { label:"Clients", icon:"users", color:"#FC6180", path:"/clients" },
    { label:"Clients", icon:"users", color:"#ffb64d", path:"/clients" },
    { label:"Providers", icon:"truck", color:"#25787e", path:"/providers" },
    { label:"Products", icon:"product-hunt", color:"#ff4646", path:"/products" },
    { label:"Stock", icon:"archive", color:"#93be52", path:"/stock" },
    { label:"Sales", icon:"bar-chart", color:"#4680ff", path:"/sales" },
    { label:"Invoice", icon:"bar-chart", color:"#4680ff", path:"/invoice" },
    { label:"User", icon:"user", color:"#ffb64d", path:"/user" },
    { label:"Workers", icon:"suitcase", color:"#25787e", path:"/Workers" },


]


export default function Sidebar(props) {

    const [itemList, setItemList] = useState(sideBarData);


    const handleItemSelection = () => {
        console.log("item clicked");
    }

    useEffect(() => {
        setItemList(sideBarData);
    });


    return (
    <div className={styles.sideBarContainer}>
        <section className={styles.profileContainer}>
            <img className={styles.profilePicture} alt="profile-avatar" src="/assets/img/avatar.jpg" />
            <div>
                <h3 className={styles.profileName}>Mohamed Elleuch</h3>
                <div className={styles.textContainer} >
                    <span className={styles.profileAccountType} >Administrator</span>
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                </div>
            </div>
        </section>
        <section className={styles.pages}>
            <h4>Pages:</h4>
            <ul className={styles.listUL}>
                {itemList.map( (item, key) => <Item key={key} label={item.label} icon={item.icon} color={item.color} path={item.path} />)}
            </ul>
        </section>
    </div>
    )
}

const Item = (props) => {

    const [path,] = useState(props.path)

    const redirect = () => {
        window.location.href = path;
    }

    return (
        <li className={styles.item} onClick={redirect}>
            <div className={styles.iconContainer} style={{backgroundColor:props.color}}>
                <i className={"fa fa-"+props.icon} aria-hidden="true"></i>
            </div>
            <h3 className={styles.itemText}>{props.label}</h3>
        </li>
    )
}