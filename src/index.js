import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import About from './about';
import Contact from './contact';
import Home from './home';
import ErrorPage from './error';
import './routing_style.css';
import {createBrowserRouter, RouterProvider, Link, Outlet} from "react-router-dom";

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
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/about"}>About</Link></li>
                        <li><Link to={"/contact"}>Contact</Link></li>
                    </ul>
                </menu>
                <Outlet/>
            </div>
        );
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <Home/>},
            {path: "about", element: <About/>},
            {path: "contact", element: <Contact/>}
            ],
    }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);






