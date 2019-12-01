import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">
                                    PassMe 1
                                </h1>
                                <p className="lead">
                                    PassMe 2
                                </p>
                                <hr />
                                <Link to="register" className="btn btn-lg btn-info mr-2">
                                    가입
                                </Link>
                                <Link to="login" className="btn btn-lg btn-light">
                                    로그인
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;