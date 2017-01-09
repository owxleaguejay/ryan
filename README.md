# daddyleagues-groupme-bot
GroupMe Bot that posts DaddyLeagues stats and info to group.

##Requirements: 
* GroupMe Account
* Google Account
* DaddyLeagues League

###Google Spreadsheet Setup:

For this whole bot to work we need a google spreadsheet full of your DaddyLeague sites data. To get this data, I have a google spreadsheet that uses the IMPORTHTML function to scrape the information from the site. All you will need to do is make some minor tweaks so to start:

Make a copy of [my spreadsheet](https://docs.google.com/spreadsheets/d/1qa0-IsLM4KTi6P69FWrmB_0KiLUdTGHleKJ2vIq9hP8/edit?usp=sharing) to edit for your data by going to file -> make a copy, and follow the instructions below. 

First, navigate to your DaddyLeagues page and go the Schedules page. Copy this URL into (A1) the very first cell's formula, should look something like below:

=IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/schedules","table",4)

The sheet should now populate with the your current week scheduled matchups from DaddyLeagues.

After that, you will want to continue to on to the second sheet called "Team Stats". You will want to navigate to your DaddyLeagues team stats page and copy the URL into the correct cells. The following cells should look similar to below:

* A1: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/team","table",1)
* A7: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/team","table",2)
* A13: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/team","table",3)
* A19: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/team","table",4)
* A25: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/team","table",5)
* A31: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/team","table",6)

Next up is the third sheet called "Player Stats". You will want to navigate to your DaddyLeagues players stats page and copy that URL into the formulas again. Should look similar to the following cells:

* A1: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/player","table",1)
* A7: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/player","table",2)
* A13: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/player","table",3)
* A19: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/player","table",4)
* A25: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/player","table",5)
* A31: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/stats/player","table",6)

Finally, the last sheet called "Standings". You will want to navigate to your DaddyLeagues Conference standings page and copy that URL into the formulas. Should look similar to the following cells:

* A1: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/standings/conference","table",1)
* A20: =IMPORTHTML("https://daddyleagues.com/YOUR_LEAGUE_NAME/standings/conference","table",2)

***IMPORTANT*** - In your spreadsheet, go to file -> spreadsheet settings -> recalculation and set it to 'on change and every minute' so that your spreadsheet is constantly updating the data from your DaddyLeagues site.

Great you now should have 4 sheets filled with all the data the groupme bot needs to post. Now you'll need to get your spreadsheet key. Get this key by checking your spreadsheets URL, example is the bolded X's below.

docs.google.com/spreadsheets/d/__XxXxxXxXXxxXXXxX__/edit?usp=sharing

###Files that need to change to make it yours
* bot.js file - Change LEAGUE_NAME to your league's name and change SPREADSHEET_KEY to your google spreadsheet key.
* .env file - Change YOUR_GROUPME_BOT_ID to your groupme bots ID.

###Deployment
I suggest following [this tutorial](https://github.com/groupme/bot-tutorial-nodejs) as that is what I used to deploy this a number of other bots I use.
