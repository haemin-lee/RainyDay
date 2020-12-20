import express from 'express'
import axios from 'axios'

let router = express.Router()

// dew it
// Proxy request to flask server
router.post('/', async (req, res, next) => {

//    const user_id = req.headers['X-Authenticated-User']
    const data = req.body
    let statement;

    let costs = []
    let revs = []
    let i;

    for (i = 0; i < 12; i++){
        costs.push(0)
        revs.push(0)
    }

    for (statement of data.items){
        let index = parseInt(statement["posting-date"].substring(5, 7))
        if(statement.transactionType === "CREDIT"){
            revs[index] += statement.amount
        }
        else{
            costs[index] += statement.amount
        }
    }

    let lin_reg_input = {costs: costs, revs: revs}
    const lin_reg_output = await axios.post("http://localhost:5000/lin_regression", lin_reg_input)
    //fixed_costs, ratio
    
    let prediction_input = {
        fixed_cost_mo: lin_reg_output.fixed_costs,
        var_cost_mo: lin_reg_output.put.ratio,
        norm_rev: (revs[0] + revs[1]) / 2,
        curr_rev: (revs[11] + revs[12])/2,
        vacc_levels: data.vacc_levels
    }
    const predict_output = await axios.post("http://localhost:5000/predict", prediction_input)

    return predict_output
})

export default router
