// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MapView from './components/MapView';
import History from './components/History';
import Geofence from './components/Geofence';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <header className="app-header">
                    <h1>Online Vehicle Tracking System</h1>
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/">Real-time Tracking</Link></li>
                            <li><Link to="/history">History</Link></li>
                            <li><Link to="/geofence">Geofence</Link></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <Switch>
                        <Route exact path="/" component={MapView} />
                        <Route path="/history" component={History} />
                        <Route path="/geofence" component={Geofence} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;

