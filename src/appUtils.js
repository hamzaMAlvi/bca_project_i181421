import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Box, Button, TextField, List, ListItem, ListItemText, Grid } from "@material-ui/core";
import Login from "./Login";
import "./AppStyles.css"

export class Header extends Component {
    render() {
        return (
            <Box m={5}>
                <h1>Medical Records Maintenance</h1>
                <h3>Hamza Mustafa Alvi (i18-1421)</h3>
            </Box>
        );
    }
}

export class Input extends Component {
    render() {
        return (
            <Box className='apptitle' m={1}>
                <TextField variant='outlined' label={this.props.label} value={this.props.address} onChange={(e) => this.props.edited(e, this.props.s_var)} size='small' style={{ width: 600 }} />
                <br />
                <label>{this.props.warning}</label>
            </Box>
        );
    }
}

export class MyList extends Component {
    render() {
        const items = this.props.values;
        const itemsList = items.map((c) =>
            <ListItem> <ListItemText primary={c} /> </ListItem>
        );
        return (
            <Grid container justify="center">
                <List>{itemsList}</List>
            </Grid>
        );
    }
}

export class MyButton extends Component {
    render() {
        return (
            <Box className={this.props.id1} m={this.props.val}>
                <Button variant="outlined" color='primary' onClick={() => this.props.handleclick(this.props.text1)}>
                    {this.props.text}
                </Button>
            </Box>
        );
    }
}

export class LogoutButton extends Component {
    logout = () => {
        ReactDOM.render(<Login />, document.getElementById("root"));
    };
    render() {
        return (
            <Box className='rightAlign' m={1}>
                <Button variant="outlined" color='secondary' onClick={this.logout}>
                    Logout
          </Button>
            </Box>
        );
    }
}
