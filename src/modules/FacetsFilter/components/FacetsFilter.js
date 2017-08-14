import React from 'react';
import './_FacetsFilter.scss';
import {HelpIcon} from 'uqlibrary-react-toolbox';
import {locale} from 'config';

import {facetData} from '../mock/facetsData';

class FacetsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleActiveLinkClick = this.handleActiveLinkClick.bind(this);
        this.handleActiveCategoryClick = this.handleActiveCategoryClick.bind(this);
    }

    handleActiveLinkClick(e) {
        e.preventDefault();
        if (e.target.className.indexOf(' active') === -1) {
            e.target.className += ' active';
        } else {
            e.target.className = e.target.className.replace(' active', '');
        }
    }
    handleActiveCategoryClick(e) {
        e.preventDefault();
        if (e.target.nextSibling.className.indexOf(' active') === -1) {
            e.target.nextSibling.className += ' active';
        } else {
            e.target.nextSibling.className = e.target.nextSibling.className.replace(' active', '');
        }
    }

    // TODO: A clear all facets button?

    render() {
        const txt = locale.components.facetsFilter;

        const aggregations = Object.keys(facetData.aggregations).map(key => {
            const thisData = facetData.aggregations[key];
            return {
                aggregation: key,
                title: thisData.display_name,
                doc_count: thisData.sum_other_doc_count,
                facets: thisData.buckets.map(item => {
                    return {
                        title: item.title,
                        key: item.key,
                        doc_count: item.doc_count
                    };
                })
            };
        }).sort((a, b) => {
            return a.doc_count > b.doc_count ? -1 : 1;
        });

        return (
            <div className="facetsFilter">
                <div className="columns is-gapless is-marginless is-paddingless facetsTitle">
                    <div className="column">
                        <h3 className="title is-5">{txt.title}</h3>
                    </div>
                    <div className="column is-narrow is-helpicon">
                        <HelpIcon
                            title={txt.help.title}
                            text={txt.help.text}
                            buttonLabel={txt.help.button}
                        />
                    </div>
                </div>
                <div className="facetsList body-2">
                    {aggregations.map((item, index) => (
                        <div>
                            <div key={index} className="facetsCategory">
                                <div className="facetsCategoryTitle"
                                     onClick={this.handleActiveCategoryClick}
                                     onKeyPress={this.handleActiveCategoryClick}>
                                    {item.title ? item.title : item.aggregation} <span>({item.doc_count})</span>
                                </div>
                                <div className="facetLinksList">
                            {item.facets.map((subitem, subindex) => (
                                <div key={subindex} className="facetListItems" onClick={this.handleActiveLinkClick}
                                     onKeyPress={this.handleActiveLinkClick}>
                                    {subitem.title} <span>({subitem.doc_count})</span>
                                </div>
                            ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default FacetsFilter;
