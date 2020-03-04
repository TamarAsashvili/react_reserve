import { Input } from 'semantic-ui-react'

function AddProductToCart() {
  return (
    <Input value={1} type='number' min='1' placeholder='Quantity'
      action={{ color: 'orange', content: 'Add To Cart', icon: 'plus cart' }} />
  )
}

export default AddProductToCart;
