import React from 'react'

const ProductCard = ({product}) => {
  const {image,name,brand,mrp,price,rating}=product;
  return (
    <div className='bg-white shadow p-4 hover:shadow-xl transition-all duration-200'>
    <img src={image} alt={name}  className='w-auto h-48 object-fit-contain mb-4' />
    <h3 className='text-sm font-medium text-gray-600 mb-1'>{brand.charAt(0).toUpperCase()+brand.slice(1)}</h3>
    <h2 className='text-lg font-semibold mb-2 '>{name.charAt(0).toUpperCase()+name.slice(1)}</h2>
    <div className=''>
      <p className='text-xl font-bold text-blue-950'>₹{price}</p>
      <p className='text-sm text-gray-500 line-through'>₹{mrp}</p>
    </div>
    <div className='flex items-center justify-between'>
        <p className='font-bold bg-green-500 rounded'>{rating}★</p>
        <button className='bg-blue-500 text-white px-4 py-2 rounded lg:w-auto
        hover:bg-blue-700 transition xl:w-auto md:w-auto sm:w-auto'>Add to Cart</button>
    </div>

    </div>

  


  );
};

export default ProductCard
