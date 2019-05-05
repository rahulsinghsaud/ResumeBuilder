import React, { Component } from 'react'
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

export default class Employment extends Component {

    state = {
        FetchString: 'http://localhost:8080/educationapi/education',
        eductationID: '',
        institutionName: '',
        degree: '',
        startDate: '',
        endDate: '',
        validinstitutionName: true,
        validdegree: true,
        validstartDate: true,
        dirtyinstitutionName: false,
        dirtydegree: false,
        dirtystartDate: false,
        showModal: false,
        formName: 'Add',
        data: []
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevState) {
        // if(prevState.institutionName !== this.state.institutionName){
        this.fetchData()
        // }

    }

    fetchData() {
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
                eductationID: this.state.eductationID,
                institutionName: this.state.institutionName,
                degree: this.state.degree,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                created_on: moment(),
                modified_on: moment()
            }),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json'
            }
        })
            .then(response => response.text())
            .then(text => Alert.info(text + ' - ' + this.state.Job,
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
                institutionName: this.state.institutionName,
                degree: this.state.degree,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                created_on: moment(),
                modified_on: moment()
            }),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json'
            }
        })
            .then(response => response.text())
            .then(text => Alert.success(text + ' - ' + this.state.Job,
                {
                    position: 'top-right',
                    effect: 'scale',
                    timeout: 5000
                }))
    }


    handleUpdate = ({ target: { name, value } }) => {
        if (name === 'delete') {
            const ID = value
            this.deleteData(ID)
        }
        if (name === 'update') {
            const ID = value
            this.handleToggle()
            fetch(this.state.FetchString + '/' + ID)
                .then(response => response.json())
                .then(Data => this.updateSetState(Data))
        }
    }


    updateSetState(Data) {
        this.setState({
            institutionName: Data.institutionName,
            degree: Data.degree,
            startDate: Data.startDate,
            endDate: Data.endDate,
            formName: 'Update',
            eductationID: Data.eductationID
        })
    }

    handleInputChange = ({ target: { name, value } }) => {
        console.log(name.institutionName)
        if (name === 'institutionName') {
            const validinstitutionName = value.length > 2 && true
            this.setState({
                validinstitutionName,
                institutionName: value,
                dirtyinstitutionName: true
            })
        }

        if (name === 'degree') {
            const validdegree = value.length > 2 && true
            this.setState({
                degree: value,
                validdegree,
                dirtydegree: true

            })
        }
        if (name === 'startDate') {
            const validstartDate = value.length > 2 && true
            this.setState({
                startDate: value,
                validstartDate,
                dirtystartDate: true
            })
        }
        if (name === 'endDate') {
            this.setState({
                endDate: value
            })
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        // if (this.state.showModal && this.state.validinstitutionName && this.state.validJob && this.state.dirtyinstitutionName && this.state.dirtyJob) {
        if (this.state.formName === "Update") {
            if (this.state.showModal && this.state.validinstitutionName && this.state.validdegree && this.state.validstartDate) {
                this.updateData()
            }
        }
        if (this.state.formName === "Add") {
            if (this.state.showModal &&
                this.state.validinstitutionName && this.state.dirtyinstitutionName &&
                this.state.validdegree && this.state.dirtydegree &&
                this.state.validstartDate && this.state.dirtystartDate) {
                this.addData()
            }

        }
        this.setState({
            eductationID: '',
            institutionName: '',
            degree: '',
            startDate: '',
            endDate: '',
            formName: 'Add'
        })
        this.handleToggle()
        // }
    }

    handleToggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }


    render() {
        let { formName,
            institutionName, degree, startDate, endDate,
            validinstitutionName, validdegree, validstartDate,
            dirtyinstitutionName, dirtydegree, dirtystartDate,
            showModal, data } = this.state,
            classesinstitutionName = 'input ',
            classdegree = 'textarea ',
            classStartDate = 'input '

        validinstitutionName && dirtyinstitutionName && (classesinstitutionName += ' is-success')
        !validinstitutionName && dirtyinstitutionName && (classesinstitutionName += ' is-danger')
        validdegree && dirtydegree && (classdegree += ' is-success')
        !validdegree && dirtydegree && (classdegree += ' is-danger')
        validstartDate && dirtystartDate && (classStartDate += ' is-success')
        !validstartDate && dirtystartDate && (classStartDate += ' is-danger')


        let pairs = [];
        for (var key in data[0]) {
            pairs.push(<th><abbr title="{key}">{key.toUpperCase()}</abbr></th>)
        }
        pairs.push(<th><abbr title="Update">Update</abbr></th>)
        pairs.push(<th><abbr title="Delete">Delete</abbr></th>)


        const contents = data.map(event => (
            <tr>
                <td>{event.eductationID}</td>
                <td>{event.institutionName}</td>
                <td>{event.degree}</td>
                <td>{moment.utc(event.startDate).format('LL')}</td>
                <td>{moment.utc(event.endDate).format('LL')}</td>
                <td>{moment.utc(event.created_on).format('LL')}</td>
                <td>{moment.utc(event.modified_on).format('LL')}</td>
                <td><button className="button is-primary" name="update" value={event.eductationID} onClick={this.handleUpdate}>
                    Update
                </button></td>
                <td><button className="button is-danger" name="delete" value={event.eductationID} onClick={this.handleUpdate}>
                    Delete
                </button></td>

            </tr>)

        )

        return (
            <div>
                <div class="columns is-vcentered">
                    <div class="column ">
                        <p class="bd-notification is-primary"><b>Education Details</b></p>
                    </div>                    
                </div>
                {/* is-invisible */}
                <div class="columns">
                    <div class="column is-1">
                        <Link to="/Employment" className="button is-small is-info">Back</Link></div>
                    <div class="column is-10"></div>
                    <div class="column is-1">
                        {/* <Link to="/AsideMenu" className="button is-small is-info">Next</Link>*/}
                        </div> 
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
                    <div class="column is-2"><button className="button  is-danger" onClick={this.handleToggle}>Add Education Details</button></div>
                    <div class="column is-5"></div>
                </div>

                <div className={'modal ' + (showModal ? ' is-active' : '')}>
                    <div className="modal-background"></div>    {/*onClick={this.handleToggle} */}
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Address Form</p>
                            <button className="delete" aria-label="close"
                                onClick={this.handleToggle}></button>
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input name="institutionName" className={classesinstitutionName} type="institutionName" placeholder="Office Name"
                                        value={institutionName}
                                        onChange={this.handleInputChange} />

                                </p>
                            </div>

                            <div className="field">
                                <p className="control has-icons-left">
                                    {/* <input name="degree" className={classdegree} type="degree" placeholder="Job Title and Description"
                                        value={degree}
                                        onChange={this.handleInputChange} /> */}
                                    <textarea name="degree" class={classdegree}
                                        placeholder="Job Title and Description"
                                        rows="10"
                                        value={degree}
                                        onChange={this.handleInputChange}
                                    ></textarea>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input name="startDate" className={classStartDate} type="startDate" placeholder="Job Start Date"
                                        value={startDate}
                                        onChange={this.handleInputChange} />
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input name="endDate" className='input' type="startDate" placeholder="Job End Date(Optional)"
                                        value={endDate}
                                        onChange={this.handleInputChange} />
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