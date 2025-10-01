import React, { useState } from "react";
import "./App.css";
import productsData from "./products.json";
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import ProductCard from "./components/ProductCard";

const App=() =>{

  const [search,setSearch]=useState("");

  const prices=productsData.map((p) =>p.price);
  const [priceRange,setPriceRange] =useState([Math.min(...prices),
                                              Math.max(...prices),
                                              ]);

  const [selectedCategory,setSelectedCategory]=useState("All");

  const [selectedBrands,setSelectedBrands]=useState([]);

  const [selectedRating,setSelectedRating]=useState({above4:false,below4:false,});
  
  /*---------------------------------------*/
  const filterProducts=productsData.filter((product) =>{

    const {name,brand,category,price,rating}=product;

    const matchesSearch=name.toLowerCase().includes(search.toLowerCase())||
    brand.toLowerCase().includes(search.toLowerCase())||
    category.toLowerCase().includes(search.toLowerCase()) ||
    price.toString().includes(search.toLowerCase());

    const matchesCategory=selectedCategory=="All" || category===selectedCategory;

    const matchesBrand=selectedBrands.length === 0 || selectedBrands.includes(brand);
    const matchesPrice=price>= priceRange[0]&& price <=priceRange[1];
    const matchesRating =(selectedRating.above4 && rating >=4) ||
                          (selectedRating.below4 && rating <4) ||
                          (!selectedRating.above4 && !selectedRating.below4);

    return matchesSearch && matchesBrand && matchesPrice && matchesCategory &&matchesRating;
  })


  return ( 
  <>
    <div className="sticky top-0 z-50">
      <Navbar search={search} setSearch={setSearch} />
    </div>
    <div className="flex">
      <Sidebar priceRange={priceRange} setPriceRange={setPriceRange}
      selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
       selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
       selectedRating={selectedRating} setSelectedRating={setSelectedRating}/>
      <div className="flex-1 bg-blue-50">
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl text-blue-900 font-bold p-4">Products ({filterProducts.length})</h2>
            {filterProducts.length==0 ?(
              <p className=" text-center text-gray-600">No products found matching your criteria.</p>
            ):(
              <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filterProducts.map((product) =>(
                <ProductCard key={product.id} product={product}/> 
              ))}
              
          </div>
            )}
      </div> 
      </div>
    </div>
    </>
  );
};

export default App;