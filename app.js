const bodyParser = require('body-parser');
var geocode = require('./geocode/geocode');
var weather = require('./weather/weather');
var express = require('express');
var hbs = require('hbs');
var app = express();

const port = process.env.PORT || 3000;
var urlencoded = bodyParser.urlencoded({extended:false});
hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');

app.use(express.static(__dirname+"/public"));


app.get('/',(req,res)=>{
    res.render('home.hbs');
    },(error)=>{
        return res.status(400).send();
});

app.post('/result',urlencoded,(req,res)=>{
    if(!req.body) return res.sendStatus(400);
    var rT,raT,rfd,rfs,rsd,rss,rtd,rts,rod,ros,rid,ris,rxd,rxs,red,resu;
    geocode.geocodeAddress(req.body.input,(errorMessage,result)=>{
        if(errorMessage){
            console.log(errorMessage);
        }
        else{
            
            weather.getWeather(result.lattitude,result.longitude,(errorMessage1,result1)=>{
                if(errorMessage1){
                    console.log(errorMessage1);
                }
                else{
                    rT=result1.Temperature;
                    raT=result1.apparentTemperature;
                    rfd=result1.Weather.first.completeDate;
                    rfs=result1.Weather.first.summary;
                    rsd=result1.Weather.second.completeDate;rss=result1.Weather.second.summary;
                    rtd=result1.Weather.third.completeDate; rts=result1.Weather.third.summary;
                    rod=result1.Weather.fourth.completeDate; ros=result1.Weather.fourth.summary;
                    rid=result1.Weather.fifth.completeDate;ris=result1.Weather.fifth.summary;
                    rxd=result1.Weather.sixth.completeDate; rxs=result1.Weather.sixth.summary;
                    red=result1.Weather.seventh.completeDate; resu=result1.Weather.seventh.summary;
                    res.render('result.hbs',{
                        rT,raT,rfd,rfs,rsd,rss,rtd,rts,rod,ros,rid,ris,rxd,rxs,red,resu
                    });
                }
            });
        }
    });
});

app.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`);
});



