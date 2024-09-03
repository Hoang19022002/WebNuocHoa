import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export const ShopContext = createContext();
const ShopContextProvider = (props) => {
    // const currency = '$';
    const currency = 'đ';
    const delivery_fee = 10000;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId, size, quantity = 1) => {
        if (!size) {
            toast.error('Vui lòng chọn size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += quantity; // Update quantity
            } else {
                cartData[itemId][size] = quantity; // Set quantity if size is new
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = quantity; // Set quantity for new item
        }
        setCartItems(cartData);

        Swal.fire({
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            // timer: 2000,
            customClass: {
                popup: 'small-swal-popup',  // Custom class for the popup
                title: 'small-swal-title',  // Custom class for the title
                icon: 'small-swal-icon'     // Custom class for the icon
            }
        });
    };
    
    
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems) {
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }
    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }
    const getTotalPrice = (price, quantity) => {
        return (price * quantity).toLocaleString('vi-VN') + currency;
      };

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }  
  
    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount,updateQuantity,getTotalPrice,
        getCartAmount,navigate
        
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;