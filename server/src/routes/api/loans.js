import express from 'express'
import axios from 'axios'

let router = express.Router()

// dew it
// Proxy request to flask server
router.get('/:zip', async (req, res, next) => {
	const url = 'https://www.sba.gov/api/content/search/offices.json?pageSize=20&start=0&q=business&address=' + req.params.zip + '&pageNumber=1'

	try {
    	const {data} = await axios.get(url) 
        res.json(data)
    } catch(e) {
    	next(e)
    }
   
})

export default router
