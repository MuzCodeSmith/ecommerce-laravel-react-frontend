import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [cardData, setCartdata] = useState(JSON.parse(localStorage.getItem('cart')) ||[]);

    const addToCart = (product, size=null) =>{
        let updatedCart = [...cardData];

        // if cart is empty
        if(cardData.length == 0){
            updatedCart.push({
                id:`${product.id}-${Math.floor(Math.random()*1000000)}`,
                product_id:product.id,
                size:size,
                title:product.title,
                price:product.price,
                qty:1,
                image_url:product.image_url,
            })
        }

        setCartdata(updatedCart);
        localStorage.setItem('cart',JSON.stringify(updatedCart));
    }

    return(
        <CartContext.Provider value={{addToCart}} >
            {children}
        </CartContext.Provider>
    )
}