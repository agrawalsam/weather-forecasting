var request  = require("request");


var geocodeAddress = (item,callback) =>{
    var url = encodeURIComponent(item);
    request({
        url:`http://www.mapquestapi.com/geocoding/v1/address?key=4AjhgVAhoWLeMGfVfMymLAUeyN8DIjG8&location=${url}`,
        json:true,
    },(error,response,body)=>{
        if(error){
            callback("Unable to connect to mapquest server");
        }
        else if(body.info.statuscode===400){
            callback("Invalid address details");
        }
        else if(body.info.statuscode===0){
            callback(undefined,{
                address:body.results[0].providedLocation.location,
                lattitude:body.results[0].locations[0].latLng.lat,
                longitude:body.results[0].locations[0].latLng.lng
            });
        }
    });
};

module.exports = {
    geocodeAddress
}