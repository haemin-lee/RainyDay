import { Nav } from 'react-bootstrap'
import { Switch, Route, NavLink } from 'react-router-dom'

import { Dashboard, Predictions, Loans, Bank } from './tabs'
// figure styles out later...
function Home() {
    return (
        <div className="container">
            {/*<Nav className="justify-content-center nav-pills">
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/"
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/bank"
                    >
                        Bank
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/predictions"
                    >
                        Predictions
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/loans"
                    >
                        Loans Info
                    </NavLink>
                </li>
            </Nav>*/}
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route exact path="/bank">
                    <Bank />
                </Route>
                <Route exact path="/predictions">
                    <Predictions />
                </Route>
                <Route exact path="/loans">
                    <Loans />
                </Route>
            </Switch>
        </div>
    )
}

export default Home
