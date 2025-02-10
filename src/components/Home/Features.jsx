import React from 'react';
import { RiExchangeFundsLine } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { MdHeadsetMic } from "react-icons/md";


const cute2 ='https://cdn.shopify.com/s/files/1/0070/7032/articles/subscription-ecommerce.png?v=1738939214';
const Features= () => {
  const icons = [
    { icon: <RiExchangeFundsLine/>, title: 'Easy Exchange Policy', description: 'We offer hassle free exchange policy' },
    { icon: <SiTicktick />, title: '7 Days Return Policy', description: 'We provide 7 days free return policy' },
    { icon: <MdHeadsetMic/>, title: 'Best customer support', description: 'We provide 24/7 customer support' },
  ];

  return (
    <div className='bg-gradient-to-b from-red-400 to-orange-300 text-white pt-8 mr-10 ml-10 mt-12 rounded-2xl'>
        <div className="container flex flex-col justify-around sm:flex-row  mx-auto pb-1  ">
        {icons.map((icon, index) => (
            <div key={index} className='py-6'>
                <div className="flex flex-col items-center my-10 ">
                        <span className="text-5xl pb-4">{icon.icon}</span>
                        <h3 className='text-white font-semibold'>{icon.title}</h3>
                        <p className='text-black text-sm '>{icon.description}</p>
                </div>
            </div>
        ))}
        </div>
        <div className='flex flex-col items-center md:flex-row justify-around p-1 '>
            <div className=''>
                <img src={cute2} className='h-30 rounded-lg mb-10'/>
            </div>
            <div className='text-center'>
                <h2 className='sm:text-lg md:text-3xl font-bold my-4'>Subscribe now & get 20% off </h2>
                <p className='sm:text-sm md:text-xl text-gray-900 mb-4'> stay home, stay safe & happy shopping</p>
                <div className=''>
                    <input placeholder="Enter your email "className='text-sm  sm:w-48 md:w-60 outline-none p-3 rounded-s-2xl'/>
                    <button className='bg-gray-700 text-white text-sm p-3 rounded-e-2xl sm:mb-10'>Subscribe</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Features;