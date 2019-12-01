import React, { Component } from 'react';

class Register extends Component {

    // 해당 컴포넌트를 설정할 때 초기 상태값을 설정한다.
    constructor() {
        super();
        this.state ={
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        // onChange에서 입력한 함수효과를 적용한다. bind는 ()의 대상을 가리키는 함수
        this.onChange = this.onChange.bind(this);
        
        // 아직 제출하는 단계는 아님.
        this.onSubmit = this.onSubmit.bind(this);
    }

    //인풋의 변화를 인식하는 함수. this.setstate(다시 설정하겠다.[state설정한 key값]:입력받은 value값)

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    //e: 사용자 입력값, 초기 값을 디폴트값으로 둔다. newUser라는 상수에 대한 속성값들을 입력값으로 설정한다.
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser);
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                가입
                            </h1>
                            <p className="lead text-center">
                                계정적으시오
                            </p>
                            {/* form onSubmit(=속성), this.onSubmit(=우리가 앞에 만든 함수명) */}
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />

                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    <small className="form-text text-muted">
                                        이메일을 기준으로 아바타가 자동으로 생성됩니다.
                                    </small>
                                </div>
                                
                                <div className="form-group">
                                    <input 
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Confirm Password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}

                                    />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;