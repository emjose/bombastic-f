import React from 'react';
import { Card, Image, Header, Dimmer, Loader } from 'semantic-ui-react'
// import { Card, Image, Rating, Header, Dimmer, Loader } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { searchItems } from '../Actions/itemsActions'


const ItemCard = (props) => {
    const itemTitle = () => {
        if(props.item){
            return <> {props.item.title.slice(0, 35)}{props.item.title.length > 30 ? "..." : null } </>
        }else{
            return null
        }
    }

    if(props.item){
    // if(props.item.reviews){
    //     let ratingArr = !props.item ? 0 : props.item.reviews.map(review => review.rating)
    //     let sumRatingArr = ratingArr.length === 0 ? 0 : ratingArr.reduce((total, num) => total + num)
    //     let averageRating = sumRatingArr === 0 ? 0 : sumRatingArr / ratingArr.length
    //     gets triggered once clicking on an item card. 
        const clearSearch = () => {
            props.searchItems("")
        }

        return(
            <div>
                <Link onClick={!props.item ? (event) => {event.preventDefault()} : clearSearch()} to={!props.item ? "" : `/${props.item.id}`}>
                    {
                        !props.item ? 
                            <Card className="item-card">
                                <Dimmer active inverted>
                                    <Loader inverted>Loading</Loader>
                                </Dimmer>
                            </Card>
                            :
                            <Card className="item-card">
                                <div class="ui slide masked reveal image">
                                    <img src={props.item.image} class="visible content"/>
                                    <img src={props.item.imageb} class="hidden content"/>
                                    <img src={props.item.imagec} class="hidden content"/>
                                </div>
                            {/* <Image src={props.item.image} alt="default image" wrapped ui={false}/> */}
                            <Card.Content className="item-card-content">
                            <Header>{itemTitle()}</Header>
                                {/* <Rating icon='star' defaultRating={averageRating} maxRating={5} disabled/> */}
                                {/* <h4 className="item-card-price-header">Price:</h4> */}
                                <p className="item-card-price">${props.item.price}</p>
                            </Card.Content>
                            </Card>
                    }
                </Link>
            </div>
        );
    } return null

};

export default connect(null, { searchItems })(ItemCard);