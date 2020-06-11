import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { LogoutButton, MyButton, Input, MyList } from "./appUtils";
import { getDoctor, addPatient, addPrescription, addMedicalReport, addMedicalCertificate, getMedReportsPrescriptions } from "./MRS_Utils";

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", option: "Main", addr: "",
            pName: "", pAge: 0, pWeight: 0, pHeight: 0, pHabits: "", pMeds: '', pUsage: '', pComments: '',
            mrHIV: '', mrTB: '', mrBP: '', mrMalaria: '', mcCM: '', mcMC: '', mcMP: '', mcPD: '', presL: []
        }
        this.handleChoice = this.handleChoice.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInsertion = this.handleInsertion.bind(this);
    }
    async componentDidMount() {
        const name = await getDoctor(this.props.address);
        this.setState({ name: name });
    }

    async handleChoice(val) {
        if (val === "pmr") {
            const tmp = await getMedReportsPrescriptions(this.props.address);
            this.setState({ presL: tmp });
        }
        this.setState({
            option: val, addr: "", pName: "", pAge: 0, pWeight: 0, pHeight: 0, pHabits: "",
            pMeds: '', pUsage: '', pComments: '', mrHIV: '', mrTB: '', mrBP: '', mrMalaria: '',
            mcCM: '', mcMC: '', mcMP: '', mcPD: ''
        });
    }
    handleChange(event, s_var) {
        if (s_var === "addr") {
            this.setState({ addr: event.target.value })
        } else if (s_var === "pName") {
            this.setState({ pName: event.target.value })
        } else if (s_var === "pAge") {
            this.setState({ pAge: event.target.value * 1 })
        } else if (s_var === "pWeight") {
            this.setState({ pWeight: event.target.value * 1 })
        } else if (s_var === "pHeight") {
            this.setState({ pHeight: event.target.value * 1 })
        } else if (s_var === "pHabits") {
            this.setState({ pHabits: event.target.value })
        } else if (s_var === "pMeds") {
            this.setState({ pMeds: event.target.value })
        } else if (s_var === "pUsage") {
            this.setState({ pUsage: event.target.value })
        } else if (s_var === "pComments") {
            this.setState({ pComments: event.target.value })
        } else if (s_var === "mrHIV") {
            this.setState({ mrHIV: event.target.value })
        } else if (s_var === "mrBP") {
            this.setState({ mrBP: event.target.value })
        } else if (s_var === "mrTB") {
            this.setState({ mrTB: event.target.value })
        } else if (s_var === "mrMalaria") {
            this.setState({ mrMalaria: event.target.value })
        } else if (s_var === "mcMP") {
            this.setState({ mcMP: event.target.value })
        } else if (s_var === "mcCM") {
            this.setState({ mcCM: event.target.value })
        } else if (s_var === "mcPD") {
            this.setState({ mcPD: event.target.value })
        } else if (s_var === "mcMC") {
            this.setState({ mcMC: event.target.value })
        }
    }

    async handleInsertion(val) {
        var tmp = false;
        if (val === "P") {
            tmp = await addPatient(this.props.address, this.state.addr, this.state.pName, this.state.pAge, this.state.pWeight, this.state.pHeight, this.state.pHabits);
        } else if (val === "Pre") {
            tmp = await addPrescription(this.props.address, this.state.addr, this.state.pMeds, this.state.pUsage, this.state.pComments);
        } else if (val === "MR") {
            tmp = await addMedicalReport(this.props.address, this.state.addr, this.state.mrHIV, this.state.mrTB, this.state.mrBP, this.state.mrMalaria, this.state.pComments);
        } else if (val === "MC") {
            tmp = await addMedicalCertificate(this.props.address, this.state.addr, this.state.mcMP, this.state.mcCM, this.state.mcPD, this.state.mcMC, this.state.pComments);
        }
        if (tmp) {
            this.setState({
                option: "Main", addr: "", pName: "", pAge: 0, pWeight: 0, pHeight: 0,
                pHabits: "", pMeds: '', pUsage: '', pComments: '', mrHIV: '', mrTB: '',
                mrBP: '', mrMalaria: '', mcCM: '', mcMC: '', mcMP: '', mcPD: ''
            });
        } else {
            this.setState({ warning: "Please check whether the given address and information is correct" });
        }
    }

    render() {
        if (this.state.option === "Main") {
            return (<div>
                <Box m={5} />
                <LogoutButton />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                <MyButton val={1} text="New Patient" text1="patient" handleclick={this.handleChoice} />
                <MyButton val={1} text="Write a Prescription" text1="prescription" handleclick={this.handleChoice} />
                <MyButton val={1} text="Add Medical Report" text1="medrep" handleclick={this.handleChoice} />
                <MyButton val={1} text="Write Medical Certificate" text1="medcert" handleclick={this.handleChoice} />
                <MyButton val={1} text="See Written Prescriptions & Medical Reports" text1="pmr" handleclick={this.handleChoice} />
            </div>);
        } else if (this.state.option === "patient") {
            return (<div>
                <Box m={5} />
                <MyButton id1="rightAlign" val={1} text="Back" text1="Main" handleclick={this.handleChoice} />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                <Input label="Address for Patient" edited={this.handleChange} address={this.state.addr} s_var="addr" />
                <Input label="Name of Patient" edited={this.handleChange} address={this.state.pName} s_var="pName" />
                <Input label="Age of Patient" edited={this.handleChange} address={this.state.pAge} s_var="pAge" />
                <Input label="Weight of Patient" edited={this.handleChange} address={this.state.pWeight} s_var="pWeight" />
                <Input label="Height of Patient" edited={this.handleChange} address={this.state.pHeight} s_var="pHeight" />
                <Input label="Habits of Patient" edited={this.handleChange} warning={this.state.warning} address={this.state.pHabits} s_var="pHabits" />
                <MyButton val={3} text="Add Patient" text1="P" handleclick={this.handleInsertion} />
            </div>);
        } else if (this.state.option === "prescription") {
            return (<div>
                <Box m={5} />
                <MyButton id1="rightAlign" val={1} text="Back" text1="Main" handleclick={this.handleChoice} />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                <Input label="Patient's Address" edited={this.handleChange} address={this.state.addr} s_var="addr" />
                <Input label="Medicines" edited={this.handleChange} address={this.state.pMeds} s_var="pMeds" />
                <Input label="Medicine Usage" edited={this.handleChange} address={this.state.pUsage} s_var="pUsage" />
                <Input label="Comments" edited={this.handleChange} warning={this.state.warning} address={this.state.pComments} s_var="pComments" />
                <MyButton val={3} text="Add Prescription" text1="Pre" handleclick={this.handleInsertion} />
            </div>);
        } else if (this.state.option === "medrep") {
            return (<div>
                <Box m={5} />
                <MyButton id1="rightAlign" val={1} text="Back" text1="Main" handleclick={this.handleChoice} />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                <Input label="Patient's Address" edited={this.handleChange} address={this.state.addr} s_var="addr" />
                <Input label="HIV Test" edited={this.handleChange} address={this.state.mrHIV} s_var="mrHIV" />
                <Input label="TB Test" edited={this.handleChange} address={this.state.mrTB} s_var="mrTB" />
                <Input label="Blood Pressure" edited={this.handleChange} address={this.state.mrBP} s_var="mrBP" />
                <Input label="Malaria" edited={this.handleChange} address={this.state.mrMalaria} s_var="mrMalaria" />
                <Input label="Comments" edited={this.handleChange} warning={this.state.warning} address={this.state.pComments} s_var="pComments" />
                <MyButton val={3} text="Add Medical Report" text1="MR" handleclick={this.handleInsertion} />
            </div>);
        } else if (this.state.option === "medcert") {
            return (<div>
                <Box m={5} />
                <MyButton id1="rightAlign" val={1} text="Back" text1="Main" handleclick={this.handleChoice} />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                <Input label="Patient's Address" edited={this.handleChange} address={this.state.addr} s_var="addr" />
                <Input label="Medical Problems" edited={this.handleChange} address={this.state.mcMp} s_var="mcMP" />
                <Input label="Current Medications" edited={this.handleChange} address={this.state.mcCM} s_var="mcCM" />
                <Input label="Physical Disability" edited={this.handleChange} address={this.state.mcPD} s_var="mcPD" />
                <Input label="Mental Condition" edited={this.handleChange} address={this.state.mcMC} s_var="mcMC" />
                <Input label="Comments" edited={this.handleChange} warning={this.state.warning} address={this.state.pComments} s_var="pComments" />
                <MyButton val={3} text="Add Medical Certificate" text1="MC" handleclick={this.handleInsertion} />
            </div>);
        } else if (this.state.option === "pmr") {
            return (<div>
                <Box m={5} />
                <MyButton id1="rightAlign" val={1} text="Back" text1="Main" handleclick={this.handleChoice} />
                <h4>Logged in as {this.state.name}</h4><br /><br />
                <h4>Following is the list of Prescriptions Written:</h4>
                <MyList values={this.state.presL} />
            </div>);
        }
    }
};

export default Doctor;