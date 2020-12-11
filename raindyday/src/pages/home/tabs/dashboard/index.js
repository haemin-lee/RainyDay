// Future feature: import from Excel
import { useState } from 'react'

let example_data = [
    {
        month: 1,
        expected_revenue: 100000,
        revenue: 87509,
        store: 'what in the butt',
        deficit: 10904,
    },
]

// possibly allow for custom data like a normal spreadsheet?
function Row(props) {
    return (
        <tr>
            <td>{props.month}</td>
            <td>{props.expected_revenue}</td>
            <td>{props.revenue}</td>
            <td>{props.store}</td>
            <td>{props.deficit}</td>
        </tr>
    )
}

// Prob better way to do prop mapping
function Dashboard() {
    const [data, setData] = useState(example_data)
    return (
        <table className="table table-bordered">
            <thead>
                <th scope="col">Month</th>
                <th scope="col">Expected Revenue</th>
                <th scope="col">Revenue</th>
                <th scope="col">Store</th>
                <th scope="col">Deficit</th>
            </thead>
            <tbody>
                {data.map((d) => {
                    return (
                        <Row
                            month={d.month}
                            expected_revenue={d.expected_revenue}
                            revenue={d.revenue}
                            store={d.store}
                            deficit={d.deficit}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default Dashboard
