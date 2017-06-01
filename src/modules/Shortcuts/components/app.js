import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import Shortcuts from 'react-shortcuts';

export default class keyboardShortcuts extends Component {

    static propTypes = {
        shortcuts: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            who: 'nobody'
        };
    }

    _handleShortcuts(command) {
        switch (command) {
            case 'MOVE_LEFT':
                this.setState({who: 'Hemingway - left'});
                break;
            case 'DELETE':
                this.setState({who: 'Hemingway - delete'});
                break;
            case 'MOVE_RIGHT':
                this.setState({who: 'Hemingway - right'});
                break;
            case 'MOVE_UP':
                this.setState({who: 'Hemingway - top'});
                break;
            default:
                this.setState({who: 'Hemingway - default'});
                break;
        }
    }

    _handleShortcuts2(command) {
        switch (command) {
            case 'MOVE_LEFT':
                this.setState({who: 'Franz Kafka - left'});
                break;
            case 'DELETE':
                this.setState({who: 'Franz Kafka - delete'});
                break;
            case 'MOVE_RIGHT':
                this.setState({who: 'Franz Kafka - right'});
                break;
            case 'MOVE_UP':
                this.setState({who: 'Franz Kafka - top'});
                break;
            default:
                this.setState({who: 'Franz Kafka - default'});
                break;
        }
    }

    _handleRoot() {
        this.setState({who: 'Root shortcuts component'});
    }

    render() {
        console.log('Keyboard Shortcuts : ', this.state.who);
        return (
            <div>
                Middle
            </div>
        );
    }
}
