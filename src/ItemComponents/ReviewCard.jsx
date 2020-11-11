import React from 'react';
import { connect } from 'react-redux'
import { Container, Rating } from 'semantic-ui-react'


const ReviewCard = (props) => {

    const handleDelete = () => {
        props.deleteReview(props.review.id)
    }

    const showDeleteButton = () => {
        if(localStorage.token && props.review.user_id === props.user.id){
            return <span className="review-delete-button" onClick={handleDelete}>DELETE</span>
        }
    }

    return (
            <Container>
                <p className="review-username">{props.review.username} - <span className="review-post-time">{props.review.created_at}</span></p>
                <br></br>
                <Rating className="rating-stars-card" icon='star' size='huge' defaultRating={props.review.rating} maxRating={5} clearable /> 
                <p className="review-comment">"{props.review.comment}" </p>
                {showDeleteButton()}
                <br></br>
                <br></br>
                <br></br>
            </Container>
    );

};

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(ReviewCard);