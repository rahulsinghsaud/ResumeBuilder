import React from 'react'
import NavLinks from './NavLinks'


// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header className="hero is-small is-dark">
        <div className="hero-head ">
            <nav className="navbar">
                <div className="container is-medium ">
                    <div className="navbar-brand">
                            <span className="navbar-item">Resume Builder</span>
                            {/* <img src="./images/profildfe.jpg" alt="Build Resume" /> */}
                        <span className="navbar-burger burger" data-target="navbarMenuHeroB">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div id="navbarMenuHeroB" className="navbar-menu">
                        <NavLinks></NavLinks>
                    </div>
                </div>
            </nav>
        </div>
    </header>
)
export default Header
