import { Nav } from 'react-bootstrap'
import { Switch, Route, NavLink } from 'react-router-dom'

import { Dashboard, Predictions, Loans, Bank } from './tabs'
// figure styles out later...
function Home() {
    return (
        <div className="container">
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
