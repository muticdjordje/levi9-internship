import React, { Component } from "react";
import "./App.css";
import { Welcome } from "./components/welcome";
import Calendar from "./components/calendar";
import { Route, Switch } from "react-router-dom";
import AddNewUser from "./components/addNewUser";
import AddNewTechnology from "./components/addNewTechnology";
import AddInternship from "./components/addInternship";

export class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/internship" component={AddInternship}/>
        <Route path="/addNewUser" component={AddNewUser}/>
        <Route path="/addNewTechnology" component={AddNewTechnology}/>
      </Switch>
    );
  }
}

export default App;
