import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
//ASSIGNED TO: Aleks

class Product extends Component {
  constructor() {
    super()
  }
  render() {
    const {product} = this.props
    console.log('<>><><<><><><><>><><><><><><><><', product)
    if (product) {
      return (
        <Card className="text-center" style={{width: '18rem', margin: '10px'}}>
          <Card.Img variant="top" src={product.img} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            {/* <Button
                    variant="success"
                    onClick={() => {
                      console.log('hello', prod.id)
                      this.props.loadProduct(prod.id, this.props.history.push)
                    }}
                  >
                    Select Product
                  </Button> */}
          </Card.Body>
        </Card>
      )
    }
  }
}

{
  /* <div className="singleProduct">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div>price:${product.price}</div>
          <div>avalible amount:{product.quantity}</div>
          <img src={product.img}></img>
          <div>category:{product.category ? product.category.name : ''}</div>
        </div> */
}

const mapState = ({product}) => {
  return {
    product,
  }
}
// const mapDispatch = (dispatch) => {
//   return {
//     load: () => {
//       dispatch(getProducts())
//     },
//     loadProduct: (id) => {
//       dispatch(getProduct(id))
//     },
//   }
// }

// export default connect(mapState, mapDispatch)(Products)
export default connect(mapState)(Product)