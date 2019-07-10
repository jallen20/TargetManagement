import React, { Component } from 'react';
import Target from './../models/Target.js';

class NewTargetView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            show: (target_) => {
                this.overlay.style.transform = 'scale(1)';
                if (target_) {
                    this.setState({ editMode: true });
                    document.querySelector('#prop0').value = target_.name;
                    document.querySelector('#prop2').value = target_.description;
                    document.querySelector('#prop1').value = target_.priority;
                    document.querySelector('#idV').innerText = target_.id.value;
                }
            },
            hide: () => {
                this.overlay.style.transform = 'scale(0)';
            }
        };
    }

    onAdd(e) {
        this.state.hide();
        this.props.Parent.state.add.call(this.props.Parent, e);
    }

    onEdit(e) {
        e.preventDefault();
        this.state.hide();
        let parent = this.props.Parent;
        this.props.Parent.state.edit.call(parent, e, document.querySelector('#idV').innerText - 0, new Target(document.querySelector('#idV').innerText - 0, document.querySelector('#prop0').value, document.querySelector('#prop2').value, document.querySelector('#prop1').value));
        setTimeout(() => this.setState({ editMode: false }), 2000);
    }

    render() {
        let targetProps = ['Name', 'Priority','Description'];
        let form = [];
        for (let i = 0; i < targetProps.length; i++) {
            form.push(<label >
                <span>{targetProps[i]}</span>
                <input type="text" id={`prop${i}`} className={i === 2 ? "new-target-input nt-description" : "new-target-input norm"}/>
            </label>)
        }

        let button = this.state.editMode ? <button type="submit" className="action-button" onClick={this.onEdit.bind(this)}>Done</button> :
            <button type="submit" className="action-button" onClick={this.onAdd.bind(this)}>Done</button>

        return (
            <div ref={(el) => this.overlay = el} id="target-overlay">

                <div id="new-target-container">
                    <h2>Target</h2>
                    <div id="value-container">
                        {form}
                    </div>
                    {button}
                    <span style={{ display: "none" }} id={`idV`} />
                </div>
            </div>
        );
    }
}

export default NewTargetView;