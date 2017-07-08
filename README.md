## Alexa Weather Skill

This repository contains a NodeJS application that will allow voice data captured by an Amazon Echo to be passed into the application and processed. The application is responsible for processing the specific request and forwarding it onto AWS IoT.

This application functions as an Alexa Skill that is used to process voice requests to retrieve weather data from the Australian Bureau of Meteorology (BOM)

## Background:

The Amazon Echo is not available in Australia and even though it is possible to get
one shipped here, it isn't entirely configured to work here.

In countries where it is designed to work, the feature set is significantly larger. It
can be used to order food, order taxi's, tell the proper time amongst a whole bunch
of other things.

Unfortunately, the functionality for the Echo lacks a little bit when used in Australia. Even
asking for simple things like the weather requires a very specific question to be asked to
the device. It becomes even more complicated, especially for the weather if there is a place in the United States with the same name.

Luckily, Amazon does have an SDK for the Alexa that allows developers to create their own voice applications to expand the range of what the device can do. The main benefit of it is that the API provides the voice to text translation without the developer having to do much work.

With that in mind, I was tired of asking for the weather by having to specify Melbourne, Australia each and every time. Also, the returned temperature reading wasn't exactly accurate either, so I decided to give it a go and create my own Alexa skill.

## Weather Application:

The Bureau of Meteorology (BOM) is where most people in Australia get their weather information from. It is seen as one of the most accurate sources available in Australia.

The purpose of this skill is to be able to ask Alexa about Australian weather, which it will then
obtain the weather data from BOM and feed it back as a voice response.

## Requirements:

This skill must provide the following features:

  - Stateless Skill -

    The skill will be hosted on AWS Lambda, and as such is required to be stateless.

  - Fast Processing -

    BOM does not provide an API to retrieve the weather data. The data is instead stored as a series of XML files that will need to be downloaded, formatted and traversed to obtain the required data. Also because it is weather data, it is something that is updated quite frequently. The data will need to be processed by another service to ensure that the time from when the voice command is received to when the response is returned will be as short as possible. Any delay between question and answer will reduce the immersive experience of communicating with the Echo.

  - Current Temperature -

    The skill at the very least must provide the current temperature for a given location. If location is
    invalid for this skill, then an appropriate error response will be returned.

  - Forecast -

    The skill must be able to provide the forecasted weather for a given city for the next **n** days. It
    must be able to provide shortened forecast details as well as detailed forecast for each day. The value of **n** is restricted to the maximum number of days that BOM provides forecasting for.

## Design:

The language chosen for this skill will be NodeJS for no other reason than to practice developing code with the language. Amazon provides the SDK for NodeJS so why not.

## Testing:

An utterance is what can be spoken by the user to the Echo that will then be processed and a result returned. The skill will return results based on the following utterances -

### Sample 1:

**Weather report for a specific place**

- What is the weather in [ place ]
- What's the weather in [ place ]
- What the weather is in [ place ]

Where [ place ] = Melbourne, Sydney, Brisbane, etc.

Example -

Q - "Alexa, ask BOM what the weather is in [ place ]" <br>
A - "The current weather in [ place ] is..."

**Weather report for the current location**

- What is the weather today.
- What's the weather today.
- What the weather is today.

Example -

Q - "Alexa, ask BOM what the weather is today" <br>
A - "The weather today in .... is ...."

**Tomorrow's weather for the current location**

1. What is the weather tomorrow
2. What's the weather tomorrow
3. What the weather is tomorrow

Example -

Q - "Alexa, ask BOM what the weather is tomorrow" <br>
A - "The weather tomorrow in .... is ...."

**Range Forecast (Current Location, Day)**

1. What is weather on [ day ]
2. What's the weather on [ day ]
3. What the weather is on [ day ]

Where [ day ] = Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.

Example -

Q: "Alexa, ask BOM what the weather is on [ day ]" <br>
A: "The weather on [ day ] is ..."

**Range Forecast (Location, Day)**

1. What is the weather on [ day ] in [ place ]
2. What's the weather on [ day ] in [ place ]
3. What's the weather in [ place ] on [ day ]
4. What is the weather in [ place ] on [ day ]

Where [ day ] = Monday, Tuesday, Wednesday, Thursday, Friday, Saturday <br>
Where [ place ] = Melbourne, Sydney, Brisbane

Example -

Q - "Alexa, ask BOM what the weather is in [ place ] on [ day ]" <br>
A - "The weather on [ day ] in [ place ] is ...."

Q - "Alexa, ask BOM what's the weather on [ day ] in [ place ]" <br>
A - "The weather on [ day ] in [ place ] is ...."

**Current Temperature (Current Location)**

1. What is the current temperature
2. What's the current temperature

Example -

Q - "Alexa, ask BOM what is the current temperature" <br>
A - "The current temperature is ..."

**Current Temperature (Known Location)**

1. What is the current temperature in [ place ]
2. What's the current temperature in [ place ]

Where [ place ] = Melbourne, Sydney, Brisbane, etc.

Example -

Q - "Alexa, ask BOM what is the current temperature in [ place ]" <br>
A - "The current temperature in [ place ] is ... "
