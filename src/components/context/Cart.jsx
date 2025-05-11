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

    const shipping = () =>{
        return 0;
    }
    const subTotal = () =>{
        let subTotal = 0;
        cardData.map(item=>{
            subTotal += Number(item.qty) * Number(item.price);;
        })
        return Math.round(subTotal);
    }
    const grandTotal = () =>{
        return  subTotal() + shipping();
    }

    const updatedCartItem = (itemId,newQty)=>{
        let updatedCart = [...cardData];
        updatedCart = updatedCart.map(item=>(item.id==itemId)?{...item, qty:newQty}:item);
        setCartdata(updatedCart);
        localStorage.setItem('cart',JSON.stringify(updatedCart));
    }

    const deleteCartItem = (itemId) =>{
        cardData.filter(item=>item.id != itemId);
    }


    return(
        <CartContext.Provider value={{addToCart,cardData,grandTotal,subTotal,shipping,deleteCartItem,updatedCartItem}} >
            {children}
        </CartContext.Provider>
    )
}