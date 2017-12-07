var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var GoogleSpreadsheet = require('google-spreadsheet');


var LEAGUE_NAME = "Lil Ballers";
var SPREADSHEET_KEY = "https://docs.google.com/spreadsheets/d/1ThVADyBEzKAICoSKgrYNu-PcDJYUAiH-D7N6qK7KNrM/edit?usp=sharing";
var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
//commands that will trigger the bot to post
	  botRegexSTS = /^\/stats/;
	  botRegexAFC = /^\/afcstandings/;
	  botRegexNFC = /^\/nfcstandings/;
	  botRegexSC = /^\/scores/;
	  botRegexTO = /^\/toff/;
	  botRegexPO = /^\/tpass/;
	  botRegexRO = /^\/trush/;
	  botRegexTD = /^\/tdef/;
	  botRegexPD = /^\/tdpass/;
	  botRegexRD = /^\/tdrush/;
	  botRegexPP = /^\/ppass/;
	  botRegexPRU = /^\/prush/;
	  botRegexPRE = /^\/prec/;
	  botRegexPTK = /^\/ptackle/;
	  botRegexPSK = /^\/psack/;
	  botRegexPIT = /^\/pint/;

if(request.text && botRegexSTS.test(request.text)) {
    this.res.writeHead(200);
	postMessage("Commands for " + LEAGUE_NAME + ":\n/scores\n/afcstandings\n/nfcstandings\n/toff - Team Offense Leaders\n/tpass - Team Passing Leaders\n/trush - Team Rushing Leaders\n/tdef - Team Defensive Leaders\n/tdpass - Team Defensive Passing Leaders\n/tdrush - Team Defensive Rushing Leaders\n/ppass - Leading Passers\n/prush - Leading Rushers\n/prec - Leading Receivers\n/ptackle - Leading Tacklers\n/psack - Sack Leaders\n/pint - Interception Leaders\n");
	this.res.end();
  }
 else if(request.text && botRegexSC.test(request.text)) {
    this.res.writeHead(200);
	getScores();
	this.res.end();
  }
 else if(request.text && botRegexTO.test(request.text)) {
    this.res.writeHead(200);
	getTotOff();
	this.res.end();
  }
 else if(request.text && botRegexPO.test(request.text)) {
    this.res.writeHead(200);
	getTeamPass();
	this.res.end();
  }
   else if(request.text && botRegexRO.test(request.text)) {
    this.res.writeHead(200);
	getTeamRush();
	this.res.end();
  }
   else if(request.text && botRegexTD.test(request.text)) {
    this.res.writeHead(200);
	getTotDef();
	this.res.end();
  }
 else if(request.text && botRegexPD.test(request.text)) {
    this.res.writeHead(200);
	getDefPass();
	this.res.end();
  }
   else if(request.text && botRegexRD.test(request.text)) {
    this.res.writeHead(200);
	getDefRush();
	this.res.end();
  }   
  else if(request.text && botRegexPP.test(request.text)) {
    this.res.writeHead(200);
	getPlayerPass();
	this.res.end();
  }
  else if(request.text && botRegexPRU.test(request.text)) {
    this.res.writeHead(200);
	getPlayerRush();
	this.res.end();
  }
  else if(request.text && botRegexPRE.test(request.text)) {
    this.res.writeHead(200);
	getPlayerRec();
	this.res.end();
  }
  else if(request.text && botRegexPTK.test(request.text)) {
    this.res.writeHead(200);
	getPlayerTack();
	this.res.end();
  }
  else if(request.text && botRegexPSK.test(request.text)) {
    this.res.writeHead(200);
	getPlayerSack();
	this.res.end();
  }
  else if(request.text && botRegexPIT.test(request.text)) {
    this.res.writeHead(200);
	getPlayerInt();
	this.res.end();
  }
  else if(request.text && botRegexAFC.test(request.text)) {
    this.res.writeHead(200);
	getAfc();
	this.res.end();
  }  
  else if(request.text && botRegexNFC.test(request.text)) {
    this.res.writeHead(200);
	getNfc();
	this.res.end();
  }    
  else {
    console.log("don't care!");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse, options, body, botReq;

  botResponse = response;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

//function that connects to the first sheet of your google spreadsheet that has your current weeks daddy leagues scores, parses and posts.
function getScores() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "CURRENT SCORES:\n\n";
	var loop = 0;
	var maxCells = 16;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[0];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 1,
			  'max-row': 16,
			  'min-col': 1,
			  'max-col': 1,
			  'return-empty': true
			}, function(err, cells) {
			  while(loop < maxCells)
			  {
				if(cells[loop].value != false)
				{
					stringToSend += cells[loop].value.split(" ")[1] + " - " + cells[loop].value.split(" ")[0] + "   @   " + cells[loop].value.split(" ")[3] + " - " + cells[loop].value.split(" ")[2] + "\n";
				}
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}

//function that connects to the second sheet of your google spreadsheet that has your leagues top five total offense, parses and posts
 function getTotOff() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE TOTAL OFFENSE:\n\n";
	var loop = 2;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[1];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 1,
			  'max-row': 6,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 11)
			  {
				  if(loop % 2 == 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " YPG" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the second sheet of your google spreadsheet that has your leagues top five passing offenses, parses and posts
 function getTeamPass() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE PASSING OFFENSE:\n\n";
	var loop = 2;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[1];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 7,
			  'max-row': 12,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 11)
			  {
				  if(loop % 2 == 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " YPG" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the second sheet of your google spreadsheet that has your leagues top five rushing offenses, parses and posts
 function getTeamRush() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE RUSHING OFFENSE:\n\n";
	var loop = 2;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[1];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 13,
			  'max-row': 18,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 11)
			  {
				  if(loop % 2 == 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " YPG" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the second sheet of your google spreadsheet that has your leagues top five total defense, parses and posts
 function getTotDef() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE TOTAL DEFENSE:\n\n";
	var loop = 2;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[1];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 19,
			  'max-row': 24,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 11)
			  {
				  if(loop % 2 == 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " YPG" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the second sheet of your google spreadsheet that has your leagues top five passing defenses, parses and posts
 function getDefPass() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE PASSING DEFENSE:\n\n";
	var loop = 2;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[1];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 25,
			  'max-row': 30,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 11)
			  {
				  if(loop % 2 == 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " YPG" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the second sheet of your google spreadsheet that has your leagues top five rushing defenses, parses and posts
 function getDefRush() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE RUSHING DEFENSE:\n\n";
	var loop = 2;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[1];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 31,
			  'max-row': 36,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 11)
			  {
				  if(loop % 2 == 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " YPG" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the third sheet of your google spreadsheet that has your leagues top five passing leaders, parses and posts
 function getPlayerPass() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE PASSING YARDS:\n\n";
	var loop = 3;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[2];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 1,
			  'max-row': 6,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 12)
			  {
				  if(loop % 2 != 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " yards" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the third sheet of your google spreadsheet that has your leagues top five rushing leaders, parses and posts
 function getPlayerRush() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE RUSHING YARDS:\n\n";
	var loop = 3;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[2];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 7,
			  'max-row': 12,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 12)
			  {
				  if(loop % 2 != 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " yards" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the third sheet of your google spreadsheet that has your leagues top five receiving leaders, parses and posts
 function getPlayerRec() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE RECEIVING YARDS:\n\n";
	var loop = 3;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[2];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 13,
			  'max-row': 18,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 12)
			  {
				  if(loop % 2 != 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " yards" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the third sheet of your google spreadsheet that has your leagues top five tacklers, parses and posts
 function getPlayerTack() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE TACKLES:\n\n";
	var loop = 3;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[2];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 19,
			  'max-row': 24,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 12)
			  {
				  if(loop % 2 != 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " tackles" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the third sheet of your google spreadsheet that has your leagues top five sack leaders, parses and posts
 function getPlayerSack() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE SACKS:\n\n";
	var loop = 3;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[2];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 25,
			  'max-row': 30,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 12)
			  {
				  if(loop % 2 != 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " sacks" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the third sheet of your google spreadsheet that has your leagues top five interception leaders, parses and posts
 function getPlayerInt() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "TOP FIVE INTERCEPTIONS:\n\n";
	var loop = 3;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[2];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 31,
			  'max-row': 36,
			  'return-empty': false
			}, function(err, cells) {  
			  while(loop < 12)
			  {
				  if(loop % 2 != 0)
				  {
					  stringToSend += cells[loop].value + ": " + cells[loop+1].value + " ints" + "\n";
				  }
				loop++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the fourth sheet of your google spreadsheet that has your standings, parses and posts afc
 function getAfc() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "";
	var loop = 0;
	var count = 0;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[3];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 3,
			  'max-row': 18,
			  'return-empty': false
			}, function(err, cells) {  
			  while(count < 16)
			  {
				stringToSend += cells[loop].value.split(".")[1] + " " + cells[loop+1].value + "-" + cells[loop+2].value + "-" + cells[loop+3].value + "\n";
				loop += 13;
				count++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}
//function that connects to the fourth sheet of your google spreadsheet that has your standings, parses and posts nfc
 function getNfc() {	
	var doc = new GoogleSpreadsheet(SPREADSHEET_KEY);
	var sheet;
	var stringToSend = "";
	var loop = 0;
	var count = 0;
	
		doc.getInfo(function(err, info) {
		  //postMessage('Loaded doc: '+info.title);
		  sheet = info.worksheets[3];
		 //postMessage('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			  sheet.getCells({
			  'min-row': 22,
			  'max-row': 37,
			  'return-empty': false
			}, function(err, cells) {  
			  while(count < 16)
			  {
				stringToSend += cells[loop].value.split(".")[1] + " " + cells[loop+1].value + "-" + cells[loop+2].value + "-" + cells[loop+3].value + "\n";
				loop += 13;
				count++;
			  }
			  postMessage(stringToSend.substring(0,400));
			});
		});
}

exports.respond = respond;
