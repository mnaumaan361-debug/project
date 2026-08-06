import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

function Product() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#141414] via-[#1a1a1a] to-[#0c2025] flex flex-col items-center py-8 px-4">
      {/* Latest collection */}
      <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col '>
        <LatestCollection/>
      </div>

      {/* Best Seller */}
      
      <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col '>
        <BestSeller/>
      </div>
    </div>
  )
}

export default Product
