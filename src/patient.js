import React, { Component } from "react";
import { getPrescriptions } from "./MRS_Utils"
import { Box } from "@material-ui/core"
import { MyButton, MyList } from "./appUtils"

class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "Patient", presL: [] }
    }
    async componentDidMount() {
        const tmp = await getPrescriptions(this.props.address);
        this.setState({ presL: tmp });
    }
    render() {
        return (<div>
            <Box m={5} />
            <MyButton id1="rightAlign" val={1} text="Back" text1="Main" handleclick={this.handleChoice} />
            <h4>Logged in as {this.state.name}</h4><br /><br />
            <h4>Following is the list of Prescriptions Given:</h4>
            <MyList values={this.state.presL} />
        </div>);
    }
};

export default Patient;