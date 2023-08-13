import React from 'react';
import { Link } from "react-router-dom";

interface Props {
    userId: string
}

const Nav = ({ userId }: Props) => {

    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-3">
                <Link to="/home" className="brand-logo">The True and Only Task Manager</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/home" state={{ userId: userId }}>Home</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;
