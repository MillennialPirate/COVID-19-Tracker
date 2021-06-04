const router = require('express').Router();
const bodyParser = require('body-parser');
const https = require('https');
router.route('/time').post((req, res) => {
    const state = req.body.state;
    const url = "https://api.covid19india.org/v4/min/timeseries.min.json";
    var dataSend = [];
    try{
        https.get(url, function(response){
            if(response.statusCode != 200)
            {
                res.json("Error");
                return;
            }
            var data = '';
            response.on('data', function(chunk){
                data += chunk;
            })
            response.on('end', function(){
                const obj = JSON.parse(data);
                // res.json(obj[state].dates);
                const dates = obj[state].dates;
                const arr = []; 
                for(key in dates)
                {
                    var val = dates[key];
                    var data1 = {
                        date : key, 
                        confirmed : val.total.confirmed
                    };
                    arr.push(data1);
                }
                arr.reverse();
                for(var i = 0; i < 14; i++)
                {
                    dataSend.push(arr[i]);
                }
                dataSend.reverse();
                res.json(dataSend);
            })
        })
    }
    catch(err)
    {
        res.json('Error');
        return;
    }
})
router.route('/').get((req, res) => {
    const country = req.body.country;
    const url = "https://api.covid19india.org/v4/min/data.min.json";
    
    var dataSend = [];
    try{
        https.get(url, function(response){
            if(response.statusCode != 200)
            {
                res.json("Error");
                return;
            }
            //in case of parse errors => it was due to not including all the chunks of the data 
            //to avoid that do the following stuff
            var data = '';
            response.on('data', (chunk) => {
                data += chunk;
            })
            response.on('end', function(){

                const countryData  = JSON.parse(data);
                var obj = countryData;
                for(var key in obj)
                {
                    if(obj.hasOwnProperty(key))
                    {
                        var val =  obj[key];
                        var key1 = "";
                        if(key === "AN")
                        {
                            key1 = "Andaman and Nicobar"
                        }
                        if(key === "AP")
                        {
                            key1 = "Andhra Pradesh"
                        }
                        if(key === "AR")
                        {
                            key1 = "Arunachal Pradesh"
                        }
                        if(key === "AS")
                        {
                            key1 = "Assam"
                        }
                        if(key === "BR")
                        {
                            key1 = "Bihar"
                        }
                        if(key === "CG")
                        {
                            key1 = "Chattisgarh"
                        }
                        if(key === "DL")
                        {
                            key1 = "Delhi"
                        }
                        if(key === "GA")
                        {
                            key1 = "Goa"
                        }
                        if(key === "GJ")
                        {
                            key1 = "Gujarat"
                        }
                        if(key === "HR")
                        {
                            key1 = "Harayana"
                        }
                        if(key === "HP")
                        {
                            key1 = "Himachal Pradesh"
                        }
                        if(key === "JK")
                        {
                            key1 = "Jammu and Kashmir"
                        }
                        if(key === "JH")
                        {
                            key1 = "Jharkhand"
                        }
                        if(key === "KA")
                        {
                            key1 = "Karnataka"
                        }
                        if(key === "KL")
                        {
                            key1 = "Kerela"
                        }
                        if(key === "LD")
                        {
                            key1 = "Lakshadweep Islands"
                        }
                        if(key === "MP")
                        {
                            key1 = "Madhya Pradesh"
                        }
                        if(key === "MN")
                        {
                            key1 = "Manipur"
                        }
                        if(key === "ML")
                        {
                            key1 = "Meghalaya"
                        }
                        if(key === "MZ")
                        {
                            key1 = "Mizoram"
                        }
                        if(key === "NL")
                        {
                            key1 = "Nagaland"
                        }
                        if(key === "OD")
                        {
                            key1 = "Odisha"
                        }
                        if(key === "PY")
                        {
                            key1 = "Pondicherry"
                        }
                        if(key === "PB")
                        {
                            key1 = "Punjab"
                        }
                        if(key === "RJ")
                        {
                            key1 = "Rajasthan"
                        }
                        if(key === "SK")
                        {
                            key1 = "Sikkim"
                        }
                        if(key === "LA")
                        {
                            key = "Ladakh"
                        }
                        if(key === "OR")
                        {
                            key = "Orissa"
                        }
                        if(key === "TN")
                        {
                            key1 = "Tamil Nadu"
                        }
                        if(key === "TG")
                        {
                            key1 = "Telengana"
                        }
                        if(key === "TR")
                        {
                            key1 = "Tripura"
                        }
                        if(key === "UP")
                        {
                            key1 = "Uttar Pradesh"
                        }
                        if(key === "UT")
                        {
                            key1 = "Uttarakhand"
                        }
                        if(key === "WB")
                        {
                            key1 = "West Bengal"
                        }
                        if(key === "CH")
                        {
                            key1 = "Chandigarh"
                        }
                        if(key === "DNHDD")
                        {
                            key1 = "Dadra & Nagar Haveli and Daman & Diu"
                        }
                        if(key === "DN")
                        {
                            key1 = "Dadra & Nagar Haveli"
                        }
                        if(key === "OT")
                        {
                            key1 = "Other Territory"
                        }
                        if(key === "CT")
                        {
                            key1 = "Chattisgarh"
                        }
                        if(key === "MH")
                        {
                            key1 = "Maharashtra"
                        }
                        if(key1 === "")
                        key1 = key;
                        var pData = {
                            stateCode: key,
                            state : key1, 
                            tested : val.total.tested, 
                            confirmed : val.total.confirmed,
                            recovered: val.total.recovered, 
                            deaths : val.total.deceased , 
                            vaccinated : val.total.vaccinated
                        }
                        dataSend.push(pData);
                    }
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

