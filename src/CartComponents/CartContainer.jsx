import React from 'react';
import ItemInCartContainer from './ItemInCartContainer'
import CheckoutCardContainer from './CheckoutCard'
import { Grid, Segment } from 'semantic-ui-react'
// import { Divider, Grid, Segment } from 'semantic-ui-react'


const CartContainer = () => {
    return (
        <Segment className="checkout-container">
            <Grid columns={2} relaxed='very'>
                <Grid.Column>
                    <ItemInCartContainer />
                </Grid.Column>
                <Grid.Column>
                    <CheckoutCardContainer />
                </Grid.Column>
            </Grid>
            {/* <Divider></Divider> */}
        </Segment>
    );
};

export default CartContainer;