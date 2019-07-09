import React, { Component } from 'react';
import TargetListView from './TargetListView.jsx';
import Target from './../models/Target.js';
import TargetList from './../models/TargetList.js';
import NewTargetView from './NewTargetView.jsx';
import TargetController from './../controllers/TargetController.js';
import Utils from './../utils/Utils.js';

export default class TargetForm extends Component {
    constructor(props) {
        super(props);
        this.defaultText = '---';

        this.state = {
            selectedTarget: null,
            controller: this.props.Controller,
            add: (e) => {
                e.preventDefault();
                let container = document.getElementById("new-target-container");
                let list = new TargetList(this.state.controller.targets);
                let _controller = new TargetController(list);
                _controller.add(container.querySelector('#prop0').value, container.querySelector('#prop2').value, container.querySelector('#prop3').value);
                this.setState({ controller: _controller });
            }
        };
    }

    onNewTarget() {
        this._view.state.show.call(this._view);
    }

    onSelect(e) {
        let row = e.target.parentElement;
        if (row.tagName !== 'TR') return;
        if (row === document.querySelector("table").firstChild) return;
        let id = row.cells[0].innerText;
        let name = row.cells[1].innerText;
        let description = row.cells[2].innerText;
        let priority = row.cells[3].innerText;
        let target = new Target(id, name, description, Utils.getPriorityFromText(priority));
        this.setState({ selectedTarget: target });
    }

    render() {
        let targetProps = ['ID', 'Name', 'Date', 'Description', 'Priority'];
        let inputs = [];
        for (let i = 0; i < targetProps.length; i++) {
            try {
                var div = (<div className="inputs">
                    <small>{targetProps[i]}</small>
                    <input type="text" id={`${i}_`} value={this.state.selectedTarget
                        ? this.state.selectedTarget[targetProps[i].toLocaleLowerCase()].value || this.state.selectedTarget[targetProps[i].toLocaleLowerCase()]
                        : this.defaultText} />
                </div>);
            }
            catch {
                div = (<div className="inputs">
                    <small>{targetProps[i]}</small>
                    <input type="text" id={`${i}_`} value={this.state.selectedTarget
                        ? this.state.selectedTarget[targetProps[i].toLocaleLowerCase()]
                        : this.defaultText} />
                </div>);
            }
            finally {
                inputs.push(div);
            }
        }

        var self = this;
        let form = (<form id="target-form" ref={(el) => self._form = el}>
            <div id="targets-container" onClick={this.onSelect.bind(this)}>
                <TargetListView Targets={this.state.controller.targets} />
            </div>

            <div id="text-inputs">
                {inputs}
                <div onClick={this.onNewTarget.bind(this)}>Add</div>
            </div>

            <NewTargetView ref={(el_) => self._view = el_} Parent={this} targets={this.state.controller.targets} />
        </form>
        );

        return form;
    }
}