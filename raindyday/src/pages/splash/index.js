import './splashScreen.css'
import umbrella from './animation.gif'

function Splash() {
    return (
        <div className="container">
            <div className="text">
                <h1>Welcome to Rainy Day</h1>
                <h2>
                    An innovative and simple solution to your book-keeping for
                    small businesses
                </h2>
            </div>
            <div className="gif">
                <img src={umbrella} alt="umbrella" />
            </div>
        </div>
    )
}

export default Splash
