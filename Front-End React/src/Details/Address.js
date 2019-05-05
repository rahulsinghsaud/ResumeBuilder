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

export default class Address extends Component {

    state = {
        FetchString: 'http://localhost:8080/addressapi/address',
        addressid: '',
        address1: '',
        address2: '',
        contactNumber1: '',
        contactNumber2: '',
        validaddress1: true,
        dirtyaddress1: false,
        showModal: false,
        formName: 'Add',
        data: []
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevState) {
        // if(prevState.address1 !== this.state.address1){
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
                addressid: this.state.addressid,
                address1: this.state.address1,
                address2: this.state.address2,
                contactNumber1: this.state.contactNumber1,
                contactNumber2: this.state.contactNumber2,
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
                address1: this.state.address1,
                address2: this.state.address2,
                contactNumber1: this.state.contactNumber1,
                contactNumber2: this.state.contactNumber2,
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
        console.log(Data.contactNumber1 +' - ' + Data.contactNumber2)
        console.log(Data.address1 +' - ' + Data.address2)
        this.setState({
            address1: Data.address1,
            address2: Data.address2,
            contactNumber1: Data.contactNumber1,
            contactNumber2: Data.contactNumber2,
            formName: 'Update',
            addressid: Data.addressid
        })
    }

    handleInputChange = ({ target: { name, value } }) => {
        console.log(name.address1)
        if (name === 'address1') {
            const validaddress1 = value.length > 2 && true
            this.setState({
                validaddress1,
                address1: value,
                dirtyaddress1: true
            })
        }        
        if (name === 'address2') {
            this.setState({
                address2: value
            })
        }
        if (name === 'contactNumber1') {
            this.setState({
                contactNumber1: value
            })
        }
        if (name === 'contactNumber2') {
            this.setState({
                contactNumber2: value
            })
        }
        
    }

    handleSubmit = e => {
        e.preventDefault();
        // if (this.state.showModal && this.state.validaddress1 && this.state.validaddress2 && this.state.dirtyaddress1 && this.state.dirtyaddress2) {
        if (this.state.formName === "Update") {
            if (this.state.showModal && this.state.validaddress1) {
                this.updateData()
            }
        }
        if (this.state.formName === "Add") {
            if (this.state.showModal && this.state.validaddress1 && this.state.dirtyaddress1) {
                this.addData()
            }

        }
        this.setState({
            addressid: '',
            address1: '',
            address2: '',
            contactNumber1: '',
            contactNumber2: '',
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
        let { formName, address1, address2, validaddress1, dirtyaddress1, contactNumber1, contactNumber2, showModal, data } = this.state,
            classesaddress1 = 'input ',
            classesaddress2 = 'input '
        validaddress1 && dirtyaddress1 && (classesaddress1 += ' is-success')
        !validaddress1 && dirtyaddress1 && (classesaddress1 += ' is-danger')

        let pairs = [];
        for (var key in data[0]) {
            pairs.push(<th><abbr title="{key}">{key.toUpperCase()}</abbr></th>)
        }
        pairs.push(<th><abbr title="Update">Update</abbr></th>)
        pairs.push(<th><abbr title="Delete">Delete</abbr></th>)


        const contents = data.map(event => (
            <tr>
                <td>{event.addressid}</td>
                <td>{event.address1}</td>
                <td>{event.address2}</td>
                <td>{event.contactNumber1}</td>
                <td>{event.contactNumber2}</td>
                <td>{moment.utc(event.created_on).format('LL')}</td>
                <td>{moment.utc(event.modified_on).format('LL')}</td>
                <td><button className="button is-primary" name="update" value={event.addressid} onClick={this.handleUpdate}>
                    Update
                </button></td>
                <td><button className="button is-danger" name="delete" value={event.addressid} onClick={this.handleUpdate}>
                    Delete
                </button></td>

            </tr>)

        )

        return (
            <div>
                <div class="columns is-vcentered">
                    <div class="column ">
                        <p class="bd-notification is-primary"><b>Address Details</b></p>
                    </div>                    
                </div>
                {/* is-invisible */}
                <div class="columns">
                    <div class="column is-1">
                        <Link to="/Person" className="button is-small is-info">Back</Link></div>
                    <div class="column is-10"></div>
                    <div class="column is-1">
                        <Link to="/Titles" className="button is-small is-info">Next</Link></div>
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
                    <div class="column is-2"><button className="button  is-danger" onClick={this.handleToggle}> Add Address</button></div>
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
                                    <input name="address1" className={classesaddress1} type="Address1" placeholder="Home Address"
                                        value={address1}
                                        onChange={this.handleInputChange} />

                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input name="address2" className={classesaddress2} type="Address2" placeholder="Communication Address"
                                        value={address2}
                                        onChange={this.handleInputChange}/>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input name="contactNumber1" className='input' type="contactNumber1" placeholder="Mobile"
                                        value={contactNumber1}
                                        onChange={this.handleInputChange}/>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input name="contactNumber2" className='input' type="contactNumber2" placeholder="Cell"
                                        value={contactNumber2}
                                        onChange={this.handleInputChange}/>
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