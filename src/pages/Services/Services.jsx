import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../Axios'
import {
  getServiceError,
  getServicePending,
  getServiceSuccess
} from '../../toolkit/ServicesSlicer'
import { Container } from '../../components/shared/Container/Container'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { PostsSlider } from '../Posts/Posts'

export const Services = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.service)
  const [icons, setIcons] = useState({})
  const [visibleProducts, setVisibleProducts] = useState(8)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })
    const getAllServices = async () => {
      dispatch(getServicePending())
      try {
        const response = await Axios.get('service')
        dispatch(getServiceSuccess(response.data.data || []))
      } catch (error) {
        dispatch(
          getServiceError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllServices()
  }, [dispatch])

  const getIconByName = async iconName => {
    try {
      const module = await import('lucide-react')
      const Icon = module[iconName]
      if (Icon) {
        setIcons(prev => ({ ...prev, [iconName]: Icon }))
      } else {
        console.warn(`Icon "${iconName}" not found in lucide-react`)
      }
    } catch (error) {
      console.error(`Error loading icon: ${error.message}`)
    }
  }

  const handleSeeAll = () => {
    setVisibleProducts(visibleProducts === 8 ? data.length : 8)
  }
  return (
    <Container>
      <div
        data-aos='fade-up'
        className='flex flex-col mt-[200px] items-center gap-3'
      >
        <div className='flex items-center justify-center w-full gap-3'>
          <div className='flex flex-col gap-2 items-end'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
          <p className='uppercase font-bold text-xl text-[#86b817]'>services</p>
          <div className='flex flex-col gap-2 '>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
        </div>
        <h1 className='text-4xl lg:text-5xl font-bold text-blue-950'>
          Our Services
        </h1>
        <div className='flex w-full h-auto flex-wrap justify-center gap-6'>
          {isPending ? (
            <div className='flex justify-center items-center w-full h-[500px]'>
              <div className='loader'></div>
            </div>
          ) : isError ? (
            <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
          ) : data.length > 0 ? (
            <div className='flex w-full flex-wrap gap-6'>
              {data.slice(0, visibleProducts).map(Service => {
                const IconComponent = icons[Service.logo]
                if (!IconComponent && Service.logo) {
                  getIconByName(Service.logo)
                }
                return (
                  <div
                    key={Service._id}
                    className='bg-white w-[290px] shB  rounded-md shadow-md overflow-hidden relative transition-all duration-300 hover:bg-[#86b817] hover:text-white'
                  >
                    <div className='w-full p-4 flex flex-col  justify-start gap-3 items-start'>
                      {IconComponent ? (
                        <IconComponent
                          size={48}
                          className='text-[#86b817] sh'
                        />
                      ) : (
                        <p className='text-gray-500 sh'>Icon not found</p>
                      )}
                      <p className='text-xl font-bold text-gray-700 sh'>
                        {Service.name}
                      </p>
                    </div>
                    <div className='w-full p-4'>
                      <h2 className='text-sm font-semibold text-gray-500 sh'>
                        {Service.designation}
                      </h2>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className='text-gray-600 text-center w-full text-lg mt-4'>
              No Services found.
            </p>
          )}
        </div>
        <div className='flex justify-center mt-6'>
          <button
            onClick={handleSeeAll}
            className='px-6 py-2 bg-[#86b817] hover:bg-[#85b817c5] text-white rounded-lg'
          >
            {visibleProducts === 8 ? 'See All' : 'Show Less'}
          </button>
        </div>
      </div>
      <br />
      <PostsSlider />
    </Container>
  )
}
