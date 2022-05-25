# NeatBot

To Download and use:
   Download the zip of this repository and unzip the folder. <br><ul>Navigate to the folder and run the command ```node bot.js``` and it will launch the bot.<ul> Uou can add it to your server by looking up its name: ```NeatBot#5208```. (The bot needs an auth (API KEY) for itself, the movieDB app and Weather app, which is not provided in this code but can be generated on Discord and the other relevant services and put into the ```auth.json``` file to allow the fucntionalities to function.)

INTRODUCTION:

This a bot I worked on to understand the basics of API use and how to connect to resources and parse knowledge from them into a legible format. The other goal for this project is to learn better UI and frontend design. The application is not the most complicated, but a lot of my time has been poured into learning user requirements and making it interesting to use.

The NeatBot is a call based one so unless the messages do not written with the special prefix, followed by the command word, the bot does not reply with the specific information requested by the user in the Discord Server channel. 

<strong>Important: All commands of the bot use "!" as a prefix. (no spaces between prefix and command.)

Exception: When a user is new and unaware of the prefix requirements, they can just call the bot
using "Hi bot" as a command and it lists all its commands and how it can be used.</strong>

<strong>Features of the bot:</strong>

1) <strong>Ping & Intro:</strong> are the simplest commands in the bots arsenal. Ping will reply with "pong" while the
   intro command will introduce the bot to the user calling it and greet them. 


2) <strong>Admin:</strong> this is a command used to ping the admin/s of the server using the bot when they
   are expected by the users of the server. The user that invokes this command, their tag 
   accompanies the message letting the admin know who called for them.
   
When "admin" command is used in the server. Here the command has sent a DM to the admin (only admin in the screenshot is me, so I get the text)
<img width="1679" alt="Screenshot 2020-10-10 at 1 47 43 PM" src="https://user-images.githubusercontent.com/56141766/95661707-58f01780-0aff-11eb-8675-bb3930c40af4.png">

3) <strong>Weather:</strong> 
  - The NeatBot can be used to procure the weather from the openweather.com website. I use the open source API 
    to aquire the data from the source and is then parsed into legible data and the NeatBot provides the
    data to the caller. 
  
  - The website allows us to call for the weather data of the place with zipcode(only in the USA) and by city name's (worldwide).
    All the data received is parsed into readable format which follows the temperature and time format given by the user. 
  
  - If the weather command is not given a suffixed it also prompts the user with the message asking for a proper suffix. It also
    prompts the user when it thinks they have provided the wrong zipcode or city name. 
 
When user prompts the bot with the "weather" command suffixed with a US zipcode.
<img width="487" alt="Screenshot 2020-09-04 at 1 31 08 PM" src="https://user-images.githubusercontent.com/56141766/95799253-1c204e00-0cc2-11eb-8ecc-1ad314852bc7.png">


When user prompts the bot with the "weather" command suffixed with a city name.
<img width="565" alt="Screenshot 2020-09-04 at 1 31 34 PM" src="https://user-images.githubusercontent.com/56141766/95640156-66f35900-0a69-11eb-9f16-33f03e583a9b.png">

When user prompts the bot with the "weather" command suffixed with nothing.
<img width="640" alt="Screenshot 2020-09-04 at 1 31 45 PM" src="https://user-images.githubusercontent.com/56141766/95640367-7c1cb780-0a6a-11eb-9f03-bb59bf30b406.png">

4) <strong>Movie:</strong> The NeatBot can be used to access theMovieDB server to get links to movies from a search inside the server. The caveats to
   this feature are: 
   
    - when "movie" is called with the prefix with the movie name or a few of the search characters the api lets us access the page 
      with the movie names and corresponding to the search terms. The names that are shown are also links to those movies. 
      
     - The search is also setup such that if the command is not suffixed with the movie name the very first time the user is asked 
       to provide one. But once a movie search is conducted the last search term is saved and if "movie" is called again without 
       a suffix a random set of movies related to the last search term are shown to user as a suggestion. 
       

When the "movie" command is called with a suffix.

<img width="522" alt="Screenshot 2020-10-10 at 1 38 07 PM" src="https://user-images.githubusercontent.com/56141766/95661502-e16db880-0afd-11eb-8e25-1cd28ed597f0.png">

When the "movie" command is called without a suffix without any previous searches.
<img width="1011" alt="Screenshot 2020-09-04 at 1 32 06 PM" src="https://user-images.githubusercontent.com/56141766/95661533-111cc080-0afe-11eb-942e-e25d32a41ad4.png">

When the "movie" command is called without a suffix after one or more searches.
<img width="965" alt="Screenshot 2020-10-10 at 1 38 22 PM" src="https://user-images.githubusercontent.com/56141766/95661548-2f82bc00-0afe-11eb-9480-9c8de723911e.png">

---------------------------------------------------------------------------------
<br><br>

<strong>Learning Outcomes:</strong> This project was starting to keep myself engaged during the summer months, but in the process I have learnt a lot. Some of these learning outcomes were: 

  - Learning JavaScript while building a project. Learning how to find and use the right features in JS
    to build a foolproof and working bot.
   
  - Getting familiar with the Discord API and understanding its features and learning how to pick the 
    right libraries and node modules that allow for all features to be developed and published.
  
  - Learning about nodeJS and how to use it as well as integrate it into my JS project. Also learnt how 
    to use authorization files to forbid essential bot and user information to be easily accessible. 
    
  - Getting some much needed experience in UX design to understand user requirements, shortcomings and 
    building a product around those needs. Also learned how important is to plan the design of a product
    before production to allow it to be accepted and succeed in users hands.
  
  
 (More Features to be added to the bot. A similar bot might be made for twitter.)
 
 <br> <br> <br>
 THE END.
