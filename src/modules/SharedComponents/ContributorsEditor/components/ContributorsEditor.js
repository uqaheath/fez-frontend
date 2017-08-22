import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ContributorRowHeader from './ContributorRowHeader';
import ContributorRow from './ContributorRow';
import ContributorForm from './ContributorForm';
import {Alert} from 'uqlibrary-react-toolbox';


export class ContributorsEditor extends Component {

    static propTypes = {
        showIdentifierLookup: PropTypes.bool,
        showContributorAssignment: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        author: PropTypes.object,
        onChange: PropTypes.func,
        locale: PropTypes.object
    };

    static defaultProps = {
        showIdentifierLookup: false,
        showContributorAssignment: false,
        locale: {
            errorMessage: 'Unable to add an item with the same identifier.'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            contributors: [],
            isCurrentAuthorSelected: false,
            errorMessage: ''
        };
    }

    componentWillUpdate(nextProps, nextState) {
        // notify parent component when local state has been updated, eg contributors added/removed/reordered
        if (this.props.onChange) this.props.onChange(nextState.contributors);
    }

    addContributor = (contributor) => {
        // only unique identifiers can be added
        if (this.state.contributors.filter(item => {
            return !!contributor.aut_id && item.aut_id === contributor.aut_id;
        }).length > 0) {
            this.setState({
                errorMessage: this.props.locale.errorMessage
            });
        } else {
            contributor.disabled = !!contributor.aut_id;

            this.setState({
                contributors: [ ...this.state.contributors, contributor],
                errorMessage: '',
                isCurrentAuthorSelected: this.state.isCurrentAuthorSelected || (this.props.author && contributor.aut_id === this.props.author.aut_id)
            }, () => {
                // try to automatically select contributor if they are a current author
                if (this.props.author && contributor.aut_id === this.props.author.aut_id) {
                    this.assignContributor(contributor, this.state.contributors.length - 1);
                }
            });
        }
    }

    moveUpContributor = (contributor, index) => {
        if (index === 0) return;
        const nextContributor = this.state.contributors[index - 1];
        this.setState({
            contributors: [
                ...this.state.contributors.slice(0, index - 1),
                contributor, nextContributor,
                ...this.state.contributors.slice(index + 1)]
        });
    }

    moveDownContributor = (contributor, index) => {
        if (index === (this.state.contributors.length - 1)) return;
        const nextContributor = this.state.contributors[index + 1];
        this.setState({
            contributors: [
                ...this.state.contributors.slice(0, index),
                nextContributor, contributor,
                ...this.state.contributors.slice(index + 2)]
        });
    }

    deleteContributor = (contributor, index) => {
        this.setState({
            contributors: this.state.contributors.filter((_, i) => i !== index),
            isCurrentAuthorSelected: this.state.isCurrentAuthorSelected && (this.props.author && contributor.aut_id !== this.props.author.aut_id)
        });
    }

    deleteAllContributors = () => {
        this.setState({
            contributors: [],
            isCurrentAuthorSelected: false
        });
    }

    assignContributor = (contributor, index) => {
        const newContributors = this.state.contributors.map((item, itemIndex) => (
            {
                ...item,
                selected: (this.props.author && item.aut_id === this.props.author.aut_id) || index === itemIndex,
                authorId: (index === itemIndex && this.props.author) ? this.props.author.aut_id : null
            })
        );
        this.setState({
            contributors: newContributors
        });
    }

    render() {
        const renderContributorsRows = this.state.contributors.map((contributor, index) =>
            <ContributorRow
                key={index}
                index={index}
                contributor={contributor}
                canMoveDown={index !== this.state.contributors.length - 1}
                canMoveUp={index !== 0}
                onMoveUp={this.moveUpContributor}
                onMoveDown={this.moveDownContributor}
                onDelete={this.deleteContributor}
                showIdentifierLookup={this.props.showIdentifierLookup}
                contributorSuffix={this.props.locale.contributorSuffix}
                disabled={this.props.disabled}
                showContributorAssignment={this.props.showContributorAssignment}
                disabledContributorAssignment={this.state.isCurrentAuthorSelected}
                onContributorAssigned={this.assignContributor} />
        );

        return (
            <div className={this.props.className}>
                <ContributorForm
                    onAdd={this.addContributor}
                    showIdentifierLookup={this.props.showIdentifierLookup}
                    disabled={this.props.disabled} />
                {
                    this.state.errorMessage &&
                    <Alert
                        title="Error"
                        message={this.state.errorMessage}
                        type="warning" />
                }
                {
                    this.state.contributors.length > 0 &&
                    <ContributorRowHeader
                        onDeleteAll={this.deleteAllContributors}
                        showIdentifierLookup={this.props.showIdentifierLookup}
                        disabled={this.props.disabled}
                        showContributorAssignment={this.props.showContributorAssignment} />
                }
                {renderContributorsRows}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        author: state.get('accountReducer').author
    };
};

export default connect(mapStateToProps)(ContributorsEditor);


