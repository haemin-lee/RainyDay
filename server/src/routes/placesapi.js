const axios = require('axios')
const router = require('express').Router()

module.exports = router
const key = process.env.GOOGLE_API_KEY

router.get('/cities', async (req, res, next) => {
 try {
   	const city = encodeURI(req)
   	const type = encodeURI("(cities)")
   	const {data} = await axios.get(
   
	`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}&type=${type}&key=${key}`
	   )
	   res.json(data)
	   } 
	 catch (err) {
	  next(err)
	}
})