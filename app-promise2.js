require('yargonaut')
    .style('blue')
    .errorsStyle('red.bold')
    .help('chunky')

var yargs = require('yargs');
var axios = require('axios');

var argv = yargs
    .options({
        a:{
            demand:false,
            describe:'Address is required for checking weather of other addresses',
            alias:'address',
            string:true
        }
    })
    .options({
        "":{
            demand:false,
            describe:"Default Address is 632014"
        }
    })
    .command("","Going for defaults")
    .help()
    .alias('help','h')
    .argv;

if(!argv.address)
    argv.address=632014;
var encodeURI = encodeURIComponent(argv.address);
var geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=4AjhgVAhoWLeMGfVfMymLAUeyN8DIjG8&location=${encodeURI}`
axios.get(geocodeURL).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    var lat=response.data.results[0].locations[0].latLng.lat;
    var long = response.data.results[0].locations[0].latLng.lng;
    var weatherURL = `https://api.darksky.net/forecast/d6028bf671acbd938b957d713d9fe777/${lat},${long}`;
    return axios.get(weatherURL);
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`The temperature is ${temperature}F But the forecasted Temperature is ${apparentTemperature}F`);
}).catch((e)=>{
    if(e.code === 'ENOTFOUND'){
        console.log("Unable to connect to API Servers");
    }else{
        console.log(e.message);
    }
})