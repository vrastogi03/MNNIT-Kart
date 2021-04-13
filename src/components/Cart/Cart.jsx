import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import CartItem from './CartItem/CartItem'
import useStyles from './styles'
import {Link} from 'react-router-dom'

const Cart = ({cart, handleEmptyCart,handleRemoveFromCart,handleUpdateCartQty }) => {
    const classes = useStyles()

    const EmptyCart= () =>(
        <Typography variant="subtitle1">
            You have no items in your cart, 
            <Link to="/" className={classes.link}>add some to continue!</Link>
        </Typography>
    )

    const FilledCart = () =>(
        <>
            <Grid container spacing={3} >
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty}/>
                    </Grid>  
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} onClick={handleEmptyCart} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )

    if(!cart.line_items) return 'Loading.....'

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography variant="h3" className={classes.title} gutterBottom >Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart
