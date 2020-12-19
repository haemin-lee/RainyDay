// Future feature: import from Excel
import ReactDOM from 'react-dom'
import ReactDataGrid from 'react-data-grid'
import DataGrid from 'react-data-grid'
// import 'react-data-grid/dist/react-data-grid.css';
import '../../../../datagrid_style.css'
import { TextEditor } from 'react-data-grid'
import { useEffect, useState } from 'react'
import get_client from '../../../../api/finastra'

const rowsOperatingIncome = [
    {
        Name: 'Sales',
        Expected: 200,
        Total: 300,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
    {
        Name: 'Service',
        Expected: 1000,
        Total: 800,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
]

const rowsCostOfGoodsSold = [
    {
        Name: 'Detergent Sold',
        Expected: 200,
        Total: 300,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
    {
        Name: 'Human Labor',
        Expected: 1000,
        Total: 800,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
]

const rowsOperatingCost = [
    {
        Name: 'Electricity',
        Expected: 200,
        Total: 300,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
    {
        Name: 'Gas',
        Expected: 1000,
        Total: 800,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
    {
        Name: 'Rent',
        Expected: 200,
        Total: 300,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
    {
        Name: 'Water',
        Expected: 1000,
        Total: 800,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
    {
        Name: 'Insurance',
        Expected: 200,
        Total: 300,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
    {
        Name: 'Advertising',
        Expected: 1000,
        Total: 800,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
    {
        Name: 'Repair',
        Expected: 200,
        Total: 300,
        January: 100,
        February: 100,
        March: 100,
        April: 100,
        May: 100,
        June: 100,
        July: 100,
        August: 100,
        July: 100,
        September: 100,
        October: 100,
        November: 100,
        December: 100,
    },
]

const columns = [
    { key: 'Name', name: 'Name', editable: true, editor: TextEditor },
    { key: 'Expected', name: 'Expected', editable: true, editor: TextEditor },
    { key: 'Total', name: 'Total', editable: true, editor: TextEditor },
    { key: 'January', name: 'January', editable: true, editor: TextEditor },
    { key: 'February', name: 'February', editable: true, editor: TextEditor },
    { key: 'March', name: 'March', editable: true, editor: TextEditor },
    { key: 'April', name: 'April', editable: true, editor: TextEditor },
    { key: 'May', name: 'May', editable: true, editor: TextEditor },
    { key: 'June', name: 'June', editable: true, editor: TextEditor },
    { key: 'July', name: 'July', editable: true, editor: TextEditor },
    { key: 'August', name: 'August', editable: true, editor: TextEditor },
    { key: 'September', name: 'September', editable: true, editor: TextEditor },
    { key: 'October', name: 'October', editable: true, editor: TextEditor },
    { key: 'November', name: 'November', editable: true, editor: TextEditor },
    { key: 'December', name: 'December', editable: true, editor: TextEditor },
]

// Prob better way to do prop mapping
function Dashboard() {
    const [data, setData] = useState([])
    const [grid1, setGrid1] = useState(rowsOperatingIncome)
    const [grid2, setGrid2] = useState(rowsCostOfGoodsSold)
    const [grid3, setGrid3] = useState(rowsOperatingCost)
    //  let onRowsChanged = ({ fromRow, toRow, updated }) => {
    let onRowsChange1 = (updatedRows) => {
        setGrid1(updatedRows)
    }
    let onRowsChange2 = (updatedRows) => {
        setGrid2(updatedRows)
    }
    let onRowsChange3 = (updatedRows) => {
        setGrid3(updatedRows)
    }

    useEffect(() => {
        test_api()

        async function test_api() {
            const options = {
                accountContext: 'VIEW-ACCOUNT',
            }

            const client = get_client()
            console.log('hi')
            console.log(client)

            const data = await client.account_information.get_accounts_information(
                options
            )
            setData(data.data)
        }
    }, [])

    return (
        <div>
            <div className="container">
                <code>{JSON.stringify(data)}</code>
            </div>
            <h2>Operating Income</h2>
            <DataGrid
                columns={columns}
                rows={grid1}
                onRowsChange={onRowsChange1}
                enableCellSelect={true}
            />
            <h2>Cost of Goods Sold</h2>
            <DataGrid
                columns={columns}
                rows={grid2}
                onRowsChange={onRowsChange2}
                enableCellSelect={true}
            />
            <h2>Operating Cost</h2>
            <DataGrid
                columns={columns}
                rows={grid3}
                onRowsChange={onRowsChange3}
                enableCellSelect={true}
            />
        </div>
    )
}

export default Dashboard
