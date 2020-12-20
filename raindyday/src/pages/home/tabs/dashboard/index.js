import DataGrid from 'react-data-grid'
// import 'react-data-grid/dist/react-data-grid.css';
import '../../../../datagrid_style.css'
import { TextEditor } from 'react-data-grid'
import { useEffect, useState, useCallback } from 'react'
import get_client from '../../../../api/finastra'
import readXlsxFile from 'read-excel-file'
import { useDropzone } from 'react-dropzone'
import Button from '@material-ui/core/Button'

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

let rowsOperatingIncome = [
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

let rowsCostOfGoodsSold = [
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

let rowsOperatingCost = [
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

function Dashboard() {
    // // Prob better way to do prop mapping
    rowsOperatingIncome = overallSummation(rowsOperatingIncome)
    rowsCostOfGoodsSold = overallSummation(rowsCostOfGoodsSold)
    rowsOperatingCost = overallSummation(rowsOperatingCost)
    const [data, setData] = useState([])
    const [grid1, setGrid1] = useState(rowsOperatingIncome)
    const [grid2, setGrid2] = useState(rowsCostOfGoodsSold)
    const [grid3, setGrid3] = useState(rowsOperatingCost)

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
        var i = 0
        var array0 = [],
            array1 = [],
            array2 = []
        for (i = 0; i < someExcel.length; i++) {
            var newClass = new genericInfo(
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
            if (0 == someExcel[i][0]) {
                array0.push(newClass)
            } else if (1 == someExcel[i][0]) {
                array1.push(newClass)
            } else if (2 == someExcel[i][0]) {
                array2.push(newClass)
            }
        }
        setGrid1(overallSummation(array0))
        setGrid2(overallSummation(array1))
        setGrid3(overallSummation(array2))
    }

    function addingRow1() {
        var newClass = new genericInfo(
            'NewRow',
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
        var othergrid = [...grid1]
        othergrid.push(newClass)
        setGrid1(othergrid)
    }

    function addingRow2() {
        var newClass = new genericInfo(
            'NewRow',
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
        grid2.push(newClass)
        setGrid2(grid2)
    }

    function addingRow3() {
        var newClass = new genericInfo(
            'NewRow',
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
        grid3.push(newClass)
        setGrid3(grid3)
    }

    const onDrop = useCallback((acceptedFiles) => {
        readXlsxFile(acceptedFiles[0]).then((rows) => {
            parseExcel(rows)
        })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })
    let onRowsChangeOperatingIncome = (updatedRows) => {
        setGrid1(overallSummation(updatedRows))
    }
    let onRowsChangeCostGoodsSold = (updatedRows) => {
        setGrid2(overallSummation(updatedRows))
    }
    let onRowsChangeOperatingCost = (updatedRows) => {
        setGrid3(overallSummation(updatedRows))
    }

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Import your excel file here!</p>
                )}
            </div>
            <h2>Operating Income</h2>
            <DataGrid
                columns={columns}
                rows={grid1}
                onRowsChange={onRowsChangeOperatingIncome}
                enableCellSelect={true}
            />
            <Button
                onClick={() => {
                    addingRow1()
                }}
            >
                Add a New Row!
            </Button>
            <h2>Cost of Goods Sold</h2>
            <DataGrid
                columns={columns}
                rows={grid2}
                onRowsChange={onRowsChangeCostGoodsSold}
                enableCellSelect={true}
            />
            <Button
                onClick={() => {
                    addingRow2()
                }}
            >
                Add a New Row!
            </Button>
            <h2>Operating Cost</h2>
            <DataGrid
                columns={columns}
                rows={grid3}
                onRowsChange={onRowsChangeOperatingCost}
                enableCellSelect={true}
            />
            <Button
                onClick={() => {
                    addingRow3()
                }}
            >
                Add a New Row!
            </Button>
        </div>
    )
}

export default Dashboard
