import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Box } from "@material-ui/core";
import { MyButton, Input } from "./appUtils";
import Admin from "./admin";
import Doctor from "./doctor";
import MedicalStore from "./medicalStore";
import Patient from "./patient";
import { authenticate } from "./MRS_Utils";

class Login extends Component {
    constructor() {
        super();
        this.state = { address: '', warning: '', chosenOption: 'Back' };
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginOption = this.handleLoginOption.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleChange(event, tmp) {
        this.setState({ address: event.target.value });
    }
    handleLoginOption(value) {
        this.setState({ address: '', warning: '', chosenOption: value });
    }
    async handleLogin() {
        var tmp = await authenticate(this.state.address, this.state.chosenOption);
        if (tmp) {
            if (this.state.chosenOption === "Admin") {
                ReactDOM.render(<Admin address={this.state.address} />, document.getElementById("root"));
            } else if (this.state.chosenOption === "Doctor") {
                ReactDOM.render(<Doctor address={this.state.address} />, document.getElementById("root"));
            } else if (this.state.chosenOption === "Patient") {
                ReactDOM.render(<Patient address={this.state.address} />, document.getElementById("root"));
            } else if (this.state.chosenOption === "Medical Store") {
                ReactDOM.render(<MedicalStore address={this.state.address} />, document.getElementById("root"));
            }
        } else {
            this.setState({ address: '', warning: 'The given address does not exist in records' });
        }
    }

    render() {
        if (this.state.chosenOption === "Back") {
            return (
                <div>
                    <Box m={10} />
                    <h4>Please Choose an option to Login</h4>
                    <MyButton val={3} text="Admin" text1="Admin" handleclick={this.handleLoginOption} />
                    <MyButton val={3} text="Doctor" text1="Doctor" handleclick={this.handleLoginOption} />
                    <MyButton val={3} text="Medical Store" text1="Medical Store" handleclick={this.handleLoginOption} />
                    <MyButton val={3} text="Patient" text1="Patient" handleclick={this.handleLoginOption} />
                </div>
            );
        } else {
            return (
                <div>
                    <Box m={10} />
                    Enter your address to Login into the system
                    <MyButton id1="rightAlign" val={1} text="Back" text1="Back" handleclick={this.handleLoginOption} />
                    <Input label="Enter Your Address" edited={this.handleChange} warning={this.state.warning} address={this.state.address} />
                    <MyButton val={3} text="Login" text1="Login" handleclick={this.handleLogin} />
                </div>
            );
        }
    }
}

export default Login;