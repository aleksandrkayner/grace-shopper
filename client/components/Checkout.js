import React from 'react'
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import CardSection from './CardSection'
import axios from 'axios'
// import OrderSummary from './OrderSummary'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import '../../public/common.css'
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      CLIENT_SECRET: '',
      response: '',
      error: '',
    }
  }

  async componentDidMount() {
    console.log('PROPS', this.props)
    const total = this.props.order.subTotal * 100
    console.log('AMOUNT', total)
    const response = await axios.post('/secret', {
      amount: total,
    })
    console.log('response from checkout,', response)
    const client_secret = await response.data.client_secret
    console.log('client Secret: ', response.data.client_secret)
    this.setState({CLIENT_SECRET: client_secret})
    // Call stripe.confirmCardPayment() with the client secret.
  }

  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    const {stripe, elements} = this.props
    //const elements = this.props
    console.log('stripe elements', stripe, elements)
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }
    //console.log(paymentIntent)
    const {CLIENT_SECRET} = this.state
    //const result = await stripe.confirmCardPayment(CLIENT_SECRET,paymentIntent)
    const result = await stripe.confirmCardPayment(CLIENT_SECRET, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Katt',
        },
      },
    })
    console.log('result', result)

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message)
      this.setState({error: result.error})
    } else if (result.paymentIntent.status === 'succeeded') {
      console.log('The payment has been processed!')
      // Show a success message to your customer
      // There's a risk of the customer closing the window before callback
      // execution. Set up a webhook or plugin to listen for the
      // payment_intent.succeeded event that handles any business critical
      // post-payment actions.
      this.setState({response: 'The payment has been processed!'})
    } else {
      console.log('Payment processing')
    }
  }

  render() {
    console.log('In checkout ', this.props)
    return (
      <div>
        <div>
          {this.state.error && <h3>{this.state.error}</h3>}
          {this.state.response && (
            <div>
              <h3>{this.state.response}</h3>{' '}
              <Link to="/products">Shop some more!</Link>
            </div>
          )}
        </div>
        {!this.state.response && (
          <form onSubmit={this.handleSubmit} className="credit">
            <CardSection />
            <button disabled={!this.props.stripe} className="credit">
              Confirm order
            </button>
            {/* disabled={!this.props.stripe} */}
          </form>
        )}
      </div>
    )
  }
}

export default function InjectedCheckoutForm(order, user) {
  return (
    <div id="stripe-checkout">
      <ElementsConsumer>
        {({stripe, elements}) => (
          <Checkout
            stripe={stripe}
            elements={elements}
            order={order}
            user={user}
          />
        )}
      </ElementsConsumer>
    </div>
  )
}

// const mapState = ({order, user, stripe, elements}) => ({
//   order,
//   user,
//   stripe,
//   elements,
// })

// export default connect(mapState)(Checkout)
