import React, { useState } from 'react'
import productsData from "../products.json"
import {Menu,X} from "lucide-react";

const Sidebar = ({priceRange,setPriceRange,selectedCategory,setSelectedCategory,
                  selectedBrands,setSelectedBrands,selectedRating,setSelectedRating}) => {
    

    const [isOpen,setIsOpen]=useState(false);
    const categoryOPtion=[...new Set(productsData.map((p) =>p.category))].sort();
    const filteredBrands=selectedCategory==="All" 
                          ?productsData
                          :productsData.filter((p) =>p.category===selectedCategory);
    const brands =[...new Set(filteredBrands.map((p) =>p.brand))].sort();

    const minPrice=Math.min(...productsData.map((p) =>p.price));
    const maxPrice=Math.max(...productsData.map((p) =>p.price));

    const handleChange =(e) =>{setSelectedRating({...selectedRating,[e.target.name]:e.target.checked});


    };

    

  return (

    <div className='relative'>
      <button
      onClick={()=> setIsOpen(!isOpen)} className='md:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 w-auto rounded-lg m-3 shadow-md '>
        {isOpen? <X size={22}/> : <Menu size={22}/>} Filters
      </button>

      {/*Sidebar container*/}
      <div className={`fixed md:static top-0 left-0 z-50 h-full md:h-auto w-64 bg-blue-100 border-r border-gray-300 p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" :"-translate-x-full"} md:translate-x-0`}>

        <div className='flex justify-between items-center mb-4 md:hidden'>
          <h2 className='text-xl font-semibold'>Filters</h2>
          <button onClick={()=> setIsOpen(false)}>
            <X size={24}/>
            </button>
        </div>

          {/*Catagory*/}
      <div className='mb-6'>
          <h3 className='font-medium mb-3'>Category</h3>
          <select className='w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 p-2' value={selectedCategory} onChange={(e) =>setSelectedCategory(e.target.value)}>
            <option value="All">All</option>
            {categoryOPtion.map((category) =>(
              <option key={category} value={category}>{category.charAt(0).toUpperCase()+category.slice(1)}</option>
            ))}
          </select>
      </div>


             {/*Brand Filter*/}
      <div className='mb-6'>
        <h3 className=' font-medium'>Brands</h3>
        {brands.map((brand) =>(
            <label className='flex items-center mb-2 cursor-pointer' >
              <input type="checkbox" className='mr-2 accent-blue-500'
              value={selectedBrands.includes(brand)}
              onChange={() =>setSelectedBrands(selectedBrands.includes(brand)?selectedBrands.filter((b) =>b!==brand):[...selectedBrands,brand])}
              key={brands}/>{brand.charAt(0).toUpperCase()+brand.slice(1)}
            </label>
        ))}
        
      </div>

        {/*price Range*/}
      <div className='mb-4'>
        <h3 className='font-medium mb-3'>Price Range</h3>
        <input type='range'
          min={minPrice} max={maxPrice} value={priceRange[1]} 
          onChange={(e)=>setPriceRange([minPrice,parseInt(e.target.value)])} className='w-full'/>
        <div className=' flex justify-between text-sm mt-2'>
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

         {/*Rating */}
      <div className="mb-4">
        <h3 className='font-medium mb-3'>Customer Ratings</h3>
        <label className='flex items-center mb-2 cursor-pointer ss'>
          <input type='checkbox' name='above4' checked={selectedRating.above4} 
          onChange={handleChange} className='mr-2 accent-blue-500'/>4★ & above 
        </label>
         <label className='flex items-center mb-2 cursor-pointer ss'> 
          <input type='checkbox' name='below4' checked={selectedRating.below4}
          onChange={handleChange} className='mr-2 accent-blue-500'/>4★ & below
        </label>

      </div>
      
    </div>

    {isOpen && (
      <div onClick={()=> setIsOpen(false)}
      className='fixed inset-0   bg-opacity-40 backdrop-blur-sm z-40 md:hidden'>

      </div>
    )}
  </div>
     
  );

};

export default Sidebar;
