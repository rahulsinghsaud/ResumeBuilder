import React from 'react'
import { Link } from 'react-router-dom'


const NavLinks = () => (
    <div className="navbar-end">
        <Link className="navbar-item" to='/'>Home</Link>
        <Link className="navbar-item" to='/Template'>Sample</Link>
    </div>
)
export default NavLinks

