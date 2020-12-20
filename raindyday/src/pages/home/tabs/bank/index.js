import DataGrid from 'react-data-grid'
import '../../../../datagrid_style.css'

import { useEffect, useState } from 'react'
import get_client from '../../../../api/finastra'

const TEST = [
    {
        id: '11',
        number: 'GB29 NWBK 6016 1881 9268 27',
        type: 'CURRENT',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        bankShortName: 'BGB',
    },
    {
        id: '12',
        number: 'GB29 NWBK 6016 1081 9008 00',
        type: 'CURRENT',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        principalAmount: '0',
        accountStartDate: '2020-12-02',
        bankShortName: 'BGB',
    },
    {
        id: '13',
        number: 'GB29 NWBK 6016 1801 9268 19',
        type: 'CURRENT',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        bankShortName: 'BGB',
    },
    {
        id: '14',
        number: 'GB29 NWBK 6016 1331 9268 77',
        type: 'CURRENT',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        bankShortName: 'BGB',
    },
    {
        id: '15',
        nmber: 'GB29 NWBK 0006 1881 9268 91',
        type: 'OTHER',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        bankShortName: 'BGB',
    },
    {
        id: '20',
        number: 'GB29 NWBK 6016 1331 9268 72',
        type: 'CURRENT',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        bankShortName: 'BGB',
    },
    {
        id: '533',
        number: 'GB29 NWBK 5016 1081 8009 13',
        type: 'LOAN',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        debitInterestRate: '7.1',
        bankShortName: 'BGB',
    },
    {
        id: '545',
        number: 'GB29 NWBK 5016 1081 8009 11',
        type: 'LOAN',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        debitInterestRate: '7.1',
        bankShortName: 'BGB',
    },
    {
        id: '292',
        number: 'GB29 NWBK 6016 1331 9268 16',
        type: 'DEPOSIT',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        creditInterestRate: '7',
        principalAmount: '11770',
        maturityAmount: '12990',
        accountStartDate: '2019-03-01',
        accountEndDate: '2025-11-20',
        bankShortName: 'BGB',
    },
    {
        id: '548',
        number: 'GB29 NWBK 5016 1081 8009 10',
        type: 'LOAN',
        format: 'BBAN',
        currency: 'GBP',
        status: 'ACTIVE',
        cutomerReference: 'Custref123',
        debitInterestRate: '5.9',
        bankShortName: 'BGB',
    },
]

const columns = [
    {
        key: 'postingDate',
        name: 'Posting Date',
    },
    {
        key: 'valueDate',
        name: 'Value Date',
    },
    {
        key: 'currency',
        name: 'Currency',
    },
    {
        key: 'amount',
        name: 'Amount',
    },
    {
        key: 'transactionType',
        name: 'Type',
    },
    {
        key: 'balance',
        name: 'Balance',
    },
]

function Account(props) {
    const [data, setData] = useState([])

    async function get_data() {
        const client = get_client()

        let fromDate = new Date()
        fromDate.setFullYear(fromDate.getFullYear() - 1)

        const options = {
            fromDate: fromDate.toISOString().substr(0, 10),
            toDate: new Date().toISOString().substr(0, 10),
            limit: 200,
        }

        const d = await client.account_information.get_account_statement(
            props.data.id,
            options
        )

        setData(d.data.items)
    }

    return (
        <div id={props.data.id}>
            <div className="card">
                <div className="card-header">
                    <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={'#collapse-' + props.data.id}
                        onClick={get_data}
                    >
                        {props.data.bankShortName} | {props.data.number} |{' '}
                        {props.data.type}
                    </button>
                </div>
                <div
                    id={'collapse-' + props.data.id}
                    className="collapse close"
                    data-parent={'#' + props.data.id}
                >
                    <div className="card-body">
                        <p>{props.data.bankShortName}</p>
                        <p>{props.data.type}</p>
                        <p>{props.data.number}</p>
                        <DataGrid columns={columns} rows={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}


// Prob better way to do prop mapping
function Bank() {
<<<<<<< HEAD
    const [data, setData] = useState([]);
    const [grid1, setGrid1] = useState(rowsOperatingIncome);
    const [grid2, setGrid2] = useState(rowsCostOfGoodsSold);
    const [grid3, setGrid3] = useState(rowsOperatingCost);

    let onRowsChange1 = ( updatedRows ) => {  
        setGrid1(updatedRows);
    };
    let onRowsChange2 = ( updatedRows ) => {  
        setGrid2(updatedRows);
    };
    let onRowsChange3 = ( updatedRows ) => {  
        setGrid3(updatedRows);
    };
=======
    const [data, setData] = useState([])
>>>>>>> c864eeaefab4efe6fcbe512c04bf8239b3fbd57f

    useEffect(() => {
        // test_api()

        async function test_api() {
            const options = {
                accountContext: 'VIEW-ACCOUNT',
            }

            const client = get_client()

            const d = await client.account_information.get_accounts_information(
                options
            )

            let obj = []
            for (const account of d.data.items) {
                const id = account.id
                const info = await client.account_information.get_account(id)
                obj.push(info.data)
            }

            console.log(obj)

            setData(obj)
        }
    }, [])

<<<<<<< HEAD


=======
>>>>>>> c864eeaefab4efe6fcbe512c04bf8239b3fbd57f
    return (
        <div className="container">
            {TEST.map((data) => {
                return <Account data={data} />
            })}
        </div>
    )
}

export default Bank
