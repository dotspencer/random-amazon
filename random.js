#!/usr/bin/env node
var crypto = require('crypto');
var request = require('request');

var count = 0;
var max = 100;
var currentURL = randomURL();
helpRequest(currentURL);

function helpRequest(url){
  if(count >= max){
    return;
  }
  currentURL = url;
  count++;
  request(currentURL, check);
}

function check(err, res, body){
  if(res){
    var status = res.statusCode;
    if(status != 404){
      console.log(currentURL);
    } else {
      var pad = "   ";
      if(count > 9)
        pad = pad.substring(0, pad.length - 1);
      if(count > 99)
          pad = pad.substring(0, pad.length - 1);
      console.log(count + pad + status + " " + currentURL);
      helpRequest(randomURL());
    }
  }
  else {
    console.log("No response?");
  }
}

function randomURL(){
  var base = "https://amazon.com/dp/B01";
  var rand = crypto.randomBytes(4).toString('hex').toUpperCase();
  rand = rand.substring(0, rand.length - 1);
  return base + rand;
}
