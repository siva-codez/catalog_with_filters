import React, { useState } from 'react'
import productsData from "../products.json"

const Sidebar = ({priceRange,setPriceRange,selectedCategory,setSelectedCategory,
                  selectedBrands,setSelectedBrands,selectedRating,setSelectedRating}) => {
    

    
    const categoryOPtion=[...new Set(productsData.map((p) =>p.category))].sort();
    const filteredBrands=selectedCategory==="All" 
                          ?productsData
                          :productsData.filter((p) =>p.category===selectedCategory);
    const brands =[...new Set(filteredBrands.map((p) =>p.brand))].sort();

    const minPrice=Math.min(...productsData.map((p) =>p.price));
    const maxPrice=Math.max(...productsData.map((p) =>p.price));

    const handleChange =(e) =>{setSelectedRating({...selectedRating,[e.target.name]:e.target.checked});}

    const filteredProducts=productsData.filter((p) =>{
      if (selectedRating.above4 && p.rating >=4) return true;
      if (selectedRating.below4 && p.rating <4) return true;
      if (!selectedRating.above4 && !selectedRating.below4) return true;
      return false;
    });

    

  return (
    <div className='w-64 bg-blue-100 p-4 h-screen sticky top-16 overflow-y-auto shadow-inner'>
      <h2 className='text-xl font-semibold mb-6'>Filters</h2>

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
  )
}

export default Sidebar
