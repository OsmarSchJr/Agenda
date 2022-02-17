import React from "react";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import Agenda from "../agenda/Agenda"
import About from "../about/About"

export default props => (
    <HashRouter>
        <Switch>
            <Route path="/agendas" component={Agenda} />
            <Route path="/about" component={About} />
            <Redirect from="*" to="/agendas" />
        </Switch>
    </HashRouter>
)
