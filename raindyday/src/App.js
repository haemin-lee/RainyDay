import { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useLocation,
} from 'react-router-dom'
import { Provider, useDispatch, useStore } from 'react-redux'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { Navbar, Nav } from 'react-bootstrap'

import { get_token } from 'finastra-api-client'

import app_store from './redux/stores'
import { set_user, logout_user } from './redux/actions/user'

import Splash from './pages/splash'
import Home from './pages/home'
import Test from './pages/test'
import dino from './logo.png'

function TopNav(props) {
    const dispatch = useDispatch()
    return (
        <div className="navbar navbar-expand-lg navbar-light navbar-transparent">
            <Navbar.Brand href="/">
                <img
                    src={dino}
                    width="50"
                    height="60"
                    alt=""
                    style={{ float: 'left' }}
                />
                <p
                    style={{
                        fontFamily: 'Poppins',
                        float: 'left',
                        marginTop: 10,
                        color: !props.user ? 'white' : '#343a40',
                    }}
                >
                    Rainy Day
                </p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {!props.user ? (
                    <Nav className="ml-auto">
                        <Nav.Link href="https://api.fusionfabric.cloud/login/v1/sandbox/oidc/authorize?response_type=code&client_id=385ae539-8678-4e84-a352-a30b0114296c&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin">
                            <p
                                style={{
                                    fontFamily: 'Poppins',
                                    float: 'left',
                                    marginTop: 10,
                                    color: !props.user ? 'white' : '#343a40',
                                }}
                            >
                                Sign in
                            </p>
                        </Nav.Link>
                    </Nav>
                ) : (
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Dashboard</Nav.Link>
                        <Nav.Link href="/loans">Loans</Nav.Link>
                        <Nav.Link
                            href="/"
                            onClick={(e) => {
                                localStorage.clear()
                                dispatch(logout_user())
                            }}
                        >
                            Logout {props.user.firstName}
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

    return (
        <div className="loader">
            <Loader
                type="TailSpin"
                color="#3b42bf"
                height={100}
                width={100}
                timeout={6000}
            />
        </div>
    )
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

        const unsubscribe = store.subscribe(() => {
            const u = store.getState().user
            setUser(u)
        })

        return function cleanup() {
            unsubscribe()
        }
    }, [dispatch, store])

    return (
        <>
            <Router>
                <Switch>
                    {/* this will probably have some 404 issues later... */}
                    <Route exact path="/login">
                        <Login />
                    </Route>

                    <Route exact path="/test">
                        <TopNav user={user} />
                        <Test />
                    </Route>
                    {user ? (
                        // display datas
                        <Route path="/">
                            <TopNav user={user} />
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
