import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../Axios'
import {
  getProductError,
  getProductPending,
  getProductSuccess
} from '../../toolkit/ProductsSlicer'
import { Calendar, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Person } from '@phosphor-icons/react'
import { Container } from '../../components/shared/Container/Container'
import AOS from 'aos'
import 'aos/dist/aos.css'
export const Packages = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.products)
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
        dispatch(getProductSuccess(response.data?.data || []))
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
    <Container className={'w-full'}>
      <div data-aos='fade-up' className='py-8 w-full min-h-[700px] h-auto'>
        <div className='w-full flex justify-center items-center gap-2 p-4'>
          <div className='flex flex-col gap-2 items-end'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
          <p className='uppercase font-bold text-xl text-[#86b817]'>Packages</p>
          <div className='flex flex-col gap-2'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
        </div>
        <p className='w-full text-center text-blue-950 font-[900] text-5xl'>
          Awesome Packages
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
          <div className='grid w-full pb-[100px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 justify-between'>
            {data.slice(0, visibleProducts).map(product => {
              const discountedPrice =
                product.sale > 0
                  ? product.price - product.price * (product.sale / 100)
                  : product.price
              return (
                <div
                  key={product._id}
                  className='bg-white w-full max-w-[300px] h-[470px] rounded-md shadow-lg overflow-hidden relative hover:bg-gray-100 transition-colors duration-300 mx-auto'
                >
                  {product.sale > 0 && (
                    <div className='absolute z-10 top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm font-bold rounded'>
                      {product.sale}% OFF
                    </div>
                  )}
                  <div className='w-full max-h-60 overflow-hidden'>
                    <img
                      src={product.photos[0] || null}
                      alt='Product'
                      className='w-full max-h-60 h-60 object-cover hover:scale-110 transition-all duration-700'
                    />
                  </div>
                  <div className='w-full'>
                    <div className='flex justify-center items-center w-full h-[40px] border-b-2'>
                      <div className='w-1/3 flex items-center gap-2 justify-center text-sm text-gray-500 border-r-2'>
                        <MapPin size={15} color='green' />
                        <p>{product.location}</p>
                      </div>
                      <div className='w-1/3 flex items-center gap-2 justify-center text-sm text-gray-500 border-r-2'>
                        <Calendar size={15} color='green' />
                        <p>{product.days} days</p>
                      </div>
                      <div className='w-1/3 flex items-center gap-2 justify-center text-sm text-gray-500'>
                        <Person size={15} color='green' />
                        <p>{product.person} Person</p>
                      </div>
                    </div>
                    <div className='p-4'>
                      <p className='text-gray-600 mt-2 text-lg font-bold'>
                        {product.sale > 0 ? (
                          <>
                            <span className='line-through text-red-500'>
                              ${product.price.toFixed(2)}
                            </span>{' '}
                            <span className='text-green-600'>
                              ${discountedPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          `$${product.price.toFixed(2)}`
                        )}
                      </p>
                      <p className='text-sm text-gray-500 mt-1'>
                        {product.description?.length > 100
                          ? product.description?.slice(0, 100) + ' ...'
                          : product.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                  <div className='flex w-full absolute bottom-5 items-center justify-center'>
                    <Link
                      className='px-3 py-2 bg-[#86b817] hover:bg-[#85b817c7] text-white rounded-full'
                      to={`/get/${product._id}`}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              )
            })}
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
    </Container>
  )
}
