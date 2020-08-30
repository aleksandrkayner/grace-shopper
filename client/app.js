import React from 'react'
import {Navbarclass, Checkout} from './components'
import {HomeFooter} from './components/home/HomeFooter'
import Routes from './routes'
import '/Users/alexkayner/Desktop/grace-shopper/node_modules/bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div>
      <Navbarclass />
      <Routes />
      <HomeFooter />
    </div>
  )
}

export default App
