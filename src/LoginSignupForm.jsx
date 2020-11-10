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
        <br></br>
        <br></br>
        <Modal.Header className="login-signup-header">LOGIN</Modal.Header>
        <Modal.Description>
            <Form.Field className="login-form">
                <label className="login-labels">username</label>
                <Form.Input 
                    icon='user'
                    iconPosition='left'
                    className="login-signup-input-field"
                    type="text"
                    placeholder="username"
                    name="username"
                    value={this.state.username} 
                    onChange={this.handleChange} 
                />
            </Form.Field>
            <Form.Field className="login-form">
                <label className="login-labels">password</label>
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    className="login-signup-input-field"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={this.state.password} 
                    onChange={this.handleChange} 
                />
            </Form.Field>
            <p className="invalid-logins">{this.props.error.errors}</p>
        </Modal.Description>
        <Form.Field className="login-signup-submit-btn" color="blue" control={Button}>LOGIN</Form.Field>
        <div className="check-if-have-account">
            <p className="have-account-title">Need an Account?</p>
            <p className="signup-login-route-button" onClick={showSignUp}>Let's Sign Up!</p>
        </div>
        </> : 
        <>
        <br></br>
        <br></br>
        <Modal.Header className="login-signup-header">SIGN UP</Modal.Header>
        <Modal.Description>  
            <Form.Field className="login-signup-form">
                <label className="signup-labels">username</label>
                <Form.Input 
                    icon='user'
                    iconPosition='left'
                    className="login-signup-input-field"
                    type="text"
                    placeholder="username"
                    name="username"
                    value={this.state.username} 
                    onChange={this.handleChange} 
                />
            </Form.Field>
            <Form.Field className="login-signup-form">
                <label className="signup-labels">password</label>
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    className="login-signup-input-field"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={this.state.password} 
                    onChange={this.handleChange} 
                />
            </Form.Field>

            <p className="invalid-logins">{this.props.error.errors}</p> 
        </Modal.Description>
        <Form.Field className="login-signup-submit-btn" color="blue" control={Button}>SIGN UP</Form.Field>
                
        <div className="check-if-have-account">
            <p className="have-account-title">Have an account?</p> 
            <p className="signup-login-route-button" onClick={showSignUp}>Let's Login!</p>
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