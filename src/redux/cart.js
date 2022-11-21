import { createSlice } from "@reduxjs/toolkit";

const initialState = [{id: "cbwh321", qty:3}];

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            console.log(action)
            const exist = state.findIndex(element => element.id === action.payload.id)
            if(exist > -1){
                state[exist] = {...state[exist], qty: state[exist].qty + 1}
            }
            else{
                state.push({id:action.payload.id, qty: 1})
            }
        }
    }
})

function upsert(array, element) { // (1)
    const i = array.findIndex(_element => _element.id === element.id);
    if (i > -1) array[i] = element; // (2)
    else array.push(element);
  }

export const {AddToCart} = cart.actions 

export default cart.reducer;
