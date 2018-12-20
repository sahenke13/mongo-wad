import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from './pages/MainPage'





const App = () => (
    
    <Router>
        <div>
            <Switch>
                <Route exact path = "/" component = {MainPage} />
            </Switch>
        </div>
    </Router>
);

export default App;
