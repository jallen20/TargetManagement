import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TargetList from '../models/TargetList.js';
import Priority from '../models/Priority.js';

class TargetListView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            controller: this.props.Controller
        };
    }

    getPriorityText(priority)
        {
            let result = null;
            switch (priority) {
                case Priority.High:
                    result = "High";
                    break;
                case Priority.Med:
                    result = "Medium";
                    break;
                case Priority.Low:
                    result = "Low";
                    break;
            }
            return result;
        }

        render() {
            let targets = [...this.state.controller.targets].map(target => {
                return (
                    <tr>
                        <td>{target.id.value}</td>
                        <td>{target.name}</td>
                        <td>{target.description}</td>
                        <td>{this.getPriorityText(target.priority)}</td>
                    </tr>
                    );
            });

            let header = (
                <tr className='table-header'>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Priority</td>
                </tr>
            );

            return (
                <table className="table">
                    {header}
                    {targets}
                </table>
            );

        }
   
}

export default TargetListView;