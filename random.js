#!/usr/bin/env node
var crypto = require('crypto');
var request = require('request').defaults({jar: true});

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

  var options = {
    url: currentURL,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }
  }
  request(options, check);
}

function check(err, res, body){
  if(res == null){
    return console.log("No response?");
  }
  var status = res.statusCode;
  console.log(count + getPad() + status + " " + currentURL);
  if(status == 404){
    helpRequest(randomURL());
  } else {
    console.log(body);
  }
}

function randomURL(){
  var base = "https://www.github.com/dp/B01";
  var rand = crypto.randomBytes(4).toString('hex').toUpperCase();
  rand = rand.substring(0, rand.length - 1);
  return base + rand;
}

function getPad(){
  var pad = "   ";
  if(count > 9)
    pad = pad.substring(0, pad.length - 1);
  if(count > 99)
    pad = pad.substring(0, pad.length - 1);
  return pad;
}
