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
        }else{
            if(size !=null){
                const isProducExist = updatedCart.find(item=>item.product_id == product.id && item.size == size)

                if(isProducExist){
                    updatedCart= updatedCart.map(item=>
                        (item.product_id == product.id && item.size == size) ? {...item,qty:item.qty+1} : item
                        )
                }else{
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
            }else{
                const isProducExist = updatedCart.find(item=>item.product_id == product.id)

                if(isProducExist){
                    updatedCart= updatedCart.map(item=>
                        (item.product_id == product.id) ? {...item,qty:item.qty+1} : item)
                }else{
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
            }
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