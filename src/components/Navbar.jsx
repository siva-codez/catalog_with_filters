import React from 'react'

const Navbar = ({search,setSearch}) => {
  return (
    <div className='sticky top-0'>
      <nav className='bg-blue-800 p-4 shadow-md'>
        <div className='flex justify-between max-w-7xl mx-auto  items-center'>
          <h1 className='text-white text-2xl font-normal'>EliteCart</h1>
          <input type="text" value={search} onChange={(e) =>setSearch(e.target.value)}
           placeholder="Search the products,brands,category..." 
          className='p-3 w-1/2 text-base rounded-3xl bg-white focus:outline-none' />        
        </div>
        
      </nav>
    </div>
  )
}

export default Navbar
