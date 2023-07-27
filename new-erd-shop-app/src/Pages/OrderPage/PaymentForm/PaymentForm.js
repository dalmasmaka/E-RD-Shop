import React, {useState} from 'react'
import Cards from 'react-credit-cards'
import './PaymentForm.css'
import 'react-credit-cards/es/styles-compiled.css'

const PaymentForm = () => {

  const [number,setNumber] = useState('')
  const [name,setName] = useState('')
  const [expiry,setExpiry] = useState('')
  const [cvc,setCvc] = useState('')
  const [focus,setFocus] = useState('')
  return (
    <div className='payment-form'>
        <h2 className='payment-details'>Payment Details</h2>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focus}

        />
        <form>
          <input className='input-card nr' type='tel' 
            name='number'
            placeholder='Card Number'
            value={number} 
            onChange={e => setNumber(e.target.value)} 
            onFocus={e => setFocus(e.target.name)}/>

          <input className='input-card name' type='text' 
            name='name'
            placeholder='Name'
            value={name} 
            onChange={e => setName(e.target.value)} 
            onFocus={e => setFocus(e.target.name)}/>

          <input className='input-card xpiry' type='text' 
            name='expiry'
            placeholder='MM/YY Expiry'
            value={expiry} 
            onChange={e => setExpiry(e.target.value)} 
            onFocus={e => setFocus(e.target.name)}/>

          <input className='input-card cvc' type='tel' 
            name='cvc'
            placeholder='CVC'
            value={cvc} 
            onChange={e => setCvc(e.target.value)} 
            onFocus={e => setFocus(e.target.name)}/>
        </form>
        </div>
  )
}

export default PaymentForm