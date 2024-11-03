import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import KanbanContainer from './kanbanContainer';
import './style.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            route: window.location.hash.substring(1)
        };
    }
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({route: window.location.hash.substring(1)});
        });
    }
    render() {
        var Child;
        switch(this.state.route) {
            case '/about': Child = About; break;
            case '/contact': Child = Contact; break;
            default: Child = Home;
        }
        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><a href="#/about">About</a></li>
                        <li><a href="#/contact">Contact</a></li>
                    </ul>
                </menu>
                <Child/>
            </div>
        );
    }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);






