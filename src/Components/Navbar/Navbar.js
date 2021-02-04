import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light bg-navcol">
                <Link to="/" >
                    <img src="https://assets.mevo.co.nz/brand/logo-light.svg" className= "logo" alt="logo"/>
                </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
            </nav>
        </div>
    )
}

export default Navbar