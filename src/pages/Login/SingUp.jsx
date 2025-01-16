import React, { useState } from 'react'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import Axios from '../../Axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

export const SingUp = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    password: '',
    address: '',
    photo: []
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [imagePending, setImagePending] = useState(false)
  const [success, setSuccess] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = async e => {
    try {
      const formImageData = new FormData()
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        formImageData.append('photos', files[i])
      }
      setImagePending(true)
      const { data } = await Axios.post('/upload', formImageData)
      setFormData(prevData => ({
        ...prevData,
        photo: [...prevData.photo, ...data.photos]
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setImagePending(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    console.log('Sending form data:', formData)

    try {
      const { data } = await Axios.post('client/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      localStorage.setItem('isAuth', true)
      Cookies.set('is_auth', data.token, { secure: true, expires: 30 })
      setSuccess('Registration successful!')
      window.location.href = '/'
    } catch (err) {
      console.error('Error:', err.response?.data || err.message)
      setError(err.response?.data.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container bg-transparent fixed z-[9999] top-10 px-4 h-screen flex items-center justify-center'>
      <form
        className='flex flex-col gap-4 relative w-full max-w-md bg-green-700 shadow-2xl rounded-xl p-10'
        onSubmit={handleSubmit}
      >
        <Link to={'/'} className='text-white absolute top-2 right-2'>
          <X size={30} />
        </Link>
        <h1 className='text-white text-3xl font-bold text-center'>Register</h1>

        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          className='p-2 border border-white rounded-xl bg-transparent text-white'
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          className='p-2 border border-white rounded-xl bg-transparent text-white'
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <div className='relative'>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            className='p-2 border border-white rounded-xl bg-transparent text-white w-full'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div
            className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeSlash size={24} color='#fff' />
            ) : (
              <Eye size={24} color='#fff' />
            )}
          </div>
        </div>

        <input
          type='text'
          name='address'
          placeholder='Address'
          className='p-2 border border-white rounded-xl bg-transparent text-white'
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          type='number'
          name='phoneNumber'
          placeholder='Phone Number'
          className='p-2 border border-white rounded-xl bg-transparent text-white'
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <input
          type='file'
          name='photo'
          accept='image/*'
          className='p-2 border border-white rounded-xl bg-transparent text-white'
          onChange={handleFileChange}
        />

        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}

        <button
          type='submit'
          className={`bg-blue-600 py-2 text-white rounded-xl ${
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}
