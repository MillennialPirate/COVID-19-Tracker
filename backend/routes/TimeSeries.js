const router = require('express').Router();
const bodyParser = require('body-parser');
const https = require('https');
router.route('/').post((req, res) => {
    const pincode = req.body.pincode; 
    const date = req.body.date;
    console.log(pincode + " " + date);
    const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + String(pincode) + "&date=" + String(date);
    
    var dataSend = {};
    try{
        https.get(url, function(response){
            if(response.statusCode != 200)
            {
                res.json("Error");
                return;
            }
            var data = "";
            response.on('data', function(chunk){
                data += chunk;
            })
            response.on('end', function(){
                const vaccineData = JSON.parse(data);
                var centers = [];
                for(var i = 0; i < vaccineData.sessions.length; i++)
                {
                    const centerData = vaccineData.sessions[i];
                    var ceneterInfo = {
                        name : centerData.name, 
                        id: centerData.center_id, 
                        from : centerData.from,
                        to: centerData.to ,
                        vaccine : centerData.vaccine, 
                        slots: centerData.slots, 
                        minAge : centerData.min_age_limit,
                        dose1 : centerData.available_capacity_dose1, 
                        dose2 : centerData.available_capacity_dose2,
                        fee : centerData.fee,
                    }
                    centers.push(ceneterInfo);
                }
                res.json(centers);
            })
        })
    }
    catch(err)
    {
        console.log(err);
        res.json("Error");
    }
})

module.exports = router;

