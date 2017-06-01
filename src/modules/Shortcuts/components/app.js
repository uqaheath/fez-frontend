import React, {Component} from 'react';
import PropTypes from 'prop-types';

import keymap from './keymap';
import { ShortcutManager } from 'react-shortcuts';


const shortcutManager = new ShortcutManager();
shortcutManager.setKeymap(keymap);
import { Shortcuts } from 'react-shortcuts';

export default class KeyboardShortcuts extends Component {

    static childContextTypes = {
        shortcuts: PropTypes.object.isRequired
    };


    constructor(props) {
        super(props);

        this.state = {
            who: 'nobody'
        };
    }

    getChildContext() {
        return { shortcuts: shortcutManager };
    }

    _handleShortcuts = (action) => {
        switch (action) {
            case 'MOVE_LEFT':
                this.setState({who: 'moving left'});
                break;
            case 'MOVE_RIGHT':
                this.setState({who: 'moving right'});
                break;
            case 'MOVE_UP':
                this.setState({who: 'moving up'});
                break;
            case 'COPY':
                this.setState({who: 'copying stuff'});
                break;
            case 'DELETE':
                this.setState({who: 'deleting stuff'});
                break;
            default:
                this.setState({who: 'dunno'});
                break;
        }
    };

    render() {
        return (
            <div>
                {this.state.who !== '' && (
                    <div style={{fontSize: '24px'}}>You pressed <i>{this.state.who}</i></div>
                )}
                <Shortcuts name="TODO_ITEM" handler={this._handleShortcuts}>
                <div>
                    <h1>Hemingway</h1>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
                </Shortcuts>
            </div>
        );
    }
}
