import React, {Component} from 'react';

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <a className="navbar-barnd" href="landing.html">
                        Pass Me
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        // 웹에서는 안 보이지만, 모바일에서 보여지는 버튼(반응형 위함)
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="mobile-nav"> 
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="register.html">
                                    가입
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="login.html">
                                    로그인
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

            </nav>
        );
    }
}

export default Navbar;