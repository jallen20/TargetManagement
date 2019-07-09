import React, {Component} from 'react';


class OptionsFlyout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let css = {
            position:"absolute",
            left:`${this.props.X}px`,
            top: `${this.props.Y}px`
        };
        return (
            <div className="options" style={css}>
                <div className="flyout-option">Edit</div>
                <div className="flyout-option">Delete</div>
            </div>
        )
    }
}

export default OptionsFlyout;