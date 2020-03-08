const { HLTV } = require('hltv');
const myHLTV = HLTV.createInstance({loadPage: (url) => fetch(url)});

const fs = require('fs');


const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', ()  => {
    console.log('ready!');
})

client.login('Njg1MTY1OTM2OTk0NTQ5ODE5.XmUpfQ.RLdMXRJPVaRoMrvip-nkrZlx-cE')

client.on('message', message => {
    if (message.content === '!hltv matches') {
        var matches = '';
        var vs = ' vs ';
        HLTV.getMatches().then((res) => {
            console.log('called')
            for (var i = 0; i < 10; i++) {
                var entry = res[i];
                matches = matches.concat(entry.team1.name, vs, entry.team2.name, " (", 
                entry.event.name, ") ", entry.format, " ");
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