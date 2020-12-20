import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

import get_client from '../../../../api/finastra'

import Slider from '@material-ui/core/Slider'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function Account(props) {
    return (
        <div className="account-modal-item" onClick={props.onClick}>
            <button className="btn btn-link">
                {props.data.bankShortName} - {props.data.number}
            </button>
        </div>
    )
}

function AccountModal(props) {
    const [isLoading, setIsLoading] = useState(false)

    function handleOnClick(i) {
        props.onClick(i, props.accounts[i])
    }

    return (
        <Modal show={props.show} onHide={props.onHide} scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>Choose Bank Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="loader">
                        <Loader
                            type="TailSpin"
                            color="#3b42bf"
                            height={100}
                            width={100}
                            timeout={6000}
                        />
                    </div>
                ) : (
                    <>
                        {props.accounts.map((account, i) => {
                            return (
                                <Account
                                    data={account}
                                    onClick={() => handleOnClick(i)}
                                />
                            )
                        })}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

// pass in array of 12 slider vals
function SliderModal(props) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const marks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 100,
            label: '100%',
        },
    ]

    return (
        <Modal show={props.show} onHide={props.onHide} scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Vaccination Levels</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    {months.map((name, i) => {
                        return (
                            <>
                                <p>{name}</p>
                                <Slider
                                    value={props.values[i]}
                                    onChange={(e, value) =>
                                        props.onChange(value, i)
                                    }
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    step={10}
                                />
                            </>
                        )
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onSubmit}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { AccountModal, SliderModal }
