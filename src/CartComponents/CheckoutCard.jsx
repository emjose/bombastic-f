import React from 'react';
import { connect } from 'react-redux'
import { createOrder, totalPrice } from '../Actions/userActions'
import { Segment, Button } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout';


const CheckoutCard = (props) => {

    const cartTotalPrice = () => {
        if(props.userCart && props.userCart.length > 0){
            let price = props.userCart.map(cartItem => cartItem.item.price)
            let totalPrice = price.reduce((total, num) => total + num)
            return totalPrice
        }
    }
    console.log(props.userCart)

    let total = cartTotalPrice();
    let totalWithShipping = total + (total >= 20 ? 3 : 0);

    const cartTotalItem = () => {
        if(props.userCart){
            return props.userCart.length
        }
    }

    const checkOutMessage = () => {
        alert("Please only enter the credit card number of 4242 4242 4242 4242 for demonstration purposes.")
    }

    const onToken = (token) => {
        const charge = {
            token: token.id
        };

        fetch('http://localhost:3000/charges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                charge: charge,
                price: totalWithShipping * 100
            })
        })
        .then(res => res.json())

    
        fetch('http://localhost:3000/order_joiners', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(r => r.json())
        .then(newOrder => {
            props.createOrder(newOrder)
        })
    }

    if(props.userCart){
        return (
            <Segment>
                <div className="checkout-info">
                    <div className="item-total-price">
                        <p className="items-total-title">Item(s) total:</p>
                        <p className="items-cart-total">${total ? total : total = 0}</p>
                    </div>
                    <div className="item-total-price">
                        <p className="items-shipping-title">Shipping: </p>
                        <p className="items-cart-shipping">{total >= 20 ? "$3" : "$0"}</p>
                    </div>
                    <hr/>
                    <div className="item-total-price">
                        <p className="total-price-title">Total: {cartTotalItem()} items</p>
                        <p className="cart-total-price">${totalWithShipping ? totalWithShipping : totalWithShipping = 0}</p>
                    </div>
                    <StripeCheckout 
                        disabled={props.userCart.length === 0 ? true : false}
                        token={onToken}
                        stripeKey={process.env.REACT_APP_STRIPE_API_KEY}
                        billingAddress
                        shippingAddress
                    >
                    <Button onClick={checkOutMessage} className="checkout-btn">CHECKOUT</Button>
                    </StripeCheckout>
                </div>
            </Segment>
        );
    } return null
};


const mapStateToProps = (state) => {
    return{
        user: state.user,
        userCart: state.user.cart
    }
}


export default connect(mapStateToProps, { createOrder, totalPrice })(CheckoutCard);