import React, {Component} from 'react';
import { Link } from "react-router-dom";


class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-barnd" to="/">
                        Pass Me
                    </Link>
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
                                {/* to="주소창에 입력될 글씨" */}
                                <Link className="nav-link" to="/register">
                                    가입
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="login">
                                    로그인
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

            </nav>
        );
    }
}

export default Navbar;