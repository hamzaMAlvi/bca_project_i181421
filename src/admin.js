import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { MyButton, MyList, Input, LogoutButton } from "./appUtils";
import { getList, addDoctor, addMS } from "./MRS_Utils";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Admin', warning: '', option: 'Main', displayList: [], addr: '', dName: '', msName: '', msLoc: '', msOwner: '' };
        this.handleChoice = this.handleChoice.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInsertion = this.handleInsertion.bind(this);
    }

    async handleChoice(value) {
        if (value === "Existing Medical Stores" || value === "Existing Doctors") {
            const tmp = await getList(value);
            this.setState({ displayList: tmp, option: value });
        } else {
            this.setState({ option: value, warning: '', displayList: [], addr: '', dName: '', msName: '', msLoc: '', msOwner: '' });
        }
    }

    async handleInsertion(val) {
        var tmp = false;
        if (val === "D") {
            tmp = await addDoctor(this.props.address, this.state.addr, this.state.dName);
        } else if (val === "MS") {
            tmp = await addMS(this.props.address, this.state.addr, this.state.msName, this.state.msOwner, this.state.msLoc);
        }
        if (tmp) {
            this.setState({ option: "Main", warning: '', displayList: [], addr: '', dName: '', msName: '', msLoc: '', msOwner: '' });
        } else {
            this.setState({ warning: "Please check whether the given address and information is correct" });
        }
    }

    handleChange(event, s_var) {
        if (s_var === "dName") {
            this.setState({ dName: event.target.value })
        } else if (s_var === "addr") {
            this.setState({ addr: event.target.value })
        } else if (s_var === "msName") {
            this.setState({ msName: event.target.value })
        } else if (s_var === "msLoc") {
            this.setState({ msLoc: event.target.value })
        } else if (s_var === "msOwner") {
            this.setState({ msOwner: event.target.value })
        }
    }

    render() {
        if (this.state.option === "Main") {
            return (<div>
                <Box m={5} />
                <LogoutButton />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                Add a new Doctor or See list of Existing Doctors:
                <MyButton val={1} text="New Doctor" text1="Doctor" handleclick={this.handleChoice} />
                <MyButton val={1} text="Existing Doctors" text1="Existing Doctors" handleclick={this.handleChoice} /><br /><br />
                Add a new Medical Store or See list of Existing Medical Stores:
                <MyButton val={1} text="New Medical Store" text1="MS" handleclick={this.handleChoice} />
                <MyButton val={1} text="Existing Medical Stores" text1="Existing Medical Stores" handleclick={this.handleChoice} />
            </div>);
        } else if (this.state.option === "Existing Doctors" || this.state.option === "Existing Medical Stores") {
            return (<div>
                <Box m={5} />
                <MyButton id1="rightAlign" val={1} text="Back" text1="Main" handleclick={this.handleChoice} />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                <h4>Following is the list of {this.state.option}:</h4>
                <MyList values={this.state.displayList} />
            </div>);
        } else if (this.state.option === "MS") {
            return (<div>
                <Box m={5} />
                <MyButton id1="rightAlign" val={1} text="Back" text1="Main" handleclick={this.handleChoice} />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                <Input label="Address for Medical Store" edited={this.handleChange} address={this.state.addr} s_var="addr" />
                <Input label="Name of Medical Store" edited={this.handleChange} address={this.state.msName} s_var="msName" />
                <Input label="Owner of Medical Store" edited={this.handleChange} address={this.state.msOwner} s_var="msOwner" />
                <Input label="Location of Medical Store" edited={this.handleChange} warning={this.state.warning} address={this.state.msLoc} s_var="msLoc" />
                <MyButton val={3} text="Add Medical Store" text1="MS" handleclick={this.handleInsertion} />
            </div>);
        } else if (this.state.option === "Doctor") {
            return (<div>
                <Box m={5} />
                <MyButton id1="rightAlign" val={1} text="Back" text1="Main" handleclick={this.handleChoice} />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                <Input label="Address for Doctor" edited={this.handleChange} address={this.state.addr} s_var="addr" />
                <Input label="Name of Doctor" edited={this.handleChange} warning={this.state.warning} address={this.state.dName} s_var="dName" />
                <MyButton val={3} text="Add Doctor" text1="D" handleclick={this.handleInsertion} />
            </div>);
        }
    }
};

export default Admin;