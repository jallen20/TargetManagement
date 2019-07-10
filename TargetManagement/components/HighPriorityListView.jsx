import React, { Component } from 'react';
import Utils from './../utils/Utils.js';
import Priority from '../models/Priority.js';

class HighPriorityListView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            targets: this.props.Targets,
            update: (targets_) => this.setState({targets: targets_})
        };
    }

    render() {
        let targets = [...this.state.targets.filter(target_ => target_.priority === Priority.High)].map(target => {
            return (
                <div className="high-priority-item">
                    <h3>{target.name}</h3>
                    <h4>{`Priority: ${Utils.getPriorityText(target.priority)}`}</h4>
                </div>
            )
        });

        return targets;
    }

}

export default HighPriorityListView;