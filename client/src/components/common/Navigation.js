import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <div className="nav">
            <Link to="/">MOVIES</Link>
            <Link to="/post">REVIEWS</Link>
            <Link to="/write">NEW POST</Link>
        </div>
    );
}

export default Navigation;