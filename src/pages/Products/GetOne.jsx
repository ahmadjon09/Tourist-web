import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from '../../Axios'
import { Calendar, MapPin } from 'lucide-react'
import { Person } from '@phosphor-icons/react'

export const PackageDetails = () => {
  const { id } = useParams()
  const [packageDetails, setPackageDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await Axios.get(`product/${id}`)
        setPackageDetails(response.data.product)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsError(true)
        setIsLoading(false)
      }
    }

    fetchPackageDetails()
  }, [id])

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const existingItem = cart.find(item => item.id === packageDetails._id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: packageDetails._id,
        name: packageDetails.description,
        photo: packageDetails.photos[0],
        price:
          packageDetails.sale > 0
            ? packageDetails.price -
              (packageDetails.price * packageDetails.sale) / 100
            : packageDetails.price,
        quantity: 1,
        description: packageDetails.description
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Package added to cart!')
  }

  if (isLoading) {
    return <p className='text-center'>Loading...</p>
  }

  if (isError) {
    return (
      <p className='text-center text-red-500'>Error loading package details.</p>
    )
  }

  return (
    <div className='w-full py-8 min-h-[700px]'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row gap-8'>
          <img
            src={packageDetails?.photos[0]}
            alt={packageDetails?.description}
            className='w-full md:w-1/2 h-96 object-cover rounded-md'
          />
          <div className='flex flex-col  w-full md:w-1/2'>
            <h1 className='text-3xl font-bold text-blue-950 mb-4'>
              {packageDetails?.description}
            </h1>
            <p className='text-lg flex-wrap flex gap-2 text-gray-700 mb-4'>
              <MapPin /> {packageDetails?.location} <Calendar />{' '}
              {packageDetails?.days} days for <Person size={20} />
              {packageDetails?.person} person(s)
            </p>
            <p className='text-2xl font-bold text-green-600 mb-4'>
              {packageDetails?.sale > 0 ? (
                <>
                  <span className='line-through text-red-500 mr-2'>
                    ${packageDetails?.price.toFixed(2)}
                  </span>
                  $
                  {(
                    packageDetails?.price -
                    (packageDetails?.price * packageDetails?.sale) / 100
                  ).toFixed(2)}
                </>
              ) : (
                `$${packageDetails?.price.toFixed(2)}`
              )}
            </p>
            <button
              onClick={handleAddToCart}
              className='px-6 py-2 bg-[#86b817] hover:bg-[#85b817c7] text-white rounded-lg'
            >
              Add to Cart
            </button>
            <Link
              to='/cart'
              className='mt-4 px-6 py-2 inline-block bg-blue-500 hover:bg-blue-600 text-white rounded-lg'
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
