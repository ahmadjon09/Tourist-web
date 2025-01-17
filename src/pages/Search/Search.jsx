import React, { useEffect, useState } from 'react'
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

export const SearchPage = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.products)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPackages, setFilteredPackages] = useState([])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })

    const fetchPackages = async () => {
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

    fetchPackages()
  }, [dispatch])

  useEffect(() => {
    if (searchQuery) {
      setFilteredPackages(
        data.filter(pkg =>
          pkg.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredPackages(data)
    }
  }, [searchQuery, data])

  return (
    <Container>
      <div className='py-8 w-full min-h-screen'>
        <div className='flex justify-center items-center py-8'>
          <input
            type='text'
            placeholder='Search packages...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#86b817]'
          />
        </div>
        {isPending ? (
          <div className='flex justify-center items-center mt-10'>
            <div className='loader'></div>
          </div>
        ) : isError ? (
          <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
        ) : filteredPackages.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {filteredPackages.map(product => {
              const discountedPrice =
                product.sale > 0
                  ? product.price - product.price * (product.sale / 100)
                  : product.price
              return (
                <div
                  key={product._id}
                  className='bg-white max-w-[300px] h-[470px] rounded-md shadow-lg overflow-hidden relative hover:bg-gray-100 transition-colors duration-300 mx-auto'
                >
                  {product.sale > 0 && (
                    <div className='absolute z-10 top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm font-bold rounded'>
                      {product.sale}% OFF
                    </div>
                  )}
                  <div className='w-full max-h-60 overflow-hidden'>
                    <img
                      src={
                        product.photos[0] || 'https://via.placeholder.com/150'
                      }
                      alt={product.name}
                      className='w-full h-60 object-cover hover:scale-110 transition-all duration-700'
                    />
                  </div>
                  <div className='p-4'>
                    <p className='text-lg font-bold text-gray-600'>
                      {product.name}
                    </p>
                    <div className='flex justify-between items-center mt-2'>
                      <div className='flex items-center gap-2 text-sm text-gray-500'>
                        <MapPin size={15} color='green' />
                        <p>{product.location}</p>
                      </div>
                      <div className='flex items-center gap-2 text-sm text-gray-500'>
                        <Calendar size={15} color='green' />
                        <p>{product.days} days</p>
                      </div>
                    </div>
                    <p className='mt-2 text-gray-500 text-sm'>
                      {product.description?.length > 100
                        ? product.description.slice(0, 100) + ' ...'
                        : product.description || 'No description available'}
                    </p>
                    <p className='text-lg font-bold mt-2 text-green-600'>
                      {product.sale > 0 ? (
                        <>
                          <span className='line-through text-red-500'>
                            ${product.price.toFixed(2)}
                          </span>{' '}
                          ${discountedPrice.toFixed(2)}
                        </>
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </p>
                  </div>
                  <div className='absolute bottom-5 w-full flex justify-center'>
                    <Link
                      to={`/get/${product._id}`}
                      className='px-4 py-2 bg-[#86b817] hover:bg-[#85b817c7] text-white rounded-full'
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
      </div>
    </Container>
  )
}
