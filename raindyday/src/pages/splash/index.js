import './splashScreen.css'
import Lottie from 'react-lottie-player'
import umbrella from './umbrella.json'
import { Row, Container, Col } from 'react-bootstrap'
import Typist from 'react-typist'

function Splash() {
    return (
        <div className="container">
            <Container>
                <Row>
                    <Col>
                        <Row style={{ height: 200 }}></Row>
                        <Row>
                            <div className="text">
                                <h1 style={{ fontSize: 40, textAlign: 'left' }}>
                                    Welcome to
                                </h1>
                                <h1
                                    style={{
                                        fontSize: 80,
                                        color: '#FC94AF',
                                        textAlign: 'left',
                                    }}
                                >
                                    Rainy Day
                                </h1>
                                <div style={{ height: 40 }}></div>
                                <Typist>
                                    <h2 style={{ textAlign: 'left' }}>
                                        <span>A simple</span>
                                        <Typist.Backspace
                                            count={6}
                                            delay={200}
                                        />
                                        <span> brilliant </span>
                                        <span>
                                            solution to your book-keeping for
                                            small businesses
                                        </span>
                                    </h2>
                                </Typist>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={{ height: 100 }}></Row>
                        <Row>
                            <div className="gif">
                                <Lottie
                                    loop={true}
                                    animationData={umbrella}
                                    play={true}
                                    style={{ width: 400, height: 400 }}
                                />
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Splash
