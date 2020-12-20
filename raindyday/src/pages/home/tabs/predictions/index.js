import { useEffect, useState } from 'react'
import get_client from '../../../../api/finastra'




function Predictions(props) {
    const [data, setData] = useState([])


    async function get_analysis() {
        const client = get_client()

        let transactions = await get_transactions()
        //TODO: fill this in
        transactions.vacc_levels = []
        let analysis = await client.analysis.get_analysis(transactions)
        setData(analysis)
    }

    async function get_transactions() {
        const client = get_client()

        let fromDate = new Date(2020, 0)
        //had limit=200, at the end
        const options = {
            fromDate: fromDate.toISOString().substr(0, 10),
            toDate: new Date().toISOString().substr(0, 10),
        }

        const d = await client.account_information.get_account_statement(
            props.data.id,
            options
        )

        return d.data;
    }

    return <div>{data.fixed_cost_mo}</div>
}

export default Predictions
