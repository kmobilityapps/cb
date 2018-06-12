var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());


var fs = require("fs");

const request = require("request");

var NLTunnel = require('node-local-tunnel');
    var options = {
      localBase : 'localhost:3000'
    };
    NLTunnel.client(options);



app.get('/listUsers', function (req, res) {

    res.json({ text: 'You have successfully integrated this API from AKs Laptop! '});
   
 })

 app.post('/test', function (req, res) {
    console.log(req.body.queryResult.parameters);
    console.log(req.body.queryResult['queryText']);
    var fulfillmentText = req.body.queryResult.fulfillmentText;
    console.log(fulfillmentText);
    /*request.get('http://localhost:3000/listUsers', function(error, response, body) {  
        //console.log('Inside GET');
        output = JSON.parse(body).text;
        //console.dir(output);
        res.json({ fulfillmentText: output });
   });*/

   var api_method = req.body.queryResult.parameters.api_method;
   var api_service = req.body.queryResult.parameters.api_service;
   var api_object = req.body.queryResult.parameters.api_object;
   var api_add_info = req.body.queryResult.parameters.api_add_info;

   var value;
   value = getValues(api_method, api_service, api_object, api_add_info);

   //fulfillmentText = fulfillmentText.replace('&api_value', value);
   res.json({ fulfillmentText: "success" });

 })


function getValues(api_method, api_service, api_object, api_add_info){
  var serviceURL = 'http://52.172.47.237:8086/mpaServiceV3';
  var parameters = '?portfolioId=1&programId=1&projectId=1&dataDate=30-Apr-2017&chartType=subpacakgeProgress';
  var access_token = '&access_token=d1980e8c-3b3f-4da0-aed2-7dc3e138ec76';
  var finalURL = serviceURL + '/' + api_service + parameters + access_token;
  var api_value;
  console.log('Final URL is ' + finalURL);
  request.get(finalURL, function(error, response, body) {  
        api_value = JSON.parse(body).resObject[0][api_object];
        console.log('Cumulative Progress is ' + api_value);
        //res.json({ fulfillmentText: 'test' });
   });

  return api_value;
}
 
app.listen(port);

console.log('cbwebhook RESTful API server started on: ' + port);



