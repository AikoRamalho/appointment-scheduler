import React, {Component} from 'react'
import logo from "./logo.svg"
import AppBar from "material-ui/AppBar";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import moment from "moment";
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import SelectedField from 'material-ui]/SelectedField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SnackBar from 'material-ui/Snackbar';
import Card from 'material-ui/Card';
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import axios from 'axios';

const API_BASE="http://localhost:8083/" //where our server is running

class AppointmentApp extends Component{
    constructor(props, context){
        super(props, context);

        this.state ={
            firstName: "",
            lastName: "",
            email: "",
            schedule: [],
            confirmationModalOpen: false,
            appointmentMeridiem: 0,
            validEmail: true,
            validPhone: true,
            finished: false,
            smallScreen: window.innerWidth<768,
            stepIndex: 0
        };
    }
    componentWillMount(){
        axios.get(API_BASE + 'api/retrieveSlots')
    }
}
export default AppointmentApp;