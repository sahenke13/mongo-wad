import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar/Header";
import Footer from "./components/Footer/Footer";
import BrowseStories from "./pages/BrowseStories";
import CreateStory from "./pages/CreateStory";
import CurrentEntryPage from "./pages/CurrentEntryPage";
import "./App.css";

const App = () => (

  <Router>
    <div>
    <NavBar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/browseStories" component={BrowseStories} />
        <Route exact path="/createStory" component={CreateStory} />
        <Route exact path="/currentEntry/:id" component={CurrentEntryPage} />
      </Switch>
    <Footer />
    </div>
  </Router>
);

export default App;
