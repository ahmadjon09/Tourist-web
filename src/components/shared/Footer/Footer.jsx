import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Link, NavLink } from 'react-router-dom'
import { Container } from '../Container/Container'
import Axios from '../../../Axios'
import { useDispatch, useSelector } from 'react-redux'
import contactInfo from '../../../data/contact/contact'
import {
  getGalleryError,
  getGalleryPending,
  getGallerySuccess
} from '../../../toolkit/GallerySlicer'
import { getPostsSuccess } from '../../../toolkit/PostsSlicer'
import { MailIcon, MapPin, Phone, Send } from 'lucide-react'
export const Footer = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const { data, isPending, isError } = useSelector(state => state.gallery)
  const dispatch = useDispatch()
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })
    const getAllGallery = async () => {
      dispatch(getGalleryPending())
      try {
        const response = await Axios.get('gallery')
        dispatch(getGallerySuccess(response.data?.data))
      } catch (error) {
        dispatch(
          getGalleryError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllGallery()
  }, [dispatch])
  const { Address, PhoneNumber, Mail, Links } = contactInfo
  const [smsContent, setSmsContent] = useState('')
  const userData = useSelector(state => state.user.data)
  const phoneNumber = userData.data?.phoneNumber
  useEffect(() => {
    if (userData?.data?.phoneNumber) {
      phoneNumber: userData.data.phoneNumber
    }
  }, [userData])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await Axios.post('/post/create', {
        smsContent,
        phoneNumber
      })
      const data = response.data?.data
      setSmsContent('')
      alert('Comment successfully sent!')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to send the comment.')
    }
  }
  return (
    <div
      data-aos='fade-up'
      className='w-full mt-10 bg-gray-900 text-white py-10'
    >
      <Container>
        <div className='mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
          <div>
            <h4 className='text-xl font-bold mb-4'>Footer</h4>
            <ul className='space-y-2'>
              <li>
                <NavLink className={`hover:text-[#86b817]`} to={'/'}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={`hover:text-[#86b817]`} to={'/about'}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink className={`hover:text-[#86b817]`} to={'/services'}>
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink className={`hover:text-[#86b817]`} to={'/packages'}>
                  Packages
                </NavLink>
              </li>
              <li>
                <NavLink className={`hover:text-[#86b817]`} to={'/contact'}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-xl font-bold mb-5'>Contact</h4>
            <ul className='space-y-4'>
              <ContactItem
                icon={<MapPin size={15} />}
                text={Address.name}
                link={Address.coordinate}
              />
              <ContactItem
                icon={<Phone size={15} />}
                text={PhoneNumber}
                link={`tel:${PhoneNumber}`}
              />
              <ContactItem
                icon={<MailIcon size={15} />}
                text={Mail}
                link={`mailto:${Mail}`}
              />
            </ul>
            <div className='flex space-x-4 mt-4'>
              {Object.entries(Links).map(([key, { link, logo }]) => (
                <a
                  key={key}
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-105 transition-transform'
                >
                  <img src={logo} alt={key} className='min-w-5 w-auto h-5' />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className='text-xl font-bold mb-4'>Gallery</h4>
            <div className='grid grid-cols-3 gap-2'>
              {isPending ? (
                <div className='flex justify-center items-center mt-10'>
                  <p className='text-xl text-gray-600'>Loading...</p>
                </div>
              ) : isError ? (
                <p className='text-red-500 text-center text-xl'>
                  Error: {isError}
                </p>
              ) : data.length > 0 ? (
                data
                  ?.slice(0, 6)
                  .map(photo => (
                    <img
                      key={photo._id}
                      src={photo.photos[0]}
                      alt='Gallery'
                      className='w-full border-[3px] h-[50px] object-cover transition duration-500 ease-in-out transform hover:scale-110'
                    />
                  ))
              ) : (
                <p className='text-gray-600 text-center text-lg mt-4'>
                  No photos found.
                </p>
              )}
            </div>
            <Link to={'/gallery'} className='hover:underline'>
              See More
            </Link>
          </div>

          <div>
            <h4 className='text-xl font-bold mb-4'>Add your Comment</h4>
            <p className='mb-4 text-gray-300'>
              Dolor amet sit justo amet elitr clita ipsum elitr est.
            </p>
            <form onSubmit={handleSubmit} className='flex z-[99]'>
              <input
                type='text'
                value={smsContent}
                onChange={e => setSmsContent(e.target.value)}
                placeholder='Your Comment'
                className='px-4 py-2 rounded-l-md text-gray-900 w-full'
              />
              {isAuth ? (
                <button
                  type='submit'
                  className='bg-[#86b817] text-white flex items-center justify-center w-[50px] h-[50px] rounded-r-md hover:bg-[#75a315] transition'
                >
                  <Send size={20} />
                </button>
              ) : (
                <Link
                  to={'/singup'}
                  className='bg-[#86b817] text-white px-4 py-2 rounded-r-md hover:bg-[#75a315] transition'
                >
                  SignUp
                </Link>
              )}
            </form>
          </div>
        </div>
        <div className='border-t border-gray-700 mt-10 text-center text-gray-400'>
          <p>
            © Tourist, All Rights Reserved. Coding By{' '}
            <a className='hover:underline' href='https://t.me/ItsNoWonder'>
              Ahmadjon
            </a>
          </p>
        </div>
      </Container>
    </div>
  )
}

const ContactItem = ({ icon, text, link }) => {
  return (
    <div className='flex items-center w-auto gap-2'>
      {icon}
      {link ? (
        <a className='hover:underline' href={link}>
          {text}
        </a>
      ) : (
        <p>{text}</p>
      )}
    </div>
  )
}
