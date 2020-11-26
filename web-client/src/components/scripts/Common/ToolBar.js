import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchFilter from './SearchFilter';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../../styles/Common/ToolBar.css';

class ToolBar extends Component {
    static propTypes = {
        size: PropTypes.string,
        buttonText: PropTypes.string,
        buttonOnClick: PropTypes.func,
        searchFilterOnChange: PropTypes.func,
        sortSelectors: PropTypes.array,
        onSortSelectorChange: PropTypes.func,
        enableSort: PropTypes.bool,
        enableSearchFilter: PropTypes.bool,
        enableButton: PropTypes.bool
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedSort: "None"
        }

        this._onDropdownSelect = this._onDropdownSelect.bind(this);
    }

    _onDropdownSelect(eventKey) {
        if (parseInt(eventKey) === 0) {
            this.setState( {selectedSort: "None"} );
        }
        else {
            var selector = this.props.sortSelectors.find(i => i.id === parseInt(eventKey));
            this.setState( {selectedSort: selector.name} );
        }
    }

    render() {
        var { buttonText, buttonOnClick, searchFilterOnChange, sortSelectors, size, enableSort, enableSearchFilter, enableButton } = this.props;
        var { selectedSort } = this.state;

        return (
            <div className={"toolbar " + (size ? size : "")}>
                {enableSearchFilter ? <SearchFilter size={size} onTextEntered={searchFilterOnChange} /> : <div />}
                {                
                    enableSort && (
                        <DropdownButton id="toolbar-filter" title={"Sort By: " + selectedSort}>
                            {
                                sortSelectors && sortSelectors.map(function(item) {
                                    return (<Dropdown.Item key={item.id} eventKey={item.id} onSelect={this._onDropdownSelect}>{item.name}</Dropdown.Item>);
                                }.bind(this))
                            }
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="0" onSelect={this._onDropdownSelect}>Clear</Dropdown.Item>
                        </DropdownButton>)
                }
                { enableButton ? <Button className="action-button" onClick={buttonOnClick}>{buttonText}</Button> : <div /> }
            </div>
        )
    }
}



export default ToolBar;