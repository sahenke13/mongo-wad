import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StoryPage from "./pages/BrowseStories";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/story" component={StoryPage} />
      </Switch>
    </div>
  </Router>
);

export default App;
