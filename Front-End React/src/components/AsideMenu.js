import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Person from '../Details/Person'
import Address from '../Details/Address'
import Titles from '../Details/Title'
import Skills from '../Details/Skills'
import Employment from '../Details/Employment'
import Degrees from '../Details/Degree'
import Resume from '../Details/Resume'
import Header from './Header'




export default class AsideMenu extends Component {
  state = {
    showLogin: false,
    login: ''
  }

  handleLoginToggle = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  handleLoginName = (loginName) => {
    this.setState({
      login: loginName
    })
  }

  render() {
    return (
      <div>
        <Header></Header>
        <Router>
          <section className="hero is-black is-fullheight">
            <div className="hero-body">
              <div className="container">
                <div className="columns is-vcentered">
                  <div className="column is-2">
                    <aside className="menu">
                      <p className="menu-label">
                        Your Information
  </p>
                      <ul className="menu-list">
                        <li>
                          <Link to="/Person">Person</Link>
                        </li>
                        <li>
                          <Link to="/Address">Address</Link>
                        </li>
                      </ul>
                      <p className="menu-label">
                        Title & Skills
  </p>
                      <ul className="menu-list">
                        <ul>
                          <li> <Link to="/Titles">Titles</Link></li>
                          <li> <Link to="/Skills">Skills</Link></li>
                        </ul>
                      </ul>
                      <p className="menu-label">
                        Work History
  </p>
                      <ul className="menu-list">
                        <li><Link to="/Employment">Employment</Link></li>
                      </ul>
                      <p className="menu-label">
                        Educations
  </p>
                      <ul className="menu-list">
                        <li><Link to="/Degrees">Degrees</Link></li>
                      </ul>
                    </aside>

                  </div>

                  <div className="column is-info has-text-centered is-fullheight">
                   {/* <p className="bd-notification is-primary has-text-centered"> */}
                    <div className="box">                   
                    <article className="media">
                        <div className="box is-centered">
                       <Route path="/Person" exact component={Person} />
                      <Route path="/Address" exact component={Address} />
                      <Route path="/Titles" exact component={Titles} />
                      <Route path="/Skills" exact component={Skills} />
                      <Route path="/Employment" exact component={Employment} />
                      <Route path="/Degrees" exact component={Degrees} />
                      <Route path="/Resume" exact component={Resume} />
                        {/* <Route path="/References" exact component={References} />
                    <Route path="/Login" exact component={Login} /> */}
                        </div>
                    </article>
                </div>
                {/* </p> */}
                      
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Router>
      </div>
    )
  }
}


