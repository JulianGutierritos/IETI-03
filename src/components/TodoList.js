import React from 'react';
import {Todo} from './Todo';
import Box from '@material-ui/core/Box';

export class TodoList extends React.Component {


    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} text={todo.text} priority={todo.priority} dueDate={todo.dueDate}/>
            );
        });

        return (

            <Box component="span" display="block" p={1} m={1} >
                {todoList}
            </Box>
            
          
        );


    }

}
