const router = require('express').Router();
const bodyParser = require('body-parser');
const https = require('https');
router.route('/global').get((req, res) => {
    const url = "https://covid19.mathdro.id/api";
    
    var dataSend = {};
    try{
        https.get(url, function(response){
            if(response.statusCode != 200)
            {
                res.json("Error");
                return;
            }
            response.on('data', function(data){

                const countryData  = JSON.parse(data);
                const confirmedCases = countryData.confirmed.value;
                const  recovered = countryData.recovered.value;
                const deaths = countryData.deaths.value;
                console.log(confirmedCases + " " + recovered + " " + deaths);
                dataSend = {
                    confirmedCases: confirmedCases, 
                    recovered: recovered, 
                    deaths: deaths
                }
                res.json(dataSend);
            })
        })
    }
    catch(err)
    {
        res.json("Error");
    }
})
router.route('/').post((req, res) => {
    const country = req.body.country;
    const url = "https://covid19.mathdro.id/api/countries/" +country;
    
    var dataSend = {};
    try{
        https.get(url, function(response){
            if(response.statusCode != 200)
            {
                res.json("Error");
                return;
            }
            response.on('data', function(data){

                const countryData  = JSON.parse(data);
                console.log(countryData);
                const confirmedCases = countryData.confirmed.value;
                const  recovered = countryData.recovered.value;
                const deaths = countryData.deaths.value;
                console.log(confirmedCases + " " + recovered + " " + deaths);
                dataSend = {
                    confirmedCases: confirmedCases, 
                    recovered: recovered, 
                    deaths: deaths
                }
                res.json(dataSend);
            })
        })
    }
    catch(err)
    {
        res.json("Error");
    }
})

module.exports = router;

