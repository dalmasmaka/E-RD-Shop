import React from 'react'
import {AiOutlinePhone, AiOutlineMail, AiFillInstagram} from 'react-icons/ai';
import './FooterCSS.css';
import {BsFacebook, BsMessenger} from 'react-icons/bs';
import {HiLocationMarker} from 'react-icons/hi'

const Footer = () => {
  return (
    <div className='footer'>
        <p>Kontakto</p><br /><br />
      <div className='footer-info'>
        <p className='phone'><AiOutlinePhone className='phone'/> 049438983</p>
        <p className='location'><HiLocationMarker />Rr. Mbreteresha Teuta</p>
        <p className='email'><AiOutlineMail className='phone'/> info@erd.com</p>
      </div>
        <p className='icons'><BsFacebook /><BsMessenger /><AiFillInstagram /></p>
    </div>
  )
}

export default Footer