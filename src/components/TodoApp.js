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
import { MyDrawer } from './Drawer'

export class TodoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [], text: '', priority: 0, dueDate: moment()};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }


    render() {

        return (
            <Box className="TodoApp">
                <MyDrawer handleLogOut={this.handleLogOut}/>
                <form onSubmit={this.handleSubmit} className="todo-form">
                <Card>
                    <CardContent>
                    <h3>New TODO</h3>
                    <label htmlFor="text" className="right-margin">
                        Text:
                    </label>

                    <Input
                        id="text"
                        onChange={this.handleTextChange}
                        value={this.state.text}>
                    </Input>

                    <br/>
                    <br/>
                    <label htmlFor="priority" className="right-margin">
                        Priority:
                    </label>

                    <Input
                        id="priority"
                        type="number"
                        onChange={this.handlePriorityChange}
                        value={this.state.priority}>
                    </Input>
                    <br/>
                    <br/>
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        id="due-date"
                        selected={this.state.dueDate}
                        onChange={this.handleDateChange}>
                    </DatePicker>
                    </MuiPickersUtilsProvider>

                    <br/>
                    <Button  type='submit'>
                        Add #{this.state.items.length + 1}
                    </Button>
                    </CardContent>
                </Card>
                </form>
                <br/>
                <br/>
                <TodoList todoList={this.state.items}/>
            </Box>
        );
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate){
            return;
        }

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: moment()
        }));
    }

    handleLogOut(){
        localStorage.isLoggedIn = "false";
        this.props.handleChangeIsLoggedOut();
    }

}
