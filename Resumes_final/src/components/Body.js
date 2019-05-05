import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const Body = () => (
    <div>
        <Header>
        </Header>
        <section className="hero is-black is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns">
                        <div className="column is-three-quarters">
                            <figure className="image is-small is-centered" style={{ maxWidth: '65%', maxHeight: '65%', opacity: '0.2' }}>
                                <img src="../images/tablesetting2.jpg" alt="Images"/>
                            </figure>
                        </div>
                        <div className="column" style={{ display: 'flex', alignItems: 'center' }} >
                            <p className="subtitle">
                                A resume is a short document (most of the recruiters recommend limiting it to one page only) that summarizes
                                your relevant professional experience, skills, and education that you need to prepare when applying for a job.
                            <br></br>
                                <br></br>
                                <Link to='./AsideMenu' className="button is-large is-info"> {/*onClick= {this.handleLoginToggle}  */}
                                    Get Started
                                    </Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>





)

export default Body
