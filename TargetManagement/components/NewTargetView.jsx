import React, { Component } from 'react';
import Target from './../models/Target.js';
import TargetList from './../models/TargetList.js';
import TargetController from './../controllers/TargetController.js';

class NewTargetView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: () => {
                this.overlay.style.transform = 'scale(1)';
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

    render() {
        let targetProps = ['Name', 'Date', 'Description', 'Priority'];
        let form = [];
        for (let i = 0; i < targetProps.length; i++) {
            form.push(<label>
                {targetProps[i]}
                <input type="text" id={`prop${i}`} className="new-target-input" />
            </label>)
        }

        return (
            <div ref={(el) => this.overlay = el} id="target-overlay">

                <div id="new-target-container">
                    <h2>New Target</h2>
                    {form}
                    <button type="submit" onClick={this.onAdd.bind(this)}>Add</button>
                </div>

            </div>
        );
    }
}

export default NewTargetView;