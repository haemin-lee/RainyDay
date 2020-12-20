import express from 'express'
import axios from 'axios'


let router = express.Router()

// dew it
// Proxy request to flask server
router.post('/', async (req, res, next) => {
    try {
        //    const user_id = req.headers['X-Authenticated-User']
        const data = req.body

        let costs = []
        let revs = []

        for (let i = 0; i < 12; i++) {
            costs.push(0)
            revs.push(0)
        }
        console.log("data:", data)
        for (const statement of data.data) {
            // posting date is from 1-12 when indices are 0-11
            let index = Number(statement['postingDate'].substring(5, 7)) - 1
            if (statement.transactionType === 'CREDIT') {
                revs[index] += Number(statement.amount)
            } else {
                costs[index] += Number(statement.amount)
            }
        }
        //avoid linear dependence
        for (let i = 0; i < 12; i++) {
            if(costs[i] === 0 || isNaN(costs[i])){
                costs[i] = 12-i
            }
            if(revs[i] === 0 || isNaN(revs[i])){
                revs[i] = (12-i) * (12-i)/2
            }
        }
        let lin_reg_input = { costs: costs, revs: revs }
        console.log(costs)
        console.log(revs)
        let lin_reg_output = await axios.post(
            'http://localhost:5000/lin_regression',
            lin_reg_input
        )
        //fixed_costs, ratio
        console.log("lin reg output")

        console.log(lin_reg_output.data)
        lin_reg_output = lin_reg_output.data

        let prediction_input = {
            fixed_cost_mo: lin_reg_output.fixed_costs,
            var_cost_mo: lin_reg_output.ratio,
            norm_rev: (revs[0] + revs[1]) / 2,
            curr_rev: (revs[10] + revs[11]) / 2,
            vacc_levels: data.vacc_levels,
            past_revs: revs,
            past_costs: costs
        }
        console.log("prediction_input", prediction_input)
        let predict_output = await axios.post(
            'http://localhost:5000/predict',
            prediction_input
        )
        predict_output = predict_output.data
        console.log("predict output")
        console.log(predict_output)
        res.json(predict_output)
    } catch (e) {
        next(e)
    }
})

export default router
