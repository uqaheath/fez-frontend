import React from 'react';
import './_FacetsFilter.scss';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import {facetsList as facetsList} from '../mock/facetsData';

class FacetsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            facetsKeyword: ''
        };
        this.handleKeywordClearClick = this.handleKeywordClearClick.bind(this);
        this.handleKeywordOnChange = this.handleKeywordOnChange.bind(this);
    }

    handleKeywordOnChange(e) {
        const {value} = e.target;
        this.setState({
            facetsKeyword: value
        });
    }

    handleKeywordClearClick(e) {
        e.preventDefault();
        this.setState({
            facetsKeyword: ''
        });
    }

    render() {
        return (
            <div className="facetsFilter">
                <h3 className="facetsTitle title is-5">Refine results</h3>
                <div className="facetsKeywordFilter columns is-gapless">
                    <div className="column">
                        <TextField
                            id="facetsKeywordInput"
                            className="facetsKeywordInput"
                            hintText="Keyword filter"
                            onChange={this.handleKeywordOnChange}
                            value={this.state.facetsKeyword}
                        />
                    </div>
                    <div className="column is-narrow">
                        <IconButton
                            className="facetsClearButton"
                            tooltip="Clear filter"
                            onClick={this.handleKeywordClearClick}
                        >
                            <NavigationClose />
                        </IconButton>
                    </div>
                </div>

                <div className="facetsList body-2">
                    {facetsList.map((item, index) => (
                        <div>
                            <h3 key={index} className="facetsCategoryTitle">{item.category}</h3>
                            <div className="facetListItems">
                                {item.facets.map((subitem) => (
                                    <div>{subitem}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default FacetsFilter;
