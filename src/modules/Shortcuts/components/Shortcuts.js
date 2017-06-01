import ReactDOM from 'react-dom'
import './Shortcuts.scss'
import keymap from './keymap'
import App from './app'
import { ShortcutManager } from '../src'

const shortcutManager = new ShortcutManager(keymap)

// Just for testing
window.shortcutManager = shortcutManager

const element = React.createElement(App, { shortcuts: shortcutManager })
ReactDOM.render(element, document.getElementById('app'))
