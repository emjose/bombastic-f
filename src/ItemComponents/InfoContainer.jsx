import React from 'react';
import { Image, Container, Button } from 'semantic-ui-react'
// import { Image, Container, Button, Rating } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addToCart } from '../Actions/userActions'
import { decreaseItemQuantity } from '../Actions/itemsActions'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const InfoContainer = (props) => {
    const item_id = parseInt(props.matchProps.params.id)
    let item = props.items ? props.items.find(item => item.id === item_id) : null
    const fetchToCart = () => {
        fetch('http://localhost:3000//cart_joiners', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                item_id
            })
        })
        .then(r => r.json())
        .then(cartItem => {
            props.addToCart(cartItem)
            props.decreaseItemQuantity(cartItem.item)
        })
    }

    if(item){
        // const averageRating = () => {
        //     if(item.reviews === undefined){
        //         return 0
        //     }else{
        //         let ratingArr = item.reviews.map(review => review.rating)
        //         let sumRatingArr = ratingArr.length === 0 ? 0 : ratingArr.reduce((total, num) => total + num)
        //         let average = sumRatingArr === 0 ? 0 : sumRatingArr / ratingArr.length
        //         return average
        //     }
        // }

        // const ratingArray = () => {
        //     if(item.reviews === undefined){
        //         return 0
        //     }else{
        //         let ratingArr = item.reviews.map(review => review.rating)
        //         return ratingArr.length
        //     }
        // }
        
        return (
            <div className="item-info-card">
                <Container>
                    <div className="item-image-description-block">
                        <Zoom className="zoom-image">
                            <Image className="item-image" src={item.image} alt="default image"/>
                        </Zoom>
                        <div className="item-info">
                            <h1 className="item-title-header">{item.title}</h1>
                            <div className="average-rating-on-item">
                                {/* <Rating icon='star' defaultRating={averageRating()} maxRating={5} disabled/> ({ratingArray()}) */}
                            </div>
                            <p className="item-description">{item.description.length > 1000 ? item.description.slice(0, 916) : item.description}</p>
                            <p className="item-price">Price: ${item.price}</p>
                            <p className="pairs-donated">PAIRS DONATED: {item.quantity}</p>
                            <br/>
                            {item.quantity < 1 ? <Button disabled className="add-to-cart-btn">Sold out</Button> : <Button className="add-to-cart-btn" disabled={localStorage.token ? false : true} onClick={fetchToCart}>ADD TO CART</Button>}
                        </div>
                    </div>
                </Container>
            </div>
            )
        }return null
}

const mapStateToProps = (state) => {
    return{
        items: state.items.allItems,
        userCart: state.user.cart
    }
}

export default connect(mapStateToProps, { addToCart, decreaseItemQuantity })(InfoContainer);