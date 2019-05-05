import React, { Component } from 'react'
import {  Link } from "react-router-dom";
import 'bulma/css/bulma.css'
import Header from './Header'
import moment from 'moment'



class App extends Component {
  state = {
    showModal: false,
    person: [], 
    address: [], 
    title: [], 
    skills: [], 
    employment: [],
    education: [],
    FetchPerson: 'http://localhost:8080/personapi/person',
    FetchAddress: 'http://localhost:8080/addressapi/address',
    FetchEducation: 'http://localhost:8080/educationapi/education',
    FetchEmployment: 'http://localhost:8080/employmentapi/employment',
    FetchSkills: 'http://localhost:8080/skillsapi/skills',
    FetchTitle: 'http://localhost:8080/titleapi/title'
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    //Required for fetching
    fetch(this.state.FetchPerson)
      .then(response => response.json())
      .then(person => this.setState({ person }))

    fetch(this.state.FetchAddress)
      .then(response => response.json())
      .then(address => this.setState({ address }))

    fetch(this.state.FetchEducation)
      .then(response => response.json())
      .then(education => this.setState({ education }))

    fetch(this.state.FetchEmployment)
      .then(response => response.json())
      .then(employment => this.setState({ employment }))

    fetch(this.state.FetchSkills)
      .then(response => response.json())
      .then(skills => this.setState({ skills }))

    fetch(this.state.FetchTitle)
      .then(response => response.json())
      .then(title => this.setState({ title }))
  }

  render() {
    let { title, person, address, skills, employment, education } = this.state
    //Person
    const persons = person.map(event => (
      <div style={{ marginBottom: '-20px' }}>
        <span className="subtitle is-size-3">
          {event.firstName} {event.lastName}
        </span>
      </div>
    )
    )
    //Address
    const addresses = address.map(event => (
      <div className="subtitle is-size-7 has-text-left" >
        <div>
        <span><b>Address.</b></span> {event.address1}
        </div>
        <div>
          <span><b>Cell. </b></span> {event.contactNumber1}   <br></br>
          <span><b>Home. </b></span> {event.contactNumber2}
        </div>
      </div>
    )
    )
    //Only for Title Name
    const titlesNames = title.map(event => (
      <span className='subtitle is-size-5' style={{ marginTop: '20px', marginBottom: '20px' }}>{event.titleName}</span>
    )
    )
    //Title
    const titles = title.map(event => (
      <div className="subtitle">
        <textarea name="personalSummary" class='textarea is-small has-fixed-size'
          placeholder="Personal Summary"
          value={event.personalSummary} disabled
        ></textarea>
      </div>
    )
    )
    //Address
    const AllSkills = skills.map(event => (
     <div className="columns ">
      <div className="column is-four-fifths"> {event.skillName}</div>
      <div className="column is-one-fifth"> {event.skillLevel}</div>
     </div>    
    )
    )
    //Education
    const Educations = education.map(event => (
      <div className="subtitle is-size-6" style={{ marginBottom: '-20px' }}>
        <div class="columns is-vcentered">
          <div class="column is-8">
            <p class="bd-notification is-primary">{event.institutionName}</p>
          </div>
          <div class="column">
            <p class="bd-notification is-primary">{moment.utc(event.startDate).format('LL')}</p>
          </div>
          <div class="column">
            <p class="bd-notification is-primary">{moment.utc(event.endDate).format('LL')}</p>
          </div>
        </div>
        <textarea name="educationSummary" class='textarea is-small has-fixed-size'
          placeholder="educationSummary"
          value={event.degree} disabled></textarea>       
      </div>
    )
    )

    //Employment
    const Employments = employment.map(event => (
      <div >
        <div class="columns is-vcentered">
          <div class="column is-8">
            <p class="bd-notification is-danger">{event.companyName}</p>
          </div>
          <div class="column">
            <p class="bd-notification is-primary">{moment.utc(event.startDate).format('LL')}</p>
          </div>
          <div class="column">
            <p class="bd-notification is-primary">{moment.utc(event.endDate).format('LL')}</p>
          </div>
        </div>
        <br></br>
        {/* <div className="Columns">
              <div className="column"> {event.companyName}</div>
              <div className="column"><span className="is-text-left">{moment.utc(event.startDate).format('LL')}</span></div>
              <div className="column"> <span className="is-text-left">{moment.utc(event.endDate).format('LL')}</span></div>
        </div>   */}
        <textarea name="personalSummary" class='textarea is-small has-fixed-size'
          placeholder="Personal Summary"
          value={event.jobDescription} disabled
        ></textarea>
      </div>
    )
    )
    return (
      <div>
        <Header> </Header>
        <div class="modal is-active">
          <div class="modal-background "></div>
          <div class="modal-card">
            <header class="modal-card-head ">
              <p class="modal-card-title  has-text-centered">{persons}
                <br></br>
                {titlesNames}
                <br></br>
                <br></br>
                {addresses}
              </p>              
              <Link class="delete" aria-label="close" to="/"></Link>
            </header>
            <section class="modal-card-body  ">
              {/* Title */}
              <div class="box">
                <article class="media">
                  <div class="media-content">
                  <p>Personal Summary
                    
                  </p>
                    <div class="content">
                      <p>
                      <br></br>
                        {titles}
                      </p>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
              {/* Skills */}
              <div class="box">
                <article class="media">                  
                  <div class="media-content">
                  <p>Skill Sets 
                  </p>
                  <hr></hr> 
                    <div class="content">                    
                      <p>
                        {AllSkills} </p>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
              {/* Employment */}
              <div class="box">
                <article class="media">                  
                  <div class="media-content">
                   <p style={{background:'lightgrey',width:'100%'}}>
                  <br></br>
                  Work Experience       
                  <hr></hr>           
                  </p>
                  <hr></hr>  
                    <div class="content">
                      <p>
                        {Employments}     </p>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
              {/* Education */}
              <div class="box">
                <article class="media">
                  <div class="media-content">
                  <p style={{background:'lightgrey',width:'100%'}}>
                  <br></br>
                  Acadamics       
                  <hr></hr>           
                  </p>
                   
                    <div class="content">
                      <p>
                        {Educations}     </p>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                        <span class="level-item" aria-label="like">
                          <span class="icon is-small">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                          </span>
                        </span>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
            </section>
            {/* <footer class="modal-card-foot">
              <button class="button is-success">Save changes</button>
              <button class="button">Cancel</button>
            </footer> */}
          </div>
        </div>
      </div>
    )

  }
}
export default App