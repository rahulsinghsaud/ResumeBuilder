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
        FetchString: 'http://localhost:8080/employmentapi/employment',
        employmentID: '',
        companyName: '',
        jobDescription: '',
        startDate: '',
        endDate: '',
        validcompanyName: true,
        validjobDescription: true,
        validstartDate: true,
        dirtycompanyName: false,
        dirtyjobDescription: false,
        dirtystartDate: false,
        showModal: false,
        formName: 'Add',
        data: []
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevState) {
        // if(prevState.companyName !== this.state.companyName){
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
                employmentID: this.state.employmentID,
                companyName: this.state.companyName,
                jobDescription: this.state.jobDescription,
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
                companyName: this.state.companyName,
                jobDescription: this.state.jobDescription,
                startDate: moment(this.state.startDate),
                endDate: (moment(this.state.endDate).isValid()?moment(this.state.endDate):moment().valueOf()),
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
            companyName: Data.companyName,
            jobDescription: Data.jobDescription,
            startDate: Data.startDate,
            endDate: Data.endDate,
            formName: 'Update',
            employmentID: Data.employmentID
        })
    }

    handleInputChange = ({ target: { name, value } }) => {
        //console.log(name.companyName)
        if (name === 'companyName') {
            const validcompanyName = value.length > 2 && true
            this.setState({
                validcompanyName,
                companyName: value,
                dirtycompanyName: true
            })
        }

        if (name === 'jobDescription') {
            const validjobDescription = value.length > 2 && true
            this.setState({
                jobDescription: value,
                validjobDescription,
                dirtyjobDescription: true

            })
        }
        if (name === 'startDate') {
            let validstartDate = false
            if( (value ==='') || (value.length < 4) ){
                validstartDate = false
            }
            else{
                validstartDate = moment(value).isValid() && true                
            }    
                       
            this.setState({
                startDate: value,
                validstartDate,
                dirtystartDate: true
            })
        }
        if (name === 'endDate') {            
            this.setState({
                endDate: moment(value).isValid()?moment(value):moment().valueOf()
            })
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        // if (this.state.showModal && this.state.validcompanyName && this.state.validJob && this.state.dirtycompanyName && this.state.dirtyJob) {
        if (this.state.formName === "Update") {
            if (this.state.showModal && this.state.validcompanyName && this.state.validjobDescription && this.state.validstartDate) {
                this.updateData()
            }
        }
        if (this.state.formName === "Add") {
            if (this.state.showModal &&
                this.state.validcompanyName && this.state.dirtycompanyName &&
                this.state.validjobDescription && this.state.dirtyjobDescription &&
                this.state.validstartDate && this.state.dirtystartDate) {
                this.addData()
            }

        }
        this.setState({
            employmentID: '',
            companyName: '',
            jobDescription: '',
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
            companyName, jobDescription, startDate, endDate,
            validcompanyName, validjobDescription, validstartDate,
            dirtycompanyName, dirtyjobDescription, dirtystartDate,
            showModal, data } = this.state,
            classescompanyName = 'input ',
            classjobDescription = 'textarea ',
            classStartDate = 'input '

        validcompanyName && dirtycompanyName && (classescompanyName += ' is-success')
        !validcompanyName && dirtycompanyName && (classescompanyName += ' is-danger')
        validjobDescription && dirtyjobDescription && (classjobDescription += ' is-success')
        !validjobDescription && dirtyjobDescription && (classjobDescription += ' is-danger')
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
                <td>{event.employmentID}</td>
                <td>{event.companyName}</td>
                <td>{event.jobDescription}</td>
                <td>{moment.utc(event.startDate).format('LL')}</td>
                <td>{event.endDate}</td>
                <td>{moment.utc(event.created_on).format('LL')}</td>
                <td>{moment.utc(event.modified_on).format('LL')}</td>
                <td><button className="button is-primary" name="update" value={event.employmentID} onClick={this.handleUpdate}>
                    Update
                </button></td>
                <td><button className="button is-danger" name="delete" value={event.employmentID} onClick={this.handleUpdate}>
                    Delete
                </button></td>

            </tr>)

        )

        return (
            <div>
                <div class="columns is-vcentered">
                    <div class="column ">
                        <p class="bd-notification is-primary"><b>Employment Details</b></p>
                    </div>                    
                </div>
                {/* is-invisible */}
                <div class="columns">
                    <div class="column is-1">
                        <Link to="/Skills" className="button is-small is-info">Back</Link></div>
                    <div class="column is-10"></div>
                    <div class="column is-1">
                        <Link to="/Degrees" className="button is-small is-info">Next</Link></div>
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
                    <div class="column is-2"><button className="button  is-danger" onClick={this.handleToggle}>Add Employment Details</button></div>
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
                                    <input name="companyName" className={classescompanyName} type="companyName" placeholder="Office Name"
                                        value={companyName}
                                        onChange={this.handleInputChange} />

                                </p>
                            </div>

                            <div className="field">
                                <p className="control has-icons-left">
                                    {/* <input name="jobDescription" className={classjobDescription} type="jobDescription" placeholder="Job Title and Description"
                                        value={jobDescription}
                                        onChange={this.handleInputChange} /> */}
                                    <textarea name="jobDescription" class={classjobDescription}
                                        placeholder="Job Title and Description"
                                        rows="10"
                                        value={jobDescription}
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