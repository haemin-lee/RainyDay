import DataGrid from 'react-data-grid'
import '../../../../datagrid_style.css'
import { TextEditor } from 'react-data-grid'
import { useState, useCallback } from 'react'
import get_client from '../../../../api/finastra'
import readXlsxFile from 'read-excel-file'
import { useDropzone } from 'react-dropzone'
import { useStore } from 'react-redux'
import Button from '@material-ui/core/Button'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Prediction from './predictions'

class genericInfo {
    constructor(
        Name,
        Expected,
        Total,
        January,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December
    ) {
        this.Name = Name
        this.Expected = Expected
        this.Total = Total
        this.January = January
        this.February = February
        this.March = March
        this.April = April
        this.May = May
        this.June = June
        this.July = July
        this.August = August
        this.September = September
        this.October = October
        this.November = November
        this.December = December
    }
}

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

const finastra_columns = [
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
                        <DataGrid columns={finastra_columns} rows={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Dashboard() {
    const store = useStore()

    const user = store.getState().user

    const [isImported, setIsImported] = useState(false)
    const [isApi, setIsApi] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    function summation(someObj) {
        var object = someObj
        let sum = 0
        for (const key of Object.keys(object)) {
            if (key != 'Name' && key != 'Expected' && key != 'Total') {
                sum += Number(object[key])
            }
        }
        return sum
    }

    function overallSummation(someArray) {
        let i = 0
        for (i = 0; i < someArray.length; i++) {
            var summationValue = summation(someArray[i])
            someArray[i].Total = summationValue
        }
        return someArray
    }

    function parseExcel(someExcel) {
        let array = []
        for (let i = 0; i < someExcel.length; i++) {
            const newClass = new genericInfo(
                someExcel[i][0],
                someExcel[i][1],
                someExcel[i][2],
                someExcel[i][3],
                someExcel[i][4],
                someExcel[i][5],
                someExcel[i][6],
                someExcel[i][7],
                someExcel[i][8],
                someExcel[i][9],
                someExcel[i][10],
                someExcel[i][11],
                someExcel[i][12],
                someExcel[i][13],
                someExcel[i][14],
                someExcel[i][15]
            )
            array.push(newClass)
        }
        return array
    }

    function addingRow(i) {
        const newClass = new genericInfo(
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        )
        let othergrid = [...data]
        othergrid[i].push(newClass)
        setData(othergrid)
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        setIsLoading(true)

        const file = acceptedFiles[0]
        const sheets = await readXlsxFile(file, { getSheets: true })
        let grids = []
        for (const sheet of sheets) {
            const rows = await readXlsxFile(file, { sheet: sheet.name })
            let grid = overallSummation(parseExcel(rows))
            console.log(grid)
            grids.push(grid)
        }
        setData(grids)
        setIsImported(true)
        setIsLoading(false)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })

    let onRowsChange = (i, updatedRows) => {
        let grids = [...data]
        grids[i] = overallSummation(updatedRows)
        console.log(grids[i])
        setData(grids)
    }

    async function get_data() {
        setIsLoading(true)
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

        setData(obj)
        setIsApi(true)
        setIsImported(true)
        setIsLoading(false)
    }

    // load for max 12s
    if (isLoading)
        return (
            <div className="loader">
                <Loader
                    type="TailSpin"
                    color="#3b42bf"
                    height={100}
                    width={100}
                    timeout={12000}
                />
            </div>
        )

    return (
        <>
            {!isImported ? (
                <>
                    <div style={{ marginTop: '30px', marginBottom: '100px' }}>
                        <h2 className="mb-3">Hi, {user.firstName}</h2>
                        <h5>To get started,</h5>
                    </div>
                    <div
                        {...getRootProps()}
                        className="mb-5 dotted-bg"
                        style={{ display: 'block', margin: '0 auto' }}
                    >
                        <input {...getInputProps()} />
                        <div className="text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="128"
                                height="128"
                                fill="currentColor"
                                class="bi bi-cloud-upload-fill"
                                viewBox="0 0 16 16"
                                className="mb-2"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"
                                />
                            </svg>
                            {isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                <p>Upload a spreadsheet</p>
                            )}
                        </div>
                    </div>
                    <div className="text-center">
                        <p>or</p>
                        <p>
                            <button className="btn btn-link" onClick={get_data}>
                                Pull data from Finastra
                            </button>
                        </p>
                    </div>
                </>
            ) : !isApi ? (
                <>
                    {/* render grids */}
                    <div className="row">
                        <div className="col-6">
                            {data.map((grid, i) => {
                                return (
                                    <>
                                        <DataGrid
                                            columns={columns}
                                            rows={grid}
                                            onRowsChange={(updatedRows) =>
                                                onRowsChange(i, updatedRows)
                                            }
                                            enableCellSelect={true}
                                        />
                                        <Button
                                            onClick={() => {
                                                addingRow(i)
                                            }}
                                        >
                                            Add a New Row!
                                        </Button>
                                    </>
                                )
                            })}
                        </div>
                        {/* graphs */}
                        <div className="col-6"></div>
                    </div>
                </>
            ) : (
                <>
                    <div className="row">
                        <div className="col-6">
                            {data.map((grid) => {
                                return <Account data={grid} />
                            })}
                        </div>
                        <div className="col-6"></div>
                    </div>
                </>
            )}
        </>
    )
}

export default Dashboard
