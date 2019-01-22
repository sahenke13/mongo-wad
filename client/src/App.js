import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar/Header";
import BrowseStories from "./pages/BrowseStories";
import CreateStory from "./pages/CreateStory";
import CurrentEntryPage from "./pages/CurrentEntryPage";
import Footer from "./components/Footer/Footer"
import Layout from "./Layout"
import "./App.css";

const App = () => (
<Layout>
  <Router>
    <div>

      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/browseStories" component={BrowseStories} />
        <Route exact path="/createStory" component={CreateStory} />
        <Route exact path="/currentEntry/:id" component={CurrentEntryPage} />
      </Switch>

    </div>
  </Router>
  </Layout>
);

export default App;
