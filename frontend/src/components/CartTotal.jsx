import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);
    const cartAmount = getCartAmount();
    const totalAmount = cartAmount + (cartAmount === 0 ? 0 : delivery_fee);
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTAL'} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{getCartAmount().toLocaleString('vi-VN')}{currency}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
            <p>Giao hàng</p>
            <p>{delivery_fee.toLocaleString('vi-VN')}{currency}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
            <p>Total</p>
            <p>{totalAmount.toLocaleString('vi-VN')}{currency}</p>
            </div>
        </div>

    </div>
  )
}

export default CartTotal