import React, { Component } from 'react';

export default class Navbar extends Component {
    render(){
        return (
            <nav className = "navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <a className="navbar-brand" href="landing.html">
                        PassMe NCS
                    </a>
                    <button
                        className ="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-targer="#mobile-nav"
                    >
                        <span className="nav-bar-toggler-icon" />
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="profiles.html">
                                {' '}
                                Developers
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="register.html">
                                Sign up
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="login.html">
                                Log in
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};

