import React, { useEffect } from 'react';
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { addReview, fetchReviews, destroyReview } from '../Actions/reviewActions'


const ReviewContainer = (props) => {

    useEffect(() => { 
        fetch("http://localhost:3000//reviews")
            .then(r => r.json())
            .then(reviewsArr => {
                props.fetchReviews(reviewsArr)
            })
    }, [props])

    const createReview = (newReview) => {
        fetch('http://localhost:3000//reviews', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                comment: newReview.comment,
                rating: newReview.rating,
                item_id: parseInt(props.matchProps.params.id)
            })
        })
        .then(r => r.json())
        .then(review => {
            props.addReview(review)
        })
    }

    const deleteReview = (reviewId) => {
        fetch(`http://localhost:3000//reviews/${reviewId}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(deletedReview => {
            props.destroyReview(deletedReview.review)
        })
    }

        let reviewItem = props.reviews.filter(review => review.item_id === parseInt(props.matchProps.params.id))
        let reviews = reviewItem.map(review => <ReviewCard key={review.id} review={review} deleteReview={deleteReview} />)

        return (
            <div>
                <Container>
                    <div className="review-header">REVIEWS</div> 
                    <br></br>
                    <p className="no-reviews" hidden={reviews.length <= 0 ? false : true}>No reviews yet. Be the first one!</p>
                    {reviews}
                    <ReviewForm createReview={createReview} />
                </Container>
            </div>
        );
    }

const mapStateToProps = (state) => {
    return{
        orders: state.user.orders,
        reviews: state.reviews
    }
}

export default connect(mapStateToProps, { addReview, fetchReviews, destroyReview })(ReviewContainer);