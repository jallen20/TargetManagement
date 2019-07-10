import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Utils from '../utils/Utils.js';
import OptionsFlyout from './OptionsFlyout.jsx';

class TargetListView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            update: () => this.forceUpdate(),
            targets: this.props.Targets,
            updateTargets: (targets_) => {
                this.setState({targets: targets_});
            }
        };
    }

    findParentRow(element) {
        while(element.tagName !== 'TR') {
            element = element.parentElement;
        }
        return element;
    }

    onMenu(e) {
        let row = this.findParentRow(e.target.parentElement);
        let container = document.createElement("div");
        container.id = "flyout-container";
        ReactDOM.render(<OptionsFlyout X={e.clientX} Y={e.clientY} Parent={this.props.Parent} TargetID={row.cells[0].innerText}/>, container);
        document.body.appendChild(container);
        setTimeout(() => window.flyoutOpen = true, 500);
    }

    render() {
        let targets = [...this.state.targets].map(target => {
            return (
                <tr>
                    <td>{target.id.value}</td>
                    <td>{target.name}</td>
                    <td>{target.description}</td>
                    <td>{Utils.getPriorityText(target.priority)}</td>
                    <td onClick={this.onMenu.bind(this)}><div className="menu"><div className="menu-dot" /><div className="menu-dot" /><div className="menu-dot" /></div></td>
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