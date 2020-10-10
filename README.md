# NeatBot

INTRODUCTION
This a bot I worked on to understand the basics of API use and how to connect to resources and parse knowledge from them into a legible format. The other goal for this project is to learn better UI and frontend design. The application is not the most complicated, but a lot of my time has been poured into learning user requirements and making it interesting to use.

The NeatBot is a call based one so unless the messages do not written with the special prefix, followed by the command word, the bot does not reply with the specific information requested by the user in the Discord Server channel.


<strong>Features of the bot</strong>



1) Weather: 
  - The NeatBot can be used to procure the weather from the openweather.com website. I use the open source API 
    to aquire the data from the source and is then parsed into legible data and the NeatBot provides the
    data to the caller. 
  
  - The website allows us to call for the weather data of the place with zipcode(only in the USA) and by city name's (worldwide).
    All the data received is parsed into readable format which follows the temperature and time format given by the user. 
  
  - If the weather command is not given a suffixed it also prompts the user with the message asking for a proper suffix. It also
    prompts the user when it thinks they have provided the wrong zipcode or city name. 
  
    When user prompts the bot with the weather command suffixed with a US zipcode.
    <img width="487" alt="Screenshot 2020-09-04 at 1 31 08 PM" src="https://user-images.githubusercontent.com/56141766/95640139-52af5c00-0a69-11eb-92ee-  247a65b692aa.png">

When user prompts the bot with the weather command suffixed with a city name.
<img width="565" alt="Screenshot 2020-09-04 at 1 31 34 PM" src="https://user-images.githubusercontent.com/56141766/95640156-66f35900-0a69-11eb-9f16-33f03e583a9b.png">

When user prompts the bot with the weather command suffixed with nothing.
<img width="640" alt="Screenshot 2020-09-04 at 1 31 45 PM" src="https://user-images.githubusercontent.com/56141766/95640367-7c1cb780-0a6a-11eb-9f03-bb59bf30b406.png">


