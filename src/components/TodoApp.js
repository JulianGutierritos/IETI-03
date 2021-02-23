import React, {Component} from 'react';
import './TodoApp.css';
import {TodoList} from "./TodoList";
import moment from "moment";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import  DateFnsUtils  from "@date-io/date-fns";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { MyDrawer } from './Drawer';
import Todos from './Data';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export class TodoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {items: Todos, description: '', status: "In Progress", dueDate: moment(), responsibleName: '', responsibleEmail : '', hiddenForm : true};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleChangeHiddenForm = this.handleChangeHiddenForm.bind(this);
        this.handleResponsibleNameChange = this.handleResponsibleNameChange.bind(this);
        this.handleResponsibleEmailChange = this.handleResponsibleEmailChange.bind(this);
    }


    render() {

        return (
            <Box className="TodoApp">
                <MyDrawer handleLogOut={this.handleLogOut}/>
                <form onSubmit={this.handleSubmit} className="todo-form" hidden={this.state.hiddenForm}>
                <Card>
                    <CardContent>
                    <h3>New TODO</h3>
                    <label htmlFor="description" className="right-margin">
                        Description:
                    </label>

                    <Input
                        id="Description"
                        onChange={this.handleDescriptionChange}
                        value={this.state.description}>
                    </Input>

                    <br/>
                    <br/>
                    <label htmlFor="status" className="right-margin">
                        Status:
                    </label>

                    <Select
                        id="status"
                        type="string"
                        onChange={this.handleStatusChange}
                        value={this.state.status}>
                        
                        <MenuItem value={"In Progress"}>In Proggress</MenuItem>
                        <MenuItem value={"Ready"}>Ready</MenuItem>
                    </Select>

                    <br/>
                    <br/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        id="due-date"
                        value={this.state.dueDate}
                        onChange={this.handleDateChange}>
                    </DatePicker>
                    </MuiPickersUtilsProvider>

                    <h3>Responsible</h3>

                    <label htmlFor="description" className="right-margin">
                        Name:
                    </label>

                    <Input
                        id="ResponsibleName"
                        onChange={this.handleResponsibleNameChange}
                        value={this.state.responsibleName}>
                    </Input>

                    <br/>
                    <br/>

                    <label htmlFor="email" className="right-margin">
                        Email:
                    </label>

                    <Input
                        id="ResponsibleEmail"
                        autoComplete="email" 
                        autoFocus
                        onChange={this.handleResponsibleEmailChange}
                        value={this.state.responsibleEmail}>
                    </Input>

                    <br/>
                    <Button  type='submit'>
                        Add #{this.state.items.length + 1}
                    </Button>
                    </CardContent>
                </Card>
                </form>
                <br/>
                <br/>
                <div hidden={!this.state.hiddenForm}>
                <Typography variant="h2" >TODOS</Typography>
                <TodoList todoList={this.state.items}/>
                </div>
                <IconButton style={{position:'fixed', left:'90%', top:'90%'}} onClick={() => { this.handleChangeHiddenForm() }}>
                    { this.state.hiddenForm  
                    ? <AddBoxIcon style={{color:'green', fontSize:'50px'}}>
                    </AddBoxIcon>
                    : <VisibilityIcon style={{color:'green', fontSize:'50px'}}>
                    </VisibilityIcon> }
                </IconButton>
            </Box>
        );
    }

    handleResponsibleEmailChange(e){
        this.setState({
            responsibleEmail : e.target.value
        });
    }

    handleResponsibleNameChange(e){
        this.setState({
            responsibleName : e.target.value
        });
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            dueDate: moment ( e )
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.description.length || !this.state.status.length || !this.state.dueDate || !this.state.responsibleEmail || !this.state.responsibleName){
            console.log(this.state);
            return;
        }

        const newItem = {
            description: this.state.description,
            status: this.state.status,
            dueDate: this.state.dueDate,
            responsible : {email : this.state.responsibleEmail, name : this.state.responsibleName}
        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            description: '',
            status: "In Progress",
            dueDate: moment(),
            responsibleEmail : '',
            responsibleName : '',
            hiddenForm : true
        }));
    }

    handleLogOut(){
        localStorage.isLoggedIn = "false";
        this.props.handleChangeIsLoggedOut();
    }

    handleChangeHiddenForm(){
        if (this.state.hiddenForm){
            this.setState({
                hiddenForm : false,
            });
        }
        else{
            this.setState({
                hiddenForm : true,
                description: '',
                status: "In Progress",
                dueDate: moment(),
                responsibleEmail : '',
                responsibleName : ''
            });
        }
    }

}
