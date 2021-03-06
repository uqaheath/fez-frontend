import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from 'actions';

class ContributorForm extends Component {

    static propTypes = {
        authorsList: PropTypes.array,
        onAdd: PropTypes.func.isRequired,
        showIdentifierLookup: PropTypes.bool,
        actions: PropTypes.object.isRequired,
        locale: PropTypes.object
    };

    static defaultProps = {
        locale: {
            nameAsPublishedLabel: 'Name as published',
            nameAsPublishedHint: 'Please type the name exactly as published',
            identifierLabel: 'UQ identifier (if available)',
            addButton: 'Add author'
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            nameAsPublished: '',
            uqIdentifier: '',
            contributor: {}
        };
    }

    componentDidMount() {
        // TODO: fix this hack! it makes me wannacry! UGLY HACK!
        // I need to catch scrolling event of scrolled container (which is not a window) to set position of autosuggest list when user scrolls
        // another solution, close the box when user tries to scroll
        const div = document.querySelector('div.layout-fill.align-stretch');
        div.addEventListener('scroll', this.handleParentContainerScroll.bind(this));
    }

    componentWillUnmount() {
        const div = document.querySelector('div.layout-fill.align-stretch');
        div.removeEventListener('scroll', this.handleParentContainerScroll.bind(this));
    }

    handleParentContainerScroll() {
        if (this.refs.identifierField) this.refs.identifierField.close();
    }

    _addContributor = (event) => {
        // add contributor if user hits 'enter' key on input field
        if(event.key && (event.key !== 'Enter' || this.state.nameAsPublished.length === 0)) return;

        // pass on the selected contributor
        this.props.onAdd({...this.state.contributor, ...{nameAsPublished: this.state.nameAsPublished}});

        // reset internal state
        this.setState({
            nameAsPublished: '',
            uqIdentifier: '',
            contributor: {}
        });

        // move focus to name as published text field after item was added
        this.refs.nameAsPublishedField.focus();
    }

    _onNameChanged = (event, newValue) => {
        this.setState({
            nameAsPublished: newValue
        });
    }

    _onUQIdentifierSelected = (selectedItem, index) => {
        // items has to be selected from the list
        if (index === -1) return;

        this.setState({
            contributor: selectedItem
        });

        this._addContributor();
    }

    _onUQIdentifierChanged = (newValue) => {
        this.setState({
            uqIdentifier: newValue
        });

        if (newValue.trim().length > 1) {
            this.props.actions.searchAuthors(newValue, (item) => { return !!item.aut_org_username; });
        }
    }

    render() {
        const autoCompleteDataFormat = {text: 'displayName', value: 'aut_id'};

        return (
            <div className="columns contributors dataList">
                <div className="column contributorsEntry">
                    <TextField
                        fullWidth
                        ref="nameAsPublishedField"
                        floatingLabelText={this.props.locale.nameAsPublishedLabel}
                        hintText={this.props.locale.nameAsPublishedHint}
                        value={this.state.nameAsPublished}
                        onChange={this._onNameChanged}
                        onKeyPress={this._addContributor}
                    />
                </div>
                {this.props.showIdentifierLookup &&
                <div className="column contributorsLinking">
                    <AutoComplete
                        disabled={this.state.nameAsPublished.trim().length === 0}
                        listStyle={{maxHeight: 200, overflow: 'auto'}}
                        filter={() => true}
                        ref="identifierField"
                        floatingLabelText={this.props.locale.identifierLabel}
                        hintText={this.props.locale.identifierLabel}
                        dataSource={this.props.authorsList}
                        dataSourceConfig={autoCompleteDataFormat}
                        openOnFocus
                        fullWidth
                        animated={false}
                        searchText={this.state.uqIdentifier}
                        onUpdateInput={this._onUQIdentifierChanged}
                        onNewRequest={this._onUQIdentifierSelected}
                    />
                </div>}
                <div className="column is-narrow contributorsButton">
                    <RaisedButton
                        className="is-mui-spacing-button"
                        fullWidth
                        primary
                        label={this.props.locale.addButton}
                        disabled={this.state.nameAsPublished.trim().length === 0}
                        onClick={this._addContributor} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authorsList: state.get('authorsReducer').authorsList || []
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContributorForm);
