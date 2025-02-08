import React from 'react';


import { useNavigate } from 'react-router-dom';

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3 text-2xl'>
        <p className='capitalize text-gray-700 font-medium'>{text1} <span className='text-gray-500 '>{text2} </span></p>
        
    </div>
  )
}
const Coupons = () => {
   const coupons=[
    {imgUrl:'https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg', path:"groceries"},
    {imgUrl:'https://api.spicezgold.com/download/file_1734525634299_NewProject(2).jpg', path:"fashion"},
    {imgUrl:'https://api.spicezgold.com/download/file_1734525620831_NewProject(3).jpg', path:"fashion"},
    {imgUrl:'https://api.spicezgold.com/download/file_1734532742018_NewProject(22).jpg', path:"home"},

   ]
 
   const navigate=useNavigate()



   function handleOffers(pathName){
        navigate("/category/"+pathName)
   }

  return (
    <div className="mt-10 px-8 mr-8 ml-8 bg-gradient-to-t from-[#daecdf] to-pink-700 rounded-2xl ">
  <div className="mt-10 px-8 mr-8 ml-8 ">
    <h2 className="font-bold text-2xl mb-4">
      <Title text1={"Offers for"} text2={"You"} />
    </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ">
      {coupons.map((coupon, index) => (
        <div className='m-4'>
        <div 
          key={index} 
          className="transition duration-300 hover:scale-110 hover:shadow-lg cursor-pointer rounded-lg shadow-md overflow-hidden bg-white p-2"
        >
          <img 
            src={coupon.imgUrl} 
            alt={coupon.path} 
            onClick={() => handleOffers(coupon.path)}
            className="w-full h-48 object-center rounded-md  bg-gray-100 " 
          />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

    
  );
};

export default Coupons;