import React from 'react'
import './style/emails.scss'

export default function EmaiSupport() {
  return (
    <div className='email-main'>
      <div className="email-content">
        <div className="details">
            <h3>Suscribe for New latest NewsLetters</h3>
        </div>
        <div className="from">
            <div className="input">
                <input type="text" placeholder='Enter Email Id' />
            </div>
            <div className="bt">
                <button>Suscribe</button>
            </div>
        </div>
      </div>
    </div>
  )
}
