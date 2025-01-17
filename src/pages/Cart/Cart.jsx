import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  const handleRemoveItem = id => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, quantity) }
      }
      return item
    })
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleBuy = async () => {
    const TELEGRAM_BOT_TOKEN = '7895167430:AAEtIClWIzbfYTsNl0Bvt2BAvCsQ_uQXTWI'
    const TELEGRAM_CHAT_ID = '6352403183'
    const message = cartItems
      .map(
        item =>
          `*Paket ID*: ${item.id}\n*Nom*: ${item.name}\n*Sotuvchi*: ${
            item.seller
          }\n*Narxi*: $${item.price.toFixed(2)}\n*Miqdor*: ${item.quantity}`
      )
      .join('\n\n')

    const totalAmount = cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)

    const finalMessage = `*Yangi Buyurtma:*\n\n${message}\n\n*Umumiy narx*: $${totalAmount}`

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: finalMessage,
          parse_mode: 'Markdown'
        }
      )

      if (response.data.ok) {
        alert('Buyurtma muvaffaqiyatli yuborildi!')
        localStorage.removeItem('cart')
        setCartItems([])
      } else {
        alert('Buyurtmani yuborishda xatolik yuz berdi.')
      }
    } catch (error) {
      console.error('Xatolik:', error)
      alert('Xatolik yuz berdi, iltimos keyinroq urinib ko‘ring.')
    }
  }

  return (
    <div className='w-full py-8 min-h-[700px]'>
      <h1 className='text-center text-3xl font-bold text-blue-950 mb-6'>
        Shopping Cart
      </h1>
      {cartItems.length > 0 ? (
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {cartItems.map(item => (
              <div
                key={item.id}
                className='bg-white shadow-lg rounded-md p-4 flex flex-col justify-between h-full'
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  className='w-full h-40 object-cover rounded-md mb-4'
                />
                <h2 className='text-lg font-bold mb-2'>{item.name}</h2>
                <p className='text-gray-500 text-sm mb-4'>{item.description}</p>
                <div className='flex justify-between items-center mb-4'>
                  <p className='text-green-600 font-bold text-lg'>
                    ${item.price.toFixed(2)}
                  </p>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className='px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded'
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className='px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded'
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className='w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md'
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className='text-right mt-6'>
            <p className='text-lg font-bold text-gray-800'>
              Total: $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
            <br />
            {isAuth ? (
              <button
                onClick={handleBuy}
                className='bg-[#86b817] text-white px-4 py-2 rounded-md hover:bg-[#75a315] transition'
              >
                Buy
              </button>
            ) : (
              <Link
                to={'/login'}
                className='bg-[#86b817] text-white px-4 py-2 rounded-md hover:bg-[#75a315] transition'
              >
                SignUp
              </Link>
            )}
          </div>
        </div>
      ) : (
        <p className='text-center text-lg text-gray-600'>Your cart is empty.</p>
      )}
    </div>
  )
}
