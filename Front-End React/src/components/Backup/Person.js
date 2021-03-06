/* eslint-disable */

import React, { Component ,  useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

export default class Person extends Component {

    state = {
        FetchString: 'http://localhost:8080/personapi/person',
        personID: '',
        FirstName: '',
        LastName: '',
        validFirstName: true,
        validLastName: true,
        dirtyFirstName: false,
        dirtyLastName: false,
        showModal: false,
        formName: 'Add',
        handleUpdate: false,
        data: []
    }

    componentDidMount() {
        this.fetchData()
    }

    toggleupdateTable(){
        this.setState({
            updateTable: !this.state.updateTable
        })
    }
    componentDidUpdate() {
          this.fetchData()       
    }
    fetchData() {
        //console.log("Fetching"+ Date())
        //Required for fetching
        fetch(this.state.FetchString)
            .then(response => response.json())
            .then(data => this.setState({ data }))
    }

    deleteData(id) {
        fetch(this.state.FetchString + "/" + id, {
            method: 'DELETE'
        })
            .then(response => response.text())
            .then(text => Alert.error(text,
                {
                    position: 'top-right',
                    effect: 'scale',
                    timeout: 3000
                }))
    }

    updateData(event) {
        fetch(this.state.FetchString, {
            method: 'PUT',
            body: JSON.stringify({
                personID: this.state.personID,
                firstName: this.state.FirstName,
                lastName: this.state.LastName,
                created_on: moment(),
                modified_on: moment()
            }),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json'
            }
        })
            .then(response => response.text())
            .then(text => Alert.info(text,
                {
                    position: 'top-right',
                    effect: 'scale',
                    timeout: 5000
                }))
    }

    addData() {
        fetch(this.state.FetchString, {
            method: 'POST',
            body: JSON.stringify({
                firstName: this.state.FirstName,
                lastName: this.state.LastName,
                created_on: moment(),
                modified_on: moment()
            }),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json'
            }
        })
            .then(response => response.text())
            .then(text => Alert.success(text,
                {
                    position: 'top-right',
                    effect: 'scale',
                    timeout: 5000
                }))
    }

    handleToggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleUpdate = ({ target: { name, value } }) => {
        if (name === 'delete') {
            const ID = value
            this.deleteData(ID)
            this.setState({
                personID: ' ',
                FirstName: '',
                LastName: '',
                formName: 'Add'
            })
        }
        if (name === 'update') {
            const ID = value
            this.handleToggle()
            fetch(this.state.FetchString + '/' + ID)
                .then(response => response.json())
                .then(Data => this.updateFormData(Data))
        }
    }
    // Update forms accordingly
    updateFormData(Data) {
        this.setState({
            FirstName: Data.firstName,
            LastName: Data.lastName,
            formName: 'Update',
            personID: Data.personID
        })
    }

    handleInputChange = ({ target: { name, value } }) => {
        if (name === 'FirstName') {
            const validFirstName = value.length > 2 && true
            this.setState({
                validFirstName,
                FirstName: value,
                dirtyFirstName: true
            })
        }
        if (name === 'LastName') {
            const validLastName = value.length > 2 && true// later on add regax for FirstName validation
            this.setState({
                validLastName,
                LastName: value,
                dirtyLastName: true
            })
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.showModal && this.state.validFirstName && this.state.validLastName && this.state.dirtyFirstName && this.state.dirtyLastName) {
            if (this.state.formName === "Update") {
                this.updateData()

            }
            if (this.state.formName === "Add") {
                this.addData()
            }
            this.setState({
                personID: '',
                FirstName: '',
                LastName: '',
                formName: 'Add'
            })
            this.handleToggle()
            this.setState({
                updateTable:!this.state.updateTable
            })
            this.componentDidUpdate(this.state.updateTable)
        }
    }
    render() {
        let { formName, FirstName, LastName, validFirstName, validLastName, dirtyFirstName, dirtyLastName, showModal, data } = this.state,
            classesFirstName = 'input ',
            classesLastName = 'input '
        validFirstName && dirtyFirstName && (classesFirstName += ' is-success')
        !validFirstName && dirtyFirstName && (classesFirstName += ' is-danger')
        validLastName && dirtyLastName && (classesLastName += ' is-success')
        !validLastName && dirtyLastName && (classesLastName += ' is-danger')

        let pairs = [];
        for (var key in data[0]) {
            pairs.push(<th><abbr title="{key}">{key.toUpperCase()}</abbr></th>)
        }
        pairs.push(<th><abbr title="Update">Update</abbr></th>)
        pairs.push(<th><abbr title="Delete">Delete</abbr></th>)


        const contents = data.map(event => (
            <tr>
                <td>{event.firstName}</td>
                <td>{event.lastName}</td>
                <td>{moment.utc(event.created_on).format('L')}</td>
                <td>{moment.utc(event.modified_on).format('LL')}</td>
                <td>{event.personID}</td>
                <td><button className="button is-primary" name="update" value={event.personID} onClick={this.handleUpdate}>
                    Update
                </button></td>
                <td><button className="button is-danger" name="delete" value={event.personID} onClick={this.handleUpdate}>
                    Delete
                </button></td>

            </tr>)

        )

        return (
            <div>
                {/* is-invisible */}
                <div class="columns">
                    <div class="column is-1">
                        <Link to="/AsideMenu" className="button is-small is-info">Back</Link></div>
                    <div class="column is-10"></div>
                    <div class="column is-1">
                        <Link to="/Address" className="button is-small is-info">Next</Link></div>
                </div>

                <table class="table is-hoverable" >
                    <thead>
                        <tr>
                            {pairs}
                        </tr>
                    </thead>
                    <tbody>
                        {contents}
                    </tbody>
                </table>

                <div class="columns">
                    <div class="column is-5"></div>
                    <div class="column is-2"><button className="button  is-danger" onClick={this.handleToggle}> Add Person Details</button></div>
                    <div class="column is-5"></div>
                </div>

                <div className={'modal ' + (showModal ? ' is-active' : '')}>
                    <div className="modal-background"></div>    {/*onClick={this.handleToggle} */}
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Person Form</p>
                            <button className="delete" aria-label="close"
                                onClick={this.handleToggle}></button>
                        </header>
                        <section className="modal-card-body">

                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input name="FirstName" className={classesFirstName} type="FirstName" placeholder="FirstName"
                                        value={FirstName}
                                        onChange={this.handleInputChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-check"></i>
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input name="LastName" className={classesLastName} type="LastName" placeholder="LastName"
                                        value={LastName}
                                        onChange={this.handleInputChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <div className="buttons is-right">
                                <button className="button is-success" onClick={this.handleSubmit}>{formName}</button>
                                <button className="button is-info">Reset</button>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            {/* <button className="button is-success">Save changes</button>
                        <button className="button">Cancel</button> */}
                        </footer>
                    </div>
                </div>
                <Alert stack={{ limit: 3 }} />
            </div>
        )
    }
}
