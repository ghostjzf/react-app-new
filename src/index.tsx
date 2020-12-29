import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import US from './locales/en_US.json';
import './index.scss';

function __(key: string) {
    return (US as any)[key];
}

window.__ = __;

ReactDOM.render(<App />, document.getElementById('root'));

if ((module as any).hot) {
    (module as any).hot.accept();
}
