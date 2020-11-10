import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

class Footer extends Component {

    actualYear = () => {
        let date = new Date();
        let year = date.getFullYear();
        return year
    }

    render() {
        return (
            <div className="footer-container">
                <div className="footer-logo-container">
                    <Header className="footer-title">Bombastic</Header>
                </div>
                <span className="footer-certified-logo">&copy; {this.actualYear()} Bombastic All rights reserved.</span>
                <p className="footer-website-rights">Bombastic is a mock e-commerce site created for education purposes only. Bombastic does not charge any fees nor does it collect user information.</p>
            </div>
        );
    }
}

export default Footer;