import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Common/SearchFilter.css';


class SearchFilter extends Component {
    static propTypes = {
        onTextEntered: PropTypes.func,
        onSubmit: PropTypes.func,
        size: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }

        this._onChange = this._onChange.bind(this);

    }

    _onChange(e) {
        var onTextEntered = this.props.onTextEntered;
        this.setState( {text: e.target.value });
        onTextEntered(e.target.value);
    }

    render() {
        return (
            <div className={"search-filter " + (this.props.size ? this.props.size : "")}>
                <InputGroup size="sm">
                    <FormControl placeholder="Filter..." aria-label="Filter..." onChange={this._onChange} value={this.state.text}></FormControl>
                    <InputGroup.Append>
                        <Button variant="secondary">
                            <FontAwesomeIcon icon="search"></FontAwesomeIcon>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}



export default SearchFilter;