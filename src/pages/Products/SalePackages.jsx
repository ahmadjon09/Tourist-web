import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../Axios'
import {
  getProductError,
  getProductPending,
  getProductSuccess
} from '../../toolkit/ProductSaleSlicer'
import { Container } from '../../components/shared/Container/Container'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Packages } from './Packages'
export const PackagesSale = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.productsSale)
  const [visibleProducts, setVisibleProducts] = useState(3)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })
    const getAllProducts = async () => {
      dispatch(getProductPending())
      try {
        const response = await Axios.get('product')
        const filteredData = response.data?.data.filter(
          product => product.sale > 0
        )
        dispatch(getProductSuccess(filteredData || []))
      } catch (error) {
        dispatch(
          getProductError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllProducts()
  }, [dispatch])

  const handleSeeAll = () => {
    setVisibleProducts(visibleProducts === 3 ? data.length : 3)
  }

  return (
    <Container>
      <div data-aos='fade-up' className='py-8 min-h-[700px]] h-auto'>
        <div className='w-full flex justify-center items-center gap-2 p-4'>
          <div className='flex flex-col gap-2 items-end'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
          <p className='uppercase font-bold text-xl text-[#86b817]'>
            Destination
          </p>
          <div className='flex flex-col gap-2 '>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
        </div>
        <p className='w-full text-center text-blue-950 font-[900] text-5xl'>
          Popular Destination
        </p>
        <br />
        <br />

        {isPending ? (
          <div className='flex w-full h-full justify-center items-center mt-10'>
            <div className='loader'></div>
          </div>
        ) : isError ? (
          <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
        ) : data.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {data.slice(0, visibleProducts).map(product => (
              <div
                key={product._id}
                className='relative overflow-hidden rounded-lg transition-all duration-500 shadow-md group'
              >
                <img
                  src={product.photos[0] || ''}
                  alt={product.location}
                  className='w-full h-64 hover:scale-110 transition-all duration-500 object-cover'
                />

                {product.sale > 0 && (
                  <div className='absolute top-2 left-2 bg-white text-red-500 font-bold text-sm px-2 py-1 rounded'>
                    {product.sale}% OFF
                  </div>
                )}

                <div className='absolute bottom-2 right-2 bg-white text-[#86b817] font-bold text-sm px-2 py-1 rounded'>
                  {product.location}
                </div>

                {/* <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                  <p className='text-white font-bold text-lg'>
                    {product.description || 'Explore now!'}
                  </p>
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-600 text-center text-lg mt-4'>
            No packages found.
          </p>
        )}

        <div className='flex justify-center mt-6'>
          <button
            onClick={handleSeeAll}
            className='px-6 py-2 bg-[#86b817] hover:bg-[#85b817c5] text-white rounded-lg'
          >
            {visibleProducts === 3 ? 'See All' : 'Show Less'}
          </button>
        </div>
      </div>
      <Packages />
    </Container>
  )
}
