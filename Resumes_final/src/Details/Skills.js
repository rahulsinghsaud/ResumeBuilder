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

export default class Skills extends Component {

    state = {
        FetchString: 'http://localhost:8080/skillsapi/skills',
        skillsID: '',
        skillName: '',
        skillLevel: '',
        validskillName: true,
        validskillLevel: true,
        dirtyskillName: false,
        dirtyskillLevel: false,
        showModal: false,
        formName: 'Add',
        data: []
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevState) {
        // if (prevState.data !== this.state.data) {
        //     this.fetchData()
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
                skillsID: this.state.skillsID,
                skillName: this.state.skillName,
                skillLevel: this.state.skillLevel,
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
                skillName: this.state.skillName,
                skillLevel: this.state.skillLevel,
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
            this.handlePersonToggle()
            fetch(this.state.FetchString + '/' + ID)
                .then(response => response.json())
                .then(Data => this.updateSetState(Data))
        }
    }


    updateSetState(Data) {
        this.setState({
            skillName: Data.skillName,
            skillLevel: Data.skillLevel,
            formName: 'Update',
            skillsID: Data.skillsID
        })
    }

    handleInputChange = ({ target: { name, value } }) => {
        if (name === 'skillName') {
            const validskillName = value.length > 2 && true
            this.setState({
                validskillName,
                skillName: value,
                dirtyskillName: true
            })
        }
        if (name === 'skillLevel') {
            const validskillLevel = value.length > 2 && true// later on add regax for skillName validation
            this.setState({
                validskillLevel,
                skillLevel: value,
                dirtyskillLevel: true
            })
        }

    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.formName === "Update") {
            if (this.state.showModal && this.state.validskillName && this.state.validskillLevel) {
                this.updateData()
            }
        }

            if (this.state.formName === "Add") {
                if (this.state.showModal && this.state.validskillName && this.state.validskillLevel && this.state.dirtyskillName && this.state.dirtyskillLevel) {
                    this.addData()
                }
            }
            this.setState({
                skillsID: '',
                skillName: '',
                skillLevel: '',
                formName: 'Add'
            })
            this.handlePersonToggle()
    }

    handlePersonToggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }


    render() {
        let { formName, skillName, skillLevel, validskillName, validskillLevel, dirtyskillName, dirtyskillLevel, showModal, data } = this.state,
            classesskillName = 'input ',
            classesskillLevel = 'input '
        validskillName && dirtyskillName && (classesskillName += ' is-success')
        !validskillName && dirtyskillName && (classesskillName += ' is-danger')
        validskillLevel && dirtyskillLevel && (classesskillLevel += ' is-success')
        !validskillLevel && dirtyskillLevel && (classesskillLevel += ' is-danger')

        let pairs = [];
        for (var key in data[0]) {
            pairs.push(<th><abbr title="{key}">{key.toUpperCase()}</abbr></th>)
        }
        pairs.push(<th><abbr title="Update">Update</abbr></th>)
        pairs.push(<th><abbr title="Delete">Delete</abbr></th>)


        const contents = data.map(event => (
            <tr>
                <td>{event.skillsID}</td>
                <td>{event.skillName}</td>
                <td>{event.skillLevel}</td>
                <td>{moment.utc(event.created_on).format('LL')}</td>
                <td>{moment.utc(event.modified_on).format('LL')}</td>               
                <td><button className="button is-primary" name="update" value={event.skillsID} onClick={this.handleUpdate}>
                    Update
                </button></td>
                <td><button className="button is-danger" name="delete" value={event.skillsID} onClick={this.handleUpdate}>
                    Delete
                </button></td>

            </tr>)

        )

        return (
            <div>
                <div class="columns is-vcentered">
                    <div class="column ">
                        <p class="bd-notification is-primary"><b>Skill Sets</b></p>
                    </div>                    
                </div>
                {/* is-invisible */}
                <div class="columns">
                    <div class="column is-1">
                        <Link to="/Title" className="button is-small is-info">Back</Link> 
                    </div>
                    <div class="column is-10"></div>
                    <div class="column is-1">
                        <Link to="/Employment" className="button is-small is-info">Next</Link></div>
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
                    <div class="column is-2"><button className="button  is-danger" onClick={this.handlePersonToggle}> Add Skills</button></div>
                    <div class="column is-5"></div>
                </div>

                <div className={'modal ' + (showModal ? ' is-active' : '')}>
                    <div className="modal-background"></div>    {/*onClick={this.handlePersonToggle} */}
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Skills Form</p>
                            <button className="delete" aria-label="close"
                                onClick={this.handlePersonToggle}></button>
                        </header>
                        <section className="modal-card-body">

                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input name="skillName" className={classesskillName} type="skillName" placeholder="skillName"
                                        value={skillName}
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
                                    <input name="skillLevel" className={classesskillLevel} type="skillLevel" placeholder="skillLevel"
                                        value={skillLevel}
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