import React from "react";
// import "../Pages/ProductListing/index.modular.scss"
// import "../Pages/ProductListing/index.modular.scss"
export default function Card(props){
    return(
        <div style={{textAlign: "center"}}>
            <div>
                <img className="card_image" src={props.img}/>
                <h2 className="card_title"> {props.title}</h2>
                <p className="card_desc">{props.description}</p>
                <h3 className="card_price">Rs. {props.price}</h3>
            </div>
            <button className="card_btn"> Add to cart</button>
        </div>
    )
}
