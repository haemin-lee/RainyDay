import { useEffect, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Slider from '@material-ui/core/Slider'

import get_client from '../../../../../api/finastra'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function Predictions(props) {
    const [data, setData] = useState([])
    // TODO: display loading symbol when data is getting fetched
    // if not loading data inside component, then turn these into props instead
    const [isLoading, setIsLoading] = useState(false)

    // TODO: move these get_analysis method into dashboard
    // probably move this into AccountModal onClick anonymous function
    async function get_analysis() {
        const client = get_client()

        let transactions = await get_transactions()
        //TODO: fill this in
        transactions.vacc_levels = []
        let analysis = await client.analysis.get_analysis(transactions).data
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

        return d.data
    }

    // pass in data from get_analysis and return data in format so it can be used by nivo.
    function convert_data_into_nivo_data(data) {
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
        let num_months = data.revenues.length
        let old_num_months = data.past_revs.length

        //graph that is generated from API predictions
        let predict_nivo_data = []
        for (let i = 0; i < num_months; i++) {
            let sample = {
                month: months[i],
                revenue: data.revenues[i],
                cost: data.costs[i],
                profit: data.profits[i],
            }
            predict_nivo_data.push(sample)
        }

        //graph that is generated from past data
        let past_nivo_data = []
        for (let i = 0; i < old_num_months; i++) {
            let sample = {
                month: months[i],
                revenue: data.past_revs[i],
                cost: data.past_costs[i],
                profit: data.past_revs[i] - data.past_costs[i],
            }
            past_nivo_data.push(sample)
        }
        return [predict_nivo_data, past_nivo_data]
    }

    if (isLoading)
        return (
            <div className="loader">
                <Loader
                    type="TailSpin"
                    color="#3b42bf"
                    height={100}
                    width={100}
                    timeout={6000}
                />
            </div>
        )

    return (
        <ResponsiveBar
            data={props.data}
            keys={['revenue', 'cost', 'profit']}
            indexBy={'revenue'}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        id: 'fries',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'sandwich',
                    },
                    id: 'lines',
                },
            ]}
            borderColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    )
}

export default Predictions
