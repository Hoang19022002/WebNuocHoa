import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'> 
        <p>Forever ra đời từ niềm đam mê đổi mới và mong muốn cách mạng hóa cách mọi người mua sắm trực tuyến. Hành trình của chúng tôi bắt đầu với một ý tưởng đơn giản: cung cấp một nền tảng nơi khách hàng có thể dễ dàng khám phá, khám phá và mua nhiều loại sản phẩm một cách thoải mái ngay tại nhà của họ.</p>
        <p>Kể từ khi thành lập, chúng tôi đã làm việc không mệt mỏi để tuyển chọn đa dạng các sản phẩm chất lượng cao đáp ứng mọi sở thích và sở thích. Từ thời trang và làm đẹp đến đồ điện tử và đồ gia dụng thiết yếu, chúng tôi cung cấp bộ sưu tập phong phú có nguồn gốc từ các thương hiệu và nhà cung cấp đáng tin cậy.</p>
        <b className='text-gray-800'>Sứ mệnh của chúng tôi</b>
        <p>Kể từ khi thành lập, chúng tôi đã làm việc không mệt mỏi để tuyển chọn đa dạng các sản phẩm chất lượng cao đáp ứng mọi sở thích và sở thích. Từ thời trang và làm đẹp đến đồ điện tử và đồ gia dụng thiết yếu, chúng tôi cung cấp bộ sưu tập phong phú có nguồn gốc từ các thương hiệu và nhà cung cấp đáng tin cậy.</p>
        </div>
      </div>
    </div>
  )
}

export default About