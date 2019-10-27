import React, { Component } from 'react';
import {Link} from "react-router-dom";


export default class Navbar extends Component {
    render(){
        return (
            <nav className = "navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        PassMe NCS
                    </Link>
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
                            <Link className="nav-link" href="profiles.html">
                                {' '}
                                Developers
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                Sign up
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Log in
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};

