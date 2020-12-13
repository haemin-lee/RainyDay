import { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
} from 'react-router-dom'
import { Provider, useDispatch, useStore } from 'react-redux'

import { Navbar, Nav } from 'react-bootstrap'

import { get_token, get_client } from 'finastra-api-client'

// import { store } from '@app/redux/stores'
import app_store from './redux/stores'
import { set_user } from './redux/actions/user'

import Home from './pages/home'

function TopNav() {
    const store = useStore()

    const [user, setUser] = useState(null)

    store.subscribe(() => {
        setUser(store.getState().user)
    })

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Welcome_Beemo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {!user ? (
                    <Nav className="ml-auto">
                        <Nav.Link href="#link">Sign in</Nav.Link>
                    </Nav>
                ) : (
                    <Nav className="ml-auto">
                        {/* TODO: update this */}
                        <Nav.Link href="#link">{user.name}</Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

// This page gets the code and saves the access token to local storage
// and updates the Redux state
function Login() {
    const query = useQuery()
    const history = useHistory()
    const store = useStore()

    useEffect(() => {
        if (store.getState().user) return history.push('/')
        const code = query.get('code')
        fetch_token(code)
        async function fetch_token(code) {
            const access_token = await get_token(code)
            console.log(access_token)
            history.push('/')
        }
        // TODO: expose client globally
        // get_client()
    })

    // Loading screen?
    return <></>
}

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        // set up auth
        const user = localStorage.getItem('user')
        if (user) {
            // set up redux state
            // TODO: check token expiration
            dispatch(set_user(JSON.parse(user)))
        }
    })
    return (
        <>
            <TopNav />
            <Router>
                <Switch>
                    {/* this will probably have some 404 issues later... */}
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

function AppContainer() {
    return (
        <Provider store={app_store}>
            <App />
        </Provider>
    )
}

export default AppContainer
