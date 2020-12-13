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
import { set_user, logout_user } from './redux/actions/user'

import Home from './pages/home'

function TopNav() {
    const store = useStore()
    const dispatch = useDispatch()

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
                        <Nav.Link href="https://api.fusionfabric.cloud/login/v1/sandbox/oidc/authorize?response_type=code&client_id=385ae539-8678-4e84-a352-a30b0114296c&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin">
                            Sign in
                        </Nav.Link>
                    </Nav>
                ) : (
                    <Nav className="ml-auto">
                        {/* TODO: update this */}
                        <Nav.Link
                            href="#link"
                            onClick={() => {
                                localStorage.clear()
                                dispatch(logout_user())
                            }}
                        >
                            {user.name}
                        </Nav.Link>
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
        // do not login twice
        const u = store.getState().user
        if (Object.keys(u).length) {
            return history.push('/')
        }
        // get access token
        const code = query.get('code')
        console.log(code)
        fetch_token(code)
        async function fetch_token(code) {
            // const access_token = await get_token(code)
            // console.log(access_token)
            const access_token = {
                name: 'Devin',
            }
            localStorage.setItem('user', JSON.stringify(access_token))
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
