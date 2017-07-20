import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ConfirmDialogBox from '../../ConfirmDialogBox/ConfirmDialogBox';

export default class ContributorRow extends Component {

    static propTypes = {
        index: PropTypes.number.isRequired,
        contributor: PropTypes.object.isRequired,
        canMoveUp: PropTypes.bool,
        canMoveDown: PropTypes.bool,
        onMoveUp: PropTypes.func,
        onMoveDown: PropTypes.func,
        onDelete: PropTypes.func,
        showIdentifierLookup: PropTypes.bool,
        locale: PropTypes.object
    };

    static defaultProps = {
        contributorSuffix: 'listed contributor',
        locale: {
            moveUpHint: 'Move record up the order',
            moveDownHint: 'Move record down the order',
            deleteHint: 'Remove this record',
            contributorSuffix: ' listed contributor',
            ordinalData: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Nineth', 'Tenth']
        }
    };

    constructor(props) {
        super(props);
    }

    _showConfirmation = () => {
        this.confirmationBox.showConfirmation();
    }

    _deleteRecord = () => {
        if (this.props.onDelete) this.props.onDelete(this.props.contributor, this.props.index);
    }

    _onMoveUp = () => {
        if (this.props.onMoveUp) this.props.onMoveUp(this.props.contributor, this.props.index);
    }

    _onMoveDown = () => {
        if (this.props.onMoveDown) this.props.onMoveDown(this.props.contributor, this.props.index);
    }

    render() {
        const {ordinalData, contributorSuffix} = this.props.locale;
        const contributorOrder = (this.props.index < ordinalData.length ?
            ordinalData[this.props.index] : (this.props.index + 1)) + ' ' + contributorSuffix;

        return (
            <div className="columns is-gapless is-mobile">
                <ConfirmDialogBox
                    onRef={ref => (this.confirmationBox = ref)}
                    onAction={this._deleteRecord}
                />
                <div className="column">
                    <strong>{this.props.contributor.nameAsPublished}</strong>
                    <br/>
                    <small>{contributorOrder}</small>
                </div>
                {this.props.showIdentifierLookup &&
                <div className="column is-3-desktop is-3-tablet is-5-mobile">
                    <strong>{this.props.contributor.aut_title} {this.props.contributor.aut_display_name}</strong>
                    <br/>
                    <small>{this.props.contributor.aut_org_username}</small>
                </div>
                }
                <div className="column is-1-desktop is-1-tablet is-hidden-mobile is-centered">
                    {this.props.canMoveUp &&
                    <IconButton tooltip={this.props.locale.moveUpHint} onTouchTap={this._onMoveUp}>
                        <FontIcon className="material-icons">keyboard_arrow_up</FontIcon>
                    </IconButton>
                    }
                </div>
                <div className="column is-1-desktop is-1-tablet is-hidden-mobile is-centered">
                    {this.props.canMoveDown &&
                    <IconButton tooltip={this.props.locale.moveDownHint} onTouchTap={this._onMoveDown}>
                        <FontIcon className="material-icons">keyboard_arrow_down</FontIcon>
                    </IconButton>
                    }
                </div>
                <div className="column is-1-desktop is-1-tablet is-1-mobile is-delete is-centered">
                    <IconButton tooltip={this.props.locale.deleteHint} onTouchTap={this._showConfirmation}>
                        <FontIcon className="material-icons">delete</FontIcon>
                    </IconButton>
                </div>
            </div>
        );
    }
}

