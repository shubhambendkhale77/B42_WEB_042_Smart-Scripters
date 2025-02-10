import React from 'react';


import { useNavigate } from 'react-router-dom';

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3 text-2xl'>
        <p className='capitalize text-white font-medium'>{text1} <span className='text-gray-500 '>{text2} </span></p>
        
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
    <div className="mt-12 mx-8 px-8 bg-gradient-to-b from-red-300 to-purple-300 text-white rounded-2xl py-10">
  <div className="px-6">
    <h2 className="font-bold text-2xl mb-6">
    <Title text1={<span className="text-gray-800 font-bold text-3xl">Offers for You</span>} text2={""} />
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {coupons.map((coupon, index) => (
        <div key={index} className="p-2">
          <div 
            className="transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer rounded-xl shadow-md overflow-hidden bg-white p-3"
            // onClick={() => handleOffers(coupon.path)}
          >
            <img 
              src={coupon.imgUrl} 
              alt={coupon.path} 
              className="w-full h-48 object-cover rounded-lg bg-gray-100"
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