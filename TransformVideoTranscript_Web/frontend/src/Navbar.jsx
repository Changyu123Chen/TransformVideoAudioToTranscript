import React, {useState} from "react";
import { Link } from "react-router-dom";
import './styles/Navbar.scss';

const Navbar = () => {
    return(
        <nav className="navbar">
            <div className="navbar-logo">
                <Link className="link" to="/">TranscriptApp</Link>
            </div>
            <ul className="navbar-links">
                <li><Link className="link" to="/">Home</Link></li>
                <li><Link className="link" to="/demo">Demo</Link></li>
                <li>
                    <a
                        className="link"
                        href="https://changyu123chen.github.io/Changyu_Website/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Portfolio Website
                    </a>
                </li>

            </ul>
        </nav>
    )
};

export default Navbar;