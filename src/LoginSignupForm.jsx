import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setUser } from './Actions/userActions'
import { loginError } from './Actions/loginErrorsActions'


class LoginSignupForm extends Component {

    state={
        username: "",
        password: "",
        display: true
    }

    handleChange = (event) => {
        let {name, value} = event.target
        this.setState({

            [name]: value
        })
    }

    renderFormFields = () => {
        const showSignUp = () => {
            this.setState(prevState => {
                return{
                    display: !prevState.display
                }
            })
            this.props.loginError("")
        }

    return ( 
        <>
        {this.state.display ?
        <>
        <Modal.Header className="login-signup-header">Sign in</Modal.Header>
        <Modal.Description>
            <Form.Field className="login-form">
                <label className="login-labels">Username</label>
                <Form.Input 
                    icon='user'
                    iconPosition='left'
                    className="login-signup-input-field"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={this.state.username} 
                    onChange={this.handleChange} 
                />
            </Form.Field>
            <Form.Field className="login-form">
                <label className="login-labels">Password</label>
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    className="login-signup-input-field"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password} 
                    onChange={this.handleChange} 
                />
            </Form.Field>
            <p className="invalid-logins">{this.props.error.errors}</p>
        </Modal.Description>
        <Form.Field className="login-signup-submit-btn" color="blue" control={Button}>Sign in</Form.Field>
        <div className="check-if-have-account">
            <p className="have-account-title">Don't have an account? </p>
            <p className="signup-login-route-button" onClick={showSignUp}>Please sign up.</p>
        </div>
        </> : 
        <>
        <Modal.Header className="login-signup-header">Signup</Modal.Header>
        <Modal.Description>  
            <Form.Field className="login-signup-form">
                <label className="signup-labels">Username</label>
                <Form.Input 
                    icon='user'
                    iconPosition='left'
                    className="login-signup-input-field"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={this.state.username} 
                    onChange={this.handleChange} 
                />
            </Form.Field>
            <Form.Field className="login-signup-form">
                <label className="signup-labels">Password</label>
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    className="login-signup-input-field"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password} 
                    onChange={this.handleChange} 
                />
            </Form.Field>

            <p className="invalid-logins">{this.props.error.errors}</p> 
        </Modal.Description>
        <Form.Field className="login-signup-submit-btn" color="blue" control={Button}>Sign up</Form.Field>
                
        <div className="check-if-have-account">
            <p className="have-account-title">Already have an account?</p> 
            <p className="signup-login-route-button" onClick={showSignUp}>Please login</p>
        </div>
        </>
        }
        </>
        )
    }
    

    handleSubmit = (event) => {
        event.preventDefault()
        let { username, password } = this.state
            fetch(`http://localhost:3000//${this.state.display ? "login" : "users"}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    this.state.display ? {username: username, password: password} : { username: username,
                    password: password,
                })
            })
            .then(r => r.json())
            .then(userData => {
                if(userData.user){
                    localStorage.setItem("token", userData.token)
                    this.props.setUser(userData.user)
                    this.props.history.push("/profile")
                }
                else{
                    this.props.loginError(userData)
                }
            })
        }
        
        render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                {this.renderFormFields()}
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        error: state.errors
    }
}


export default connect(mapStateToProps, { setUser, loginError })(LoginSignupForm);