var request = require('request');

var getWeather = (lat,long,callback)=>{
    request({
        url:`https://api.darksky.net/forecast/d6028bf671acbd938b957d713d9fe777/${lat},${long}`,
        json:true,
        },(error,response,body)=>{
            if(error){
                callback("Unable to connect to server");
            }
            else if(response.statusCode==400){
                callback("Invalid Argument Error");
            }
            else if(response.statusCode === 200){
                // console.log(JSON.stringify(body,undefined,2));
                var date =new Date((body.daily.data[3].time)*1000);
                var dates= {
                    first:new Date((body.daily.data[1].time)*1000),
                    second:new Date((body.daily.data[2].time)*1000),
                    third:new Date((body.daily.data[3].time)*1000),
                    fourth:new Date((body.daily.data[4].time)*1000),
                    fifth:new Date((body.daily.data[5].time)*1000),
                    sixth:new Date((body.daily.data[6].time)*1000),
                    seventh:new Date((body.daily.data[7].time)*1000)
                }
                callback(undefined,{
                    Temperature:Math.round(((body.currently.temperature-32)*5/9)*100)/100,
                    apparentTemperature:Math.round(((body.currently.apparentTemperature-32)*5/9)*100)/100,
                    Weather:{
                        first:{
                            completeDate:`${(dates.first).getDate()}-${(dates.first).getMonth()}-${(dates.first).getFullYear()}`,
                            summary:body.daily.data[1].summary
                        },
                        second:{
                            completeDate:`${(dates.second).getDate()}-${(dates.second).getMonth()}-${(dates.second).getFullYear()}`,
                            summary:body.daily.data[2].summary
                        },
                        third:{
                            completeDate:`${(dates.third).getDate()}-${(dates.third).getMonth()}-${(dates.third).getFullYear()}`,
                            summary:body.daily.data[3].summary
                        },
                        fourth:{
                            completeDate:`${(dates.fourth).getDate()}-${(dates.fourth).getMonth()}-${(dates.fourth).getFullYear()}`,
                            summary:body.daily.data[4].summary
                        },
                        fifth:{
                            completeDate:`${(dates.fifth).getDate()}-${(dates.fifth).getMonth()}-${(dates.fifth).getFullYear()}`,
                            summary:body.daily.data[5].summary
                        },
                        sixth:{
                            completeDate:`${(dates.sixth).getDate()}-${(dates.sixth).getMonth()}-${(dates.sixth).getFullYear()}`,
                            summary:body.daily.data[6].summary
                        },
                        seventh:{
                            completeDate:`${(dates.seventh).getDate()}-${(dates.seventh).getMonth()}-${(dates.seventh).getFullYear()}`,
                            summary:body.daily.data[7].summary
                        }
                    }
                });
            }
            else{
                callback("Errors in Key");
            }
    });
}

module.exports.getWeather = getWeather;