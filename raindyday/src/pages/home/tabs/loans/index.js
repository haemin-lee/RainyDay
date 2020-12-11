import { useState } from 'react'
let example_data = [
    {
        name: 'Congress Bill',
    },
    {
        name: 'Some Fancy Bill 2',
    },
]

function Bill(props) {
    return (
        <div className="row">
            <div className="col-8">
                <p>{props.name}</p>
            </div>
            <div className="col-4">
                <p>
                    <a href="#">Translate</a>
                </p>
            </div>
        </div>
    )
}

function Pill(props) {
    return (
        <div className="d-flex ml-3 mr-3">
            <div className="loan-pill">{props.children}</div>
        </div>
    )
}

function Loans() {
    const [bills, setBills] = useState(example_data)
    return (
        <>
            <h4>Your Information</h4>
            <div className="row">
                <Pill># of workers: {30}</Pill>
                <Pill>Location: {'LA, CA'}</Pill>
                <Pill>Revenue: {'look annually'}</Pill>
            </div>
            {bills.map((bill) => {
                return <Bill name={bill.name} />
            })}
        </>
    )
}

export default Loans
