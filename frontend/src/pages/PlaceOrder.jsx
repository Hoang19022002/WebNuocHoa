import React, { useState, useEffect, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method,setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);
  const [tinh, setTinh] = useState([]);
  const [quan, setQuan] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [selectedTinh, setSelectedTinh] = useState('');
  const [selectedQuan, setSelectedQuan] = useState('');

  // Fetch provinces on component mount
  useEffect(() => {
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then(response => response.json())
      .then(data => {
        if (data.error === 0) {
          setTinh(data.data);
        }
      });
  }, []);

  // Fetch districts when a province is selected
  useEffect(() => {
    if (selectedTinh) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
        .then(response => response.json())
        .then(data => {
          if (data.error === 0) {
            setQuan(data.data);
            setPhuong([]); // Reset wards when a new district is selected
          }
        });
    }
  }, [selectedTinh]);

  // Fetch wards when a district is selected
  useEffect(() => {
    if (selectedQuan) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
        .then(response => response.json())
        .then(data => {
          if (data.error === 0) {
            setPhuong(data.data);
          }
        });
    }
  }, [selectedQuan]);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Tên' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Họ' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Phone' />

        <div className='flex flex-col gap-3'>
          <select
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            value={selectedTinh}
            onChange={(e) => setSelectedTinh(e.target.value)}
          >
            <option value="">Chọn Tỉnh Thành</option>
            {tinh.map((t) => (
              <option key={t.id} value={t.id}>{t.full_name}</option>
            ))}
          </select>
          <select
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            value={selectedQuan}
            onChange={(e) => setSelectedQuan(e.target.value)}
            disabled={!selectedTinh}
          >
            <option value="">Chọn Quận Huyện</option>
            {quan.map((q) => (
              <option key={q.id} value={q.id}>{q.full_name}</option>
            ))}
          </select>
          <select
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            disabled={!selectedQuan}
          >
            <option value="">Chọn Phường Xã</option>
            {phuong.map((p) => (
              <option key={p.id} value={p.id}>{p.full_name}</option>
            ))}
          </select>
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Zipcode' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Địa chỉ' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Ghi chú' />
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('vnpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'vnpay' ? 'bg-green-400' : '' }`}></p>
              <img className='h-10 mx-4' src={assets.vnpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : '' }`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Thanh toán khi giao hàng</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
