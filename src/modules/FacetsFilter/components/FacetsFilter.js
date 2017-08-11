import React from 'react';
import './_FacetsFilter.scss';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {HelpIcon} from 'uqlibrary-react-toolbox';
import {locale} from 'config';

import {facetData} from '../mock/facetsData';

class FacetsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            facetsKeyword: '',
            facetListLinkClass: 'facetListLink'
        };
        this.handleKeywordClearClick = this.handleKeywordClearClick.bind(this);
        this.handleKeywordOnChange = this.handleKeywordOnChange.bind(this);
        this.handleFacetListLinkClick = this.handleFacetListLinkClick.bind(this);
    }

    handleKeywordOnChange(e) {
        const {value} = e.target;
        this.setState({
            facetsKeyword: value
        });
        console.log('Keywords : ' + this.state.facetsKeyword);
    }

    handleKeywordClearClick(e) {
        e.preventDefault();
        this.setState({
            facetsKeyword: ''
        });
    }

    handleFacetListLinkClick(e) {
        e.preventDefault();
        if (e.target.className.indexOf(' active') === -1) {
            e.target.className += ' active';
        } else {
            e.target.className = e.target.className.replace(' active', '');
        }
    }

    render() {
        const txt = locale.components.facetsFilter;

        // Make a list of allowed "aggregations" to render, as some aren't valid/needed
        const allowedAggregations = ['journal_name_t_ft', 'genre_type_t_ft', 'subject_mi_lookup_exact', 'display_type_i_lookup_exact', 'date_year_t', 'keywords_mft', 'author_mft', 'scopus_doc_type_t_lookup_exact', 'author_id_mi_lookup_exact', 'ismemberof_mt_lookup_exact', 'subtype_t_ft'];

// create an array of values using the allowedAggregations as a key to map data from thisData/facetData
        const aggregations = allowedAggregations.map(key => {
            // temp store all the allowed aggregation data
            const thisData = facetData.aggregations[key];
            // return the following data format to const aggregations
            return {
                aggregation: key, // The original key value for aggregations

                title: null, // Waiting on abckend to supply

                doc_count: thisData.sum_other_doc_count, // Pull the document count for this category/aggregate

                facets: thisData.buckets.map(item => { // Have to map facets info from buckets
                    return {
                        title: item.key, // Some of the aggregate data's titles etc appear to be lookups which have the same data - so just made allowedAggregations to filter them for now.
                        key: item.key,
                        doc_count: item.doc_count
                    };
                })
            };
        });

        console.log(aggregations);

        return (
            <div className="facetsFilter">
                <div className="columns is-gapless is-marginless is-paddingless">
                    <div className="column">
                        <h3 className="facetsTitle title is-5">{txt.title}</h3>
                    </div>
                    <div className="column is-narrow is-helpicon">
                        <HelpIcon
                            title={txt.help.title}
                            text={txt.help.text}
                            buttonLabel={txt.help.button}
                        />
                    </div>
                </div>
                <div className="facetsKeywordFilter columns is-gapless">
                    <div className="column">
                        <TextField
                            id="facetsKeywordInput"
                            className="facetsKeywordInput requiredField"
                            hintText={txt.keywordHintText}
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
                            <NavigationClose/>
                        </IconButton>
                    </div>
                </div>

                <div className="facetsList body-2">
                     {aggregations.map((item, index) => (
                         <div key={index}>
                             <h3 className="facetsCategoryTitle">{item.aggregation}</h3>
                             {item.facets.map((subitem, index) => (
                                 <div key={index} className="facetListItems" onClick={this.handleFacetListLinkClick} onKeyPress={this.handleFacetListLinkClick}>
                                     {subitem.title} <span>({subitem.doc_count})</span>
                                 </div>
                             ))}
                         </div>
                     ))}
                </div>
            </div>
        );
    }
}

export default FacetsFilter;
