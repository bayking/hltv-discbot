// init hltv
const { HLTV } = require('hltv');
const myHLTV = HLTV.createInstance({loadPage: (url) => fetch(url)});

// init discord
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', ()  => {
    console.log('ready!');
})

client.login('Njg1MTY1OTM2OTk0NTQ5ODE5.XmUpfQ.RLdMXRJPVaRoMrvip-nkrZlx-cE')

// !hltv matches
client.on('message', message => {
    if (message.content === '!hltv matches') {
        var matches = '';
        var vs = ' vs ';
        HLTV.getMatches().then((res) => {
            console.log('matches called');
            for (var i = 0; i < 10; i++) {
                var entry = res[i];
                var posix = JSON.stringify(entry.date);
                if (posix != undefined) {
                    var trimmedString = posix.substring(0, 10);
                    matches = matches.concat(convert(trimmedString), " ", entry.team1.name, vs, entry.team2.name, " (", 
                    entry.event.name, ") ", entry.format, " ");
                } else {
                    matches = matches.concat(entry.team1.name, vs, entry.team2.name, " (", 
                    entry.event.name, ") ", entry.format, " ");
                }
                if(entry.map != undefined) {
                    matches = matches.concat(entry.map, " ");
                } 
                else if (entry.maps != undefined) {
                matches = matches.concat(entry.maps, " ");
                }
                if (entry.live == true) {
                    matches = matches.concat("LIVE ")
                }
                matches = matches.concat("\n", "\n");
          }
           message.channel.send(matches);
      });
    }
});

// !hltv results
client.on('message', message => {
    if (message.content === '!hltv results') {
        var matches = '';
        var vs = ' vs ';
        HLTV.getResults({pages: 1}).then((res) => {
            console.log('results called');
            for (var i = 0; i < 10; i++) {
                var entry = res[i];
                var posix = JSON.stringify(entry.date);
                var trimmedString = posix.substring(0, 10);

                matches = matches.concat(convert(trimmedString), " ", entry.team1.name, vs, entry.team2.name, " (", 
                entry.event.name, ") ", entry.format,". ");

                if(entry.map != undefined) {
                    matches = matches.concat(entry.map, " ");
                } 
                else if (entry.maps != undefined) {
                matches = matches.concat(entry.maps, " ");
                }
                if (entry.live == true) {
                    matches = matches.concat("LIVE ")
                }
                matches = matches.concat('. Result: ', entry.result, "\n", "\n");
          }
           message.channel.send(matches);
      });
    }
});

// !hltv top20
client.on('message', message => {
    if (message.content === '!hltv top20') {
        console.log('top20 called');
        var ranks = '';
        var vs = ' vs ';
        HLTV.getTeamRanking().then((res) => {
            console.log('top20 called');
            for (var i = 0; i < 20; i++) {
                var entry = res[i];
                ranks = ranks.concat('Rank: ', entry.place, ' Team: ', entry.team.name, ' Points: ', entry.points, "\n");
          }
           message.channel.send(ranks);
      });
    }
});

// !hltv help
client.on('message', message => {
    if (message.content === '!hltv help') {
        message.channel.send('Available commands \n!hltv matches -> Display ongoing and current matches \n!hltv top20 -> Display top20 ranked teams \n!hltv results -> Display first page of recents results')
    }
})

function convert(posix){

    // Unixtimestamp
    var unixtimestamp = posix;
   
    // Months array
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);
   
    // Year
    var year = date.getFullYear();
   
    // Month
    var month = months_arr[date.getMonth()];
   
    // Day
    var day = date.getDate();
   
    // Hours
    var hours = date.getHours();
   
    // Minutes
    var minutes = "0" + date.getMinutes();
   
    // Seconds
    var seconds = "0" + date.getSeconds();
   
    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return convdataTime; 
   }