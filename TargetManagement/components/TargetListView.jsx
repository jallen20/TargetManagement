import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TargetList from '../models/TargetList.js';
import Priority from '../models/Priority.js';
import Utils from '../utils/Utils.js';
import OptionsFlyout from './OptionsFlyout.jsx';

class TargetListView extends Component {
    constructor(props) {
        super(props);
    }

    onMenu(e) {
        let container = document.createElement("div");
        container.id = "flyout-container";
        container.open = true;
        ReactDOM.render(<OptionsFlyout X={e.clientX} Y={e.clientY} />, container);
        document.body.appendChild(container);
        setTimeout(() => window.flyoutOpen = true, 2000);
    }

    render() {
        let targets = [...this.props.Targets].map(target => {
            return (
                <tr>
                    <td>{target.id.value}</td>
                    <td>{target.name}</td>
                    <td>{target.description}</td>
                    <td>{Utils.getPriorityText(target.priority)}</td>
                    <td onClick={this.onMenu.bind(this)}><div className="menu"><div className="menu-dot"/><div className="menu-dot"/><div className="menu-dot"/></div></td>
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