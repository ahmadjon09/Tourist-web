import React, { useEffect, useState } from 'react'
import { MailIcon, MapPin, Phone } from 'lucide-react'
import contactInfo from '../../../data/contact/contact'
import { Container } from '../Container/Container'

export const NV = () => {
  const { Address, PhoneNumber, Mail, Links } = contactInfo
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <header
      className={`bg-gray-950 w-full z-[9999] ${
        isScrolled ? 'hidden' : 'fixed'
      } h-[45px] nav top-0 left-`}
    >
      <Container className={'h-full'}>
        <div className='h-full w-full flex items-center justify-between text-white'>
          <div className='flex w-4/5 items-center gap-6'>
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
          </div>
          <div className='flex items-center gap-3'>
            {Object.entries(Links).map(([key, { link, logo }]) => (
              <a
                key={key}
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:scale-105 transition-transform'
              >
                <img src={logo} alt={key} className='w-5 h-5' />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </header>
  )
}

const ContactItem = ({ icon, text, link }) => {
  return (
    <div className='flex items-center w-auto gap-1'>
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
