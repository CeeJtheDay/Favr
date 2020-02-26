import React, { useState } from 'react'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import CartItems from '../components/CartItems'
import Checkout from '../components/Checkout'

const Cart = ({currUser, setCurrUser}) => {
  const classes = {
    root: {
      flexGrow: 1,
      margin: 30,
    }
  };

  const [state, setState] = useState({
    checkout: false,
  })


  return (
    <div style={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={6} sm={6}>
          <CartItems state= {state} setCheckout={setState} currUser={currUser} setCurrUser={setCurrUser} />
        </Grid>
        {state.checkout && (
          <Grid item xs={6} sm={6}>
            <Checkout currUser={currUser} setCurrUser={setCurrUser} />
          </Grid>
        )}
      </Grid>
    </div>
  )

}



export default Cart
