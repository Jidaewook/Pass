import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            // bootstrap에서 찾아서 양식을 컨트롤해라
            <footer className="bg-dark text-white mt-5 p-4 text-center">
                Copyright &copy; {new Date().getFullYear()} PassMeNCS
            </footer>
        );
    }
}

export default Footer;