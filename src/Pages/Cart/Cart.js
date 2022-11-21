import React from 'react'
import CartCounter from './cartCounter'
import { useSelector, useDispatch } from 'react-redux'
import {AddToCart} from '../../redux/cart'

export default function Cart() {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
  return (
    <div>
        <CartCounter />
        <h1>{cart[0].qty}</h1>
        <button onClick={()=> dispatch(AddToCart({id: "ABC", qty: 2}))}>Hello</button>
    </div>
  )
}
