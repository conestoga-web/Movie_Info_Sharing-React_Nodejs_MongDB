import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <div className="nav">
            <Link to="/">HOME</Link>
            <Link to="/post">POST</Link>
            <Link to="/write">WRITE</Link>
        </div>
    );
}

export default Navigation;