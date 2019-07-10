import React, {Component} from 'react';


class OptionsFlyout extends Component {
    constructor(props) {
        super(props);
    }

    onDelete(id) {
        let parent = this.props.Parent;
        parent.state.delete.call(this.props.Parent, id);
    }

    render(e) {
        let css = {
            position:"absolute",
            left:`${this.props.X}px`,
            top: `${this.props.Y}px`
        };
        return (
            <div className="options" style={css}>
                <div className="flyout-option" onClick={this.onDelete.bind(this, this.props.TargetID)}>Delete</div>
            </div>
        )
    }
}

export default OptionsFlyout;