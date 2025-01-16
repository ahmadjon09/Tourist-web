import React, { useState } from 'react'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import Axios from '../../Axios'
import { MapPin, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Login = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { isAuth } = useSelector(state => state.user)
  if (isAuth) {
    window.location.href = '/'
  }

  const handleLogin = async e => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data } = await Axios.post('client/login', {
        password,
        phoneNumber: +phone
      })
      localStorage.setItem('isAuth', true)
      Cookies.set('is_auth', data.token, { secure: true, expires: 30 })
      window.location.href = '/'
    } catch (err) {
      setError(err.response?.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='container z-[9999] bg-transparent px-4  h-screen fixed top-0 left-auto flex items-center justify-center'>
        <form
          className='flex flex-col gap-3 w-full h-[430px] md:w-[400px] bg-green-700 shadow-2xl rounded-xl p-10 relative'
          onSubmit={handleLogin}
        >
          <Link to={'/'} className='text-white absolute top-2 right-2'>
            <X size={30} />
          </Link>
          <div className='flex justify-center items-center gap-3'>
            <MapPin color='white' size={70} />
            <p className='text-6xl font-bold text-white'>Tourist</p>
          </div>
          <br />
          <div className='flex justify-between border border-white rounded-xl overflow-hidden'>
            <button
              type='button'
              className='w-1/6 text-[12px] md:text-lg bg-transparent text-white border-r border-white'
            >
              +998
            </button>
            <input
              type='number'
              className='p-2 outline-none w-5/6 bg-transparent text-white'
              placeholder='Телефонный номер'
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className='relative'>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              className='border border-white p-2 w-full rounded-xl bg-transparent text-white'
              placeholder='Введите пароль'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div
              className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeSlash size={24} color='#fff' />
              ) : (
                <Eye size={24} color='#fff' />
              )}
            </div>
          </div>
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
          <button
            type='submit'
            className={`bg-green-600 py-2 text-white rounded-xl ${
              isLoading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          <Link
            to={'/singup'}
            className={`bg-blue-600 py-2 flex items-center justify-center text-white rounded-xl `}
          >
            Sing Up
          </Link>
        </form>
      </div>
    </>
  )
}
