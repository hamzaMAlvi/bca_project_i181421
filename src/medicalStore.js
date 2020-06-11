import React, { Component } from "react";

class MedicalStore extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "Medical Store" }
    }
    render() {
        return (<div>
            {this.state.name}
        </div>);
    }
};

export default MedicalStore;