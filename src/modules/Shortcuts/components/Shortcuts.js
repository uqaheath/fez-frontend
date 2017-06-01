import ReactDOM from 'react-dom'
import './Shortcuts.scss'
import keymap from './keymap'
import {keyboardShortcuts} from './app'
import { ShortcutManager } from 'react-shortcuts'

const shortcutManager = new ShortcutManager(keymap)

// Just for testing
window.shortcutManager = shortcutManager

const element = React.createElement(keyboardShortcuts, { shortcuts: shortcutManager })
ReactDOM.render(element, document.getElementById('app'))
