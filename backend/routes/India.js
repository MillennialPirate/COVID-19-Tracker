const router = require('express').Router();
const bodyParser = require('body-parser');
const https = require('https');
router.route('/').post((req, res) => {
    const country = "India";
    const url = "https://covid-api.mmediagroup.fr/v1/cases?country=" + country;
    var dataSend = {};
    https.get(url, function(response){
        response.on('data', function(data){
            const countryData = JSON.parse(data);
            console.log(countryData);
        })
    })
    res.json("Done!");
})

module.exports = router;

