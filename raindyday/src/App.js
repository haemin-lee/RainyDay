import { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useLocation,
} from 'react-router-dom'
import { Provider, useDispatch, useStore } from 'react-redux'

import { Navbar, Nav } from 'react-bootstrap'

import { get_token } from 'finastra-api-client'

import app_store from './redux/stores'
import { set_user, logout_user } from './redux/actions/user'

import Splash from './pages/splash'
import Home from './pages/home'
import Test from './pages/test'

function TopNav() {
    const store = useStore()
    const dispatch = useDispatch()

    const [user, setUser] = useState(null)

    store.subscribe(() => {
        const u = store.getState().user
        if (Object.keys(u).length) setUser(store.getState().user)
        else setUser(null)
    })

    return (
        <div className="navbar navbar-expand-lg navbar-light navbar-transparent">
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
                        <Nav.Link href="/">Dashboard</Nav.Link>
                        <Nav.Link href="/loans">Loans</Nav.Link>
                        <Nav.Link
                            href="/"
                            onClick={() => {
                                localStorage.clear()
                                dispatch(logout_user())
                                return
                            }}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </div>
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
    const dispatch = useDispatch()

    useEffect(() => {
        // do not login twice
        const u = store.getState().user
        if (Object.keys(u).length) {
            return history.push('/')
        }
        // get access token
        const code = query.get('code')
        fetch_token(code)

        async function fetch_token(code) {
            const access_token_res = await get_token(code)
            let access_token = access_token_res.data

            localStorage.setItem('user', JSON.stringify(access_token))
            dispatch(set_user(access_token))
            history.push('/')
        }
    })

    // TODO: Loading screen?
    return <></>
}

function App() {
    const store = useStore()
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)

    useEffect(() => {
        // set up auth
        // TODO: stop assuming access token is always valid
        const user = localStorage.getItem('user')
        if (user) {
            // set up redux state
            dispatch(set_user(JSON.parse(user)))
            setUser(JSON.parse(user))
        }
    }, [setUser])

    return (
        <>
            <Router>
                <Switch>
                    {/* this will probably have some 404 issues later... */}
                    <Route exact path="/login">
                        <TopNav />
                        <Login />
                    </Route>

                    <Route exact path="/test">
                        <TopNav />
                        <Test />
                    </Route>
                    {user ? (
                        // display datas
                        <Route path="/">
                            <TopNav />
                            <Home />
                        </Route>
                    ) : (
                        // otherwise splash
                        <Route path="/">
                            <div className="hero">
                                <TopNav />
                                <Splash />
                            </div>
                        </Route>
                    )}
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
