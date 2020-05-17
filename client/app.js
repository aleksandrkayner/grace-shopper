import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

import {Navbarclass, Checkout} from './components'
import Routes from './routes'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

const App = () => {
  return (
    <div>
      <Navbarclass />
      <Routes />
      <Elements stripe={stripePromise}>
        {' '}
        <Checkout />
      </Elements>
    </div>
  )
}

export default App
