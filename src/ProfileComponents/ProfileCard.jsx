import React from 'react';
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
// import { Header, Image } from 'semantic-ui-react'

const ProfileCard = (props) => {

    return (
        <Header> 
            <div className="profile-header">
                 Hello {props.user.username}!
            </div>
        </Header>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ProfileCard);