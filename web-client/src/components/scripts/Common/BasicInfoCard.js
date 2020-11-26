import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/Common/BasicInfoCard.css';

class BasicInfoCard extends Component {
    static propTypes = {
        id: PropTypes.any,
        title: PropTypes.string,
        text: PropTypes.string,
        alignTitle: PropTypes.string,
        alignText: PropTypes.string,
        clickable: PropTypes.bool,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    }

    static defaultProps = {
        clickable: false,
        disabled: false
    }

    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);

    }

    _onClick() {
        var {id, clickable, disabled, onClick} = this.props;
        if (clickable && !disabled) {
            onClick(id);
        }
    }

    render() {
        var { title, text, alignTitle, alignText, clickable, disabled } = this.props;

        var titleAlignment = alignTitle ? alignTitle : "";
        var textAlignment = alignText ? alignText : "";
        var canClick = clickable ? "clickable" : "";
        var isDisabled = "";

        if (disabled) {
            canClick = "";
            isDisabled = "disabled";
        }

        return (
            <div className={"basic-info-card " + canClick + isDisabled} onClick={this._onClick}>
                <div className={"basic-info-card-text " + textAlignment}>{text}</div>
                <div className={"basic-info-card-title " + titleAlignment}>{title}</div>
            </div>
        )
    }
}

export default BasicInfoCard;