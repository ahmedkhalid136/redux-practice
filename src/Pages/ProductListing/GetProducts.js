import React, { useState,useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { cartAction } from "../../redux/cart";
import firebase from "./../../firebase/firebase";
import Card from "../../Components/Card";

import "./index.modular.scss";

export default function Products(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [value, setValue] = useState(6);
    // const [query, setQuery] = useState("");
    // const [error, setError] = useState(null);

    // const Item = () => {
    //     const cart = useSelector((state) => state.cart);
    //     const dispatch = useDispatch();
    //
    //     const addToCart = (item) => {
    //         const isAdded = cart.some((e) => {
    //             return e.id === item.id;
    //         });
    //
    //         if (!isAdded) {
    //             dispatch(
    //                 cartAction.add({
    //                     id: item.id,
    //                     name: item.name,
    //                     price: item.price,
    //                     amount: 1
    //                 })
    //             );
    //         } else {
    //             alert("Already Added");
    //         }
    //     };


        const ShowNext = () => {
            setValue(value + 6);
            setPage(page + 1);
        };

        const ShowLess = () => {
            setValue(value - 6);
            setPage(page - 1);
        };


        const ref = firebase.firestore().collection("Products");


        const getProductsByCategory = async () => {
            await ref
                .limit(value)
                .where("category_id", "==", props.category.id ?? "")
                .get()
                .then((data) => {
                    let items = [];
                    data.forEach((doc) => {
                        items.push(doc.data());
                    });
                    setProducts(items);
                });
        };

        useEffect(() => {
            getProductsByCategory();
        }, [props.category]);

        const getProductsByPrice = async () => {

            await ref
                .limit(value)
                .where("price", "<=", props.max ?? 0)
                .where("price", ">=", props.min ?? 0)
                .get()
                .then((data) => {
                    let items = [];
                    data.forEach((doc) => {
                        items.push(doc.data());
                    });
                    setProducts(items);
                });

            console.log(products, "NON Queried data");
        };

        useEffect(() => {
            getProductsByPrice();
        }, [props.max, props.min]);

        function getProducts() {
            setLoading(true);
            ref
                .limit(value)
                .get()
                .then((querySnapshot) => {
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        items.push(doc.data());
                    });
                    setProducts(items);
                    setLoading(false);
                });
        }

        useEffect(() => {
            getProducts();
            // fetchPaginatedData();
        }, [value]);


        return (
            <div>
                {products.map((data) => (
                    <div className="card">
                        <Card
                            img={data.image}
                            title={data.title}
                            description={data.description}
                            price={data.price}
                        />
                        <button className="card_btn"> Add to cart</button>
                    </div>
                ))}

                <div>
                    {page === 1 ? "" : <button className="previous" onClick={ShowLess}>PREVIOUS</button>}
                    {<button className="next" onClick={ShowNext}>Next</button>}
                </div>
            </div>
        );
    }