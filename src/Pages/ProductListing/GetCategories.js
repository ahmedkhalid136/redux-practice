import React, {useEffect} from "react";
import {useState} from "react";
import firebase from './../../firebase/firebase'
import "./index.modular.scss"
import {NavLink} from "react-router-dom";

export default function Categories(props){
    const[categories,setCategories]=useState([])
    const[loading,setLoading]=useState(false);

    const ref2=firebase.firestore().collection("Product Categories")
    function getCategories(){
        setLoading(true)
        ref2.onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setCategories(items)
            setLoading(false)
        })
    }

    useEffect(()=>{
        getCategories()
    })

    return(
        <div>
            {categories.map((category)=>(
                <div className="category">
                    <h4 onClick={()=> props.setcategory(category)}>{category.title}</h4>
                    {/*<p>{category.description}</p>*/}
                </div>
            ))}
        </div>
    )

}