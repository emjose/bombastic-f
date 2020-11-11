import React, { Component } from 'react'
import { Form, Button, Rating } from 'semantic-ui-react'


class ReviewForm extends Component {

    state={
        comment: "",
        rating: 0
    }

    handleChange = (event, { rating }) => {
        let {name, value} = event.target

        this.setState({
            [name]: value,
            rating
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.createReview(this.state)
        this.setState({
            comment: "",
            rating: 0
        })
    }

    render() {
        return (
            <Form hidden={localStorage.token ? false : true} onSubmit={this.handleSubmit}>
                <Form.TextArea
                    label=''
                    placeholder="REVIEW THIS ITEM!"
                    name="comment"
                    value={this.state.comment}
                    onChange={this.handleChange}
                />
                <Rating
                    name="rating"
                    onRate={this.handleChange}
                    icon="star"
                    size="huge"
                    defaultRating={0} 
                    maxRating={5} 
                    clearable
                />
                <br/>
                <Button className="create-review-button" type='submit'>SUBMIT</Button>
            </Form>
        )
    }
}

export default ReviewForm;