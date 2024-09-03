import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity,getTotalPrice,navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);


  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      {cartData.length === 0 ? (
        <div className='text-center text-lg text-gray-600'>
          <p>Giỏ hàng của bạn đang trống</p>
          <Link
            to='/'
            className='mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded'
          >
            Tiếp tục mua hàng
          </Link>
        </div>
      ) : (
        <div>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{getTotalPrice(productData.price, item.quantity)}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                    className='px-2 py-2 border w-8 flex items-center justify-center'
                  >
                    -
                  </button>
                  <span className='px-2 py-2 border w-10 flex items-center justify-center'>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className='px-2 py-2 border w-8 flex items-center justify-center'
                  >
                    +
                  </button>
                </div>
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-4 mr-4 sm:w-5 cursor-pointer'
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            );
          })}
            <div className='flex justify-end my-20'>
              <div className='w-full sm:w-[450px]'>
                <CartTotal />
                <div className='w-full text-end'>
                  <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>THANH TOÁN</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Cart;


