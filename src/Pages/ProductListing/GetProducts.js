import React, {useEffect} from "react";
import {useState} from "react";
import firebase from './../../firebase/firebase'
import Card from "../../Components/Card";
import "./index.modular.scss"


export default function Products(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const[value,setValue]=useState(6)

    const ShowNext = () => {
        setValue(value+6);
    }

    const ShowLess = () => {
        setValue(value-6);
    }

    const ref = firebase.firestore().collection("Products")

    const getProductsByCategory = async () =>{

        await  ref.limit(6)
            .where('category_id', "==", props.category.id ?? "").get().then(data => {
            let items = []
            data.forEach((doc) => {
                items.push(doc.data())
            })
            setProducts(items)
        })
    }

    useEffect(()=>{
        getProductsByCategory()
    }, [props.category])

    const getProductsByPrice = async () =>{

        await  ref.limit(6)
            .where('price', "<=", props.max ?? 0).where('price',">=",props.min ?? 0).get().then(data => {
            let items = []
            data.forEach((doc) => {
                items.push(doc.data())
            })
            setProducts(items)
        })

        console.log(products, "NON Queried data")
    }

    useEffect(()=>{
        getProductsByPrice();
    },[props.max,props.min])

    function getProducts() {
        setLoading(true)
        ref
            // .limit(6)
            .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setProducts(items)
            setLoading(false)
        })
    }

    useEffect(() => {
        getProducts()
    }, [])

    if (loading) {
        return <h2>LOADING....</h2>
    }

    // const showNext = ({ item }) => {
    //     if(products.length === 0) {
    //         alert("Thats all we have for now !")
    //     } else {
    //         const fetchNextData = async () => {
    //             await ref
    //                 .limit(6)
    //                 .startAfter(item.created)
    //                 .onSnapshot(function(querySnapshot) {
    //                     const items = [];
    //                     querySnapshot.forEach(function(doc) {
    //                         items.push({ key: doc.id, ...doc.data() });
    //                     });
    //                     setProducts(items);
    //                     setPage(page + 1)
    //                 })
    //         };
    //         fetchNextData();
    //     }
    // };

    const showPrevious = ({item}) => {
        const fetchPreviousData = async () => {
            await firebase.firestore().collection('users')
                .orderBy('created', 'desc')
                .endBefore(item.created)
                .limitToLast(6)
                .onSnapshot(function(querySnapshot) {
                    const items = [];
                    querySnapshot.forEach(function(doc) {
                        items.push({ key: doc.id, ...doc.data() });
                    });
                    setProducts(items);
                    setPage(page - 1)
                })
        };
        fetchPreviousData();
    };
    return (
        <div>
        {products.slice(0,value).map((data)=>(
                <div className="card">
                    <Card
                        img= {data.image}
                        title={data.title}
                        description={data.description}
                        price={data.price}
                    />
                </div>
            ))}

            <div>
                {
                page === 1 ? '' :
                    <button onClick={ShowLess}>PREVIOUS</button>
            }
                {
                        <button onClick={ShowNext}>Next</button>
                }
        </div>
        </div>
    )

}