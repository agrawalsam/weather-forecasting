var request = require('request');
var geocode = (address)=>{
    var url = encodeURIComponent(address);
    return new Promise((resolve,reject)=>{
        request({
            url:`http://www.mapquestapi.com/geocoding/v1/address?key=4AjhgVAhoWLeMGfVfMymLAUeyN8DIjG8&location=${url}`,
            json:true,
        },(error,response,body)=>{
            if(error){
                reject("Unable to connect to mapquest server");
            }
            else if(body.info.statuscode===400){
                reject("Invalid address details");
            }
            else if(body.info.statuscode===0){
                resolve({
                    address:body.results[0].providedLocation.location,
                    lattitude:body.results[0].locations[0].latLng.lat,
                    longitude:body.results[0].locations[0].latLng.lng
                });
            }
        });
    })
    
}

geocode("").then((res)=>{
    console.log(JSON.stringify(res,undefined,2));
},(error)=>{
    console.log(error);
})