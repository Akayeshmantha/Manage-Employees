import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import {connect} from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {employeeUpdate, employeeCreate} from '../actions';
import EmployeeForm from './EmployeeForm';
class EmployeeCreate extends Component {
    onButtonPress() {
        const {name , phone , shift} = this.props;
        this.props.employeeCreate({name , phone , shift: shift || 'Monday' });
    }

    render() {
        console.log(this.props.employee);
        return (
            <Card>
                <EmployeeForm {...this.props}/>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}



const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;
    
    return {name , phone , shift};     
}; 

export default connect(mapStateToProps , {employeeUpdate, employeeCreate})(EmployeeCreate);