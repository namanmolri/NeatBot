const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var persist_id = 1;
const fetch = require('node-fetch');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
   token: auth.token,
   mainID: auth.mainID,
   weather_api: auth.weather_api,
   movie_api: auth.movie_api,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');


});

bot.on('message', message => {
    if (message.author.bot) {
        return
    }
    if (message.content.startsWith('hi bot') || message.content.startsWith('Hi bot') ) {
       const embed = new Discord.MessageEmbed()
       .setTitle('Hey, I am the offical bot for this channel.')
       .setAuthor('<--- Here is a photo of me', bot.user.avatarURL())
       .setDescription("Please prefix all commands to me with a '!'\n My capabilities include: \n 1) Calling on the admin (CMD: admin)\n 2) Playing ping pong :) (CMD: ping)\n 3) Giving the weather for an area using its 5-digit zipcode or name of state (CMD: weather ##### or weather <state name> ) \n 4) You can get detailed links and recommendationsfor movies from me (CMD: movie <movie name> )")
       message.reply({embed})

    } else {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);

        if (cmd === 'ping') {
            message.reply('Pong!');
        } 
        else if(cmd === 'intro') {
            message.reply("Wecome to the NM server. Hope you have a good time. Try 'Hi bot' to get instructions to use NeatBot.")
        }
        else if (cmd === 'admin') {
            bot.users.cache.get(auth.mainID).send("You are on call on the NM server by: " + message.author.username)
        }
        else if (cmd === 'weather') {
            if (args != '') {
                    
                if (!isNaN(parseInt(args))) { // check to see if the command suffixed with "!weather" is a number or not. 
                   let zipCode = message.content.split(" ")[1];
                
                   if (zipCode === undefined || zipCode.length != 5) {
                        message.reply(' Invalid zipcode ' + zipCode + '. Please type an existing 5 digit zipcode.'); 
                        
                   } else {
                     fetch('http://api.openweathermap.org/data/2.5/weather?zip=' +zipCode+',us&APPID='+auth.weather_api)
                     .then(response => {return response.json()}).then(parsedWeather =>  {
                    
                        if (parsedWeather.cod === '404') {
                           message.reply(' No information available for this zipcode');

                        } else {
                           message.reply(print_weather(message, parsedWeather));
                        }
                    
                     })
                  }
                } else {
                    let city_code = args
                    fetch('http://api.openweathermap.org/data/2.5/weather?q=' +city_code+'&APPID='+auth.weather_api)
                     .then(response => {return response.json()}).then(parsedWeather => {

                        if (parsedWeather.cod === '404') {
                            message.reply(' City '+city_code+' does not exist. Please try again with a valid city.');

                        } else {
                            message.reply(print_weather(message, parsedWeather));
                            
                        }
                    })
                
                }
            } else {
                message.reply(' Empty argument. Please enter a valid zipcode or city name.' );
            
            }
        } 
        else if (cmd === 'movie') {
            var i =0;
            if (args != '' && args != undefined) {
                 let movie_name = args
                fetch('https://api.themoviedb.org/3/search/movie?api_key='+auth.movie_api+'&query='+movie_name+'&language=en-US')
                .then(response => {return response.json()}).then(parsedMovie => {
                    if (parsedMovie.results.length === 0) {
                         message.reply('No information available for this movie')

                    } else {
                        persist_id = parsedMovie.results[0].id;
                        const embed = new Discord.MessageEmbed()
                        .addField('Click the links below for more details', movie_details(parsedMovie))

                        message.channel.send({embed});
                        
                    }
                    
                })
            } else {
                if (persist_id === 1) {

                    message.reply('Please append movie name to command. Try again after a few searches for recommendations based on search history.' )
                } else {
                    fetch ('https://api.themoviedb.org/3/movie/'+persist_id+'/recommendations?api_key='+auth.movie_api+'&language=en-US&page=1')
                    .then(response => {return response.json()}).then(parsedMovie => {
                      const embed = new Discord.MessageEmbed()
                      .addField('Here are some recommendations based on your previous searches: ', movie_details(parsedMovie))
                      message.channel.send({embed})
                    }) 
                }
                
            }
        }
        else if (cmd === 'spec') {
            message.channel.send("See or Change?")
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {time: 10000});
            collector.on('collect', message => {
                if (message.content === "See") {
                message.channel.send("You Want To See Someones Spec OK!");
            } else if (message.content == "Change") {
                message.channel.send("You Want To Change Your Spec OK!");
            }
            })
        }
    }
})

 // print weather parses all the data from open weather API and prints it in presentable format. 
function print_weather (message, parsedWeather) {
    let name = parsedWeather.name
    let country = parsedWeather.sys.country
    let forecast = parsedWeather.weather[0].main
    let curr_temp = parsedWeather.main.temp -273.15
    let high = parsedWeather.main.temp_max -273.15
    let low = parsedWeather.main.temp_min -273.15 
    let sunrise =  parsedWeather.sys.sunrise
    let sunset = parsedWeather.sys.sunset
    let requested_format = 'C';
    if (message.content.includes('in f') || message.content.includes('in F')) {
        requested_format = 'F';
        curr_temp = (curr_temp)*9/5 + 32;
        high = (high)*9/5 + 32;
        low = (low)*9/5 +32;
    }
    let unix_timestamp_1 = sunrise;
    let unix_timestamp_2 = sunset;

    let date_sunrise = new Date(unix_timestamp_1 * 1000);
    let hours_sunrise = date_sunrise.getHours();
    let minutes_sunrise =  date_sunrise.getMinutes().toString();
    let seconds_sunrise =  date_sunrise.getSeconds().toString();

    let sunrise_ajusted = 'Sunrise: ' +hours_sunrise+ ':' +minutes_sunrise.substring(-2)+
                         ':' + seconds_sunrise.substring(-2) + ' UTC';

    
    let date_sunset = new Date(unix_timestamp_2 * 1000);
    let hours_sunset = date_sunset.getHours();
    let minutes_sunset =  date_sunset.getMinutes().toString();
    
    let seconds_sunset =  date_sunset.getSeconds().toString();
    let sunset_ajusted = 'Sunset: ' +hours_sunset+ ':' +minutes_sunset.substring(-2)+ 
                         ':' +seconds_sunset.substring(-2) + ' UTC';

    let stuff = ' \nThe current weather at location ' +name+ ', ' +country+ ' is:' +'\n'+
                'Forecast: ' +forecast+ '\n'+ 'Current Temperature: ' +Math.round(curr_temp)+ 
                ' \u00B0 ' +requested_format+ '\n'+ 'High: ' +Math.round(high)+ ' \u00B0 ' +requested_format+
                '\n'+ 'Low: ' +Math.round(low)+ ' \u00B0 ' +requested_format+ '\n' +sunrise_ajusted+ '\n'+sunset_ajusted;
    return stuff;
}
// creates a text with the embeded url to be added to the message sent by the bot as an embeded link. 
function movie_details (parsedMovie) {
    var text = ""
    let i = 0;
    var year;

    for (i = 0; i <5; i++) {
        year = parsedMovie.results[i].release_date.substring(0,4);
        text = text + '[' + parsedMovie.results[i].title + ']('
         + 'https://themoviedb.org/movie/'+parsedMovie.results[i].id+'?api_key=' +auth.movie_api + ')' + 
         '    ('+ year + ')' + ' \n' 
    }
    return text;
}

bot.login(auth.token);
