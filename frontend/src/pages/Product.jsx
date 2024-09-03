import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border p-1 ${
                  image === item ? 'border-2 border-gray-500' : ''
                }`}
                src={item}
                key={index}
                alt=''
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <div className='border p-1'>
              <img className='w-full h-auto' src={image} alt='' />
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3.5' src={assets.star_icon} alt='' />
            <img className='w-3.5' src={assets.star_icon} alt='' />
            <img className='w-3.5' src={assets.star_icon} alt='' />
            <img className='w-3.5' src={assets.star_icon} alt='' />
            <img className='w-3.5' src={assets.star_dull_icon} alt='' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{productData.price.toLocaleString('vi-VN')}{currency}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Dung tích :</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-gray-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <button onClick={decreaseQuantity} className='px-4 py-2 border w-12 flex items-center justify-center'>-</button>
            <span className='px-2 py-2 border w-16 flex items-center justify-center'>{quantity}</span>
            <button onClick={increaseQuantity} className='px-4 py-2 border w-12 flex items-center justify-center'>+</button>
          </div>
          <button onClick={() => addToCart(productData._id, size, quantity)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-5'>
            THÊM GIỎ HÀNG
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>Sản phẩm chính hãng 100%</p>
            <p>Có sẵn tiền mặt khi giao hàng cho sản phẩm này</p>
            <p>Chính sách đổi trả dễ dàng trong vòng 7 ngày.</p>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border p-5 py-3 text-sm'>Chi tiết</b>
          <p className='border p-5 py-3 text-sm'>Đánh giá (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Trang web thương mại điện tử là một nền tảng trực tuyến tạo điều kiện thuận lợi cho việc mua và bán sản phẩm hoặc dịch vụ qua internet...</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
}

export default Product;

