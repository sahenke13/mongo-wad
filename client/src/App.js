import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BrowseStories from "./pages/BrowseStories";
import CreateStory from "./pages/CreateStory";
import CurrentEntryPage from "./pages/CurrentEntryPage";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/story" component={BrowseStories} />
        <Route exact path="/create" component={CreateStory} />
        <Route exact path="/browse" component={CurrentEntryPage} />
      </Switch>
    </div>
  </Router>
);

export default App;
