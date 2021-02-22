import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export class Todo extends React.Component {


    render() {
        return (
            <Card>
                <CardContent>
                <Typography>{this.props.text}</Typography>
                <Typography>{this.props.priority}</Typography>
                <Typography>{this.props.dueDate.format('DD-MM-YYYY')}</Typography>
                </CardContent>
            </Card>
        );
    }

}