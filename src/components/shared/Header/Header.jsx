import { useState, useEffect } from 'react'
import { Container } from '../Container/Container'
import { LogOut, MapPin, Menu, ShoppingCart, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [nav, setNav] = useState(false)
  const { data } = useSelector(state => state.user)
  const isAuth = localStorage.getItem('isAuth') === 'true'
  const cartData = JSON.parse(localStorage.getItem('cart')) || []
  const [cartLength, setCartLength] = useState(cartData.length)

  useEffect(() => {
    const updateCartLength = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || []
      setCartLength(updatedCart.length)
    }

    window.addEventListener('storage', updateCartLength)

    return () => window.removeEventListener('storage', updateCartLength)
  }, [])

  function Logout () {
    Cookies.remove('is_auth')
    localStorage.setItem('isAuth', false)
    window.location.href = '/'
  }
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const getNavLinkClass = isScrolled =>
    isScrolled ? 'A2 hover:text-[#86b817]' : 'A1'
  return (
    <nav
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'top-0 bg-white h-[60px] text-black shadow-md'
          : 'top-[45px] bg-transparent text-white border-b border-gray-700 h-[75px]'
      }`}
    >
      <Container className='h-full'>
        <div className='flex items-center h-full justify-between'>
          <div className='font-bold text-[#86b817] text-3xl flex items-center gap-1 h-full'>
            <MapPin size={45} />
            <p>Tourist</p>
          </div>

          <div className='flex items-center justify-end gap-3'>
            <ul
              className={`hh h-full ${
                nav ? 'navA' : ''
              } flex w-1/2 items-center ${
                isScrolled ? 'top-[60px]' : 'top-[75px]'
              } justify-end gap-5 font-bold`}
            >
              <li>
                <NavLink className={getNavLinkClass(isScrolled)} to={`/`}>
                  Home
                </NavLink>
              </li>
              {['About', 'Services', 'Packages', 'Contact'].map(item => (
                <li key={item}>
                  <NavLink
                    className={getNavLinkClass(isScrolled)}
                    to={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
              <li>
                {!isAuth ? (
                  <Link
                    to='/login'
                    className='bg-[#86b817] py-3 px-5 text-white rounded-full'
                  >
                    Register
                  </Link>
                ) : (
                  <div className='flex gap-3 flex-wrap w-[100px] items-center justify-center'>
                    <img
                      src={data.data?.photo?.[0] || '/default-profile.png'}
                      alt='me'
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <button
                      onClick={() => Logout()}
                      className='flex items-center gap-1 bg-red-600 text-white px-4 py-2 text-sm rounded-2xl font-bold'
                    >
                      <LogOut size={14} />
                    </button>
                  </div>
                )}
              </li>
            </ul>
            <Link to={'/cart'} className='flex relative'>
              <ShoppingCart />
              <div className='flex absolute -top-2 -right-3 w-[17px] h-[17px] bg-[#86b817] text-white items-center justify-center text-[10px] rounded-full'>
                {cartData.length > 10 ? '9+' : cartData.length}
              </div>
            </Link>
            <button
              className='hn'
              onClick={() => setNav(prev => !prev)}
              aria-label='Toggle navigation'
            >
              {nav ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </Container>
    </nav>
  )
}
