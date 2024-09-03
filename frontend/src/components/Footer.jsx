import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-gray-100 mt-20 flex flex-col px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-12 text-sm '>
          <div>
            <img className='mb-5 w-40 filter grayscale-100 brightness-0' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Chất lượng, uy tín là yếu tố then chốt để có thể duy trì và không ngừng phát triển trong vòng hơn 6 năm qua, tất các các sản phẩm được cung cấp, bán tại tiệm nước hoa đều là sản phẩm chính hãng, chúng tôi cam kết hoàn tiền 200% nếu khách hàng phát hiện hàng giả, coi sự thành công của khách hàng chính là thành công của chính mình, và mong muốn được nhận thêm nhiều góp ý, đóng góp và những lời động viện, tin tưởng của quý khách hàng để ngày càng hoàn thiện hơn nữa trong tương lai. Tiệm nước hoa luôn tự hào là thương hiệu nước hoa nhận được nhiều phản hồi tốt nhất Việt Nam.
            </p>
          </div>
          <div>
            <p className='text-xl font-medium mb-5 '>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>Trang chủ</li>
              <li>Về chúng tôi</li>
              <li>Vận chuyển</li>
              <li>Liên hệ</li>
            </ul>
          </div>
          <div>
            <p className='text-xl font-medium mb-5 '>CONTACT</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>0978719947</li>
              <li>contact@gmail.com</li>
            </ul>    
          </div>
        </div>
        <div>
          <hr className='border-gray-300'/>
          <p className='py-5 text-sm text-center'>Copyright 2024@ Việt Hoàng</p>
        </div>
      </div>
  )
}

export default Footer