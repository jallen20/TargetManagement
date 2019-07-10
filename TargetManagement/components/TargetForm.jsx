﻿import React, { Component } from 'react';
import TargetListView from './TargetListView.jsx';
import Target from './../models/Target.js';
import TargetList from './../models/TargetList.js';
import NewTargetView from './NewTargetView.jsx';
import TargetController from './../controllers/TargetController.js';
import Utils from './../utils/Utils.js';
import HighPriorityListView from './HighPriorityListView.jsx';
import Priority from '../models/Priority.js';

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
                _controller.add(container.querySelector('#prop0').value, container.querySelector('#prop2').value, container.querySelector('#prop1').value);
                this.setState({ controller: _controller });
                this.highs.state.update.call(this.highs, _controller.targets);
            },

            edit: (e, id, target_) => {
                e.preventDefault();
                this.state.controller.edit(id, target_);
                this.setState({ controller: this.state.controller });
                this.tListView.state.update.call(this.tListView);
                this.highs.state.update.call(this.highs, this.state.controller.targets);
            },

            delete: (id) => {
                this.state.controller.delete(parseInt(id));
                this.setState({ controller: this.state.controller });
                this.setState({ selectedTarget: null });
                this.tListView.state.update.call(this.tListView);
                this.highs.state.update.call(this.highs, this.state.controller.targets);
            }
        };
    }

    onNewTarget(e) {
        e.preventDefault();
        this._view.state.show.call(this._view);
    }

    onEdit(target_) {
        if (target_) this._view.state.show(target_);
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

    onSearch(text) {
        let list = new TargetList(this.state.controller.search(text));
        this.tListView.state.updateTargets.call(this.tListView, list.targets);
        this.tListView.state.update.call(this.tListView);
    }

    render() {
        var self = this;
        let targetProps = ['ID', 'Name', 'Description', 'Priority'];
        let inputs = [];
        for (let i = 0; i < targetProps.length; i++) {
            try {
                var div = (<div className="inputs">
                    <small>{targetProps[i]}</small>
                    <label id={`side-prop${i}`} className={i === 2 ? "description" : "label-item"}>
                        <span className="target-label" >{this.state.selectedTarget
                            ? this.state.selectedTarget[targetProps[i].toLocaleLowerCase()].value || this.state.selectedTarget[targetProps[i].toLocaleLowerCase()]
                            : this.defaultText}
                        </span>
                    </label>
                </div>);
            }

            catch {
                div = (<div className="inputs">
                    <small>{targetProps[i]}</small>
                    <label id={`side-prop${i}`} className={i === 2 ? "description" : "label-item"} >
                        <span className="target-label" >{this.state.selectedTarget
                            ? this.state.selectedTarget[targetProps[i].toLocaleLowerCase()]
                            : this.defaultText}
                        </span>
                    </label>
                </div>);
            }
            finally {
                inputs.push(div);
            }
        }


        let form = (<form id="target-form" ref={(el) => self._form = el}>
            <div id="priority-container">

                <h2>High Priority</h2>
                <div id="high-priority-container">
                    <HighPriorityListView ref={(el) => self.highs = el} Targets={this.state.controller.targets.filter(target => target.priority === Priority.High)} />
                </div>
            </div>

            <div id="targets-container" onClick={this.onSelect.bind(this)}>
                <TargetListView Targets={this.state.controller.targets} ref={(el) => self.tListView = el} Parent={this} />
            </div>

            <div id="text-inputs">
                <input type="text" id="search" onChange={e => this.onSearch(e.target.value)} placeholder="search" />
                {inputs}
                <button onClick={(e) => { e.preventDefault(); this.onEdit(this.state.selectedTarget) }} className="edit-button">Edit</button>
                <button onClick={this.onNewTarget.bind(this)} className="add-button">Add</button>
            </div>


            <NewTargetView ref={(el_) => self._view = el_} Parent={this} targets={this.state.controller.targets} />
        </form>
        );

        return form;
    }
}