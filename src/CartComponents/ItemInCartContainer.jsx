import React from 'react';
import ItemInfoCard from './ItemInfoCard'
import { connect } from 'react-redux'


const ItemInCartContainer = (props) => {

    if(props.userCart){
    let cartItem = props.userCart.map(cartItem => <ItemInfoCard key={cartItem.id} item={cartItem.item} cart_joiner_id={cartItem.id} cart_joiner_quantity={cartItem.quantity}/>) 
        return (
            <div>
                {cartItem}
            </div>
        );
    }
    return null
};

const mapStateToProps = (state) => {
    return{
        userCart: state.user.cart
    }
}


export default connect(mapStateToProps)(ItemInCartContainer);