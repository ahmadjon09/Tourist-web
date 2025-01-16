import { useState } from 'react'
import axios from 'axios'
import { Container } from '../../components/shared/Container/Container'
import contactInfo from '../../data/contact/contact'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { Address, PhoneNumber, Mail, Links } = contactInfo

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setIsSubmitting(true)

    const TELEGRAM_BOT_TOKEN = '7895167430:AAEtIClWIzbfYTsNl0Bvt2BAvCsQ_uQXTWI'
    const TELEGRAM_CHAT_ID = '6352403183'

    const message = `
      *New Message from Contact Form*
      *Name*: ${'  '} ${formData.name}
      *Email*:${'  '} ${formData.email}
      *Subject*:${'  '} ${formData.subject}
      *Message*:${'  '} ${formData.message}
    `

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        }
      )

      if (response.data.ok) {
        alert('Message sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        alert('Error sending message.')
      }
    } catch (error) {
      alert('Error sending message.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <div className='w-full flex justify-center items-center gap-2 p-4'>
        <div className='flex flex-col gap-2 items-end'>
          <div className='w-10 h-[2px] bg-[#86b817]'></div>
          <div className='w-20 h-[2px] bg-[#86b817]'></div>
        </div>
        <p className='uppercase font-bold text-xl text-[#86b817]'>Contact Us</p>
        <div className='flex flex-col gap-2'>
          <div className='w-10 h-[2px] bg-[#86b817]'></div>
          <div className='w-20 h-[2px] bg-[#86b817]'></div>
        </div>
      </div>
      <p className='w-full text-center text-blue-950 font-[900] text-5xl'>
        Contact For Any Query
      </p>
      <div className='flex flex-col lg:flex-row justify-between w-full rounded-lg py-6'>
        <div className='w-full lg:w-1/3 lg:pr-4 mb-6 lg:mb-0'>
          <h2 className='text-xl font-semibold text-gray-800'>Get In Touch</h2>
          <p className='text-gray-600 my-4'>
            Tempor erat elitr rebum at clita...
          </p>
          <div className='mb-4'>
            <p className='font-semibold text-green-500'>Office</p>
            <p>{Address.name}</p>
          </div>
          <div className='mb-4'>
            <p className='font-semibold text-green-500'>Mobile</p>
            <a className='hover:underline' href={`tel:${PhoneNumber}`}>
              {PhoneNumber}
            </a>
          </div>
          <div className='mb-4'>
            <p className='font-semibold text-green-500'>Email</p>
            <a className='hover:underline' href={`mailto:${Mail}`}>
              {Mail}
            </a>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: Address.coordinate }}
          className='w-full lg:w-1/3 lg:px-4 mb-6 lg:mb-0'
        />

        <div className='w-full lg:w-1/3 lg:pl-4'>
          <form onSubmit={handleSubmit}>
            <div className='flex gap-3'>
              <div className='mb-4'>
                <label htmlFor='name' className='block text-gray-700'>
                  Your Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='w-full p-2 border rounded'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700'>
                  Your Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='w-full p-2 border rounded'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='subject' className='block text-gray-700'>
                Subject
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                className='w-full p-2 border rounded'
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='message' className='block text-gray-700'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                className='w-full p-2 border rounded'
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button
              type='submit'
              className={`w-full bg-green-500 text-white py-2 rounded ${
                isSubmitting ? 'opacity-50' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </Container>
  )
}
