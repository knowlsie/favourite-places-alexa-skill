'use strict';

const Alexa = require('alexa-sdk');

const sessionHandlers = {
  // Tells you favourite places, gives option to update
  LaunchRequest() {
    let outputSpeech;
    if (this.attributes.favouriteGBCity && this.attributes.favouriteUSCity) {
      outputSpeech = `Last time you told me your favourite British city was ${this.attributes.favouriteGBCity} and your favourite American city was ${this.attributes.favouriteUSCity}. Say 'update my favourite places to change this.'`;
    } else {
      outputSpeech = `I haven't yet been told your favourite places. Say update my favourite places to start.`;
    }
    this.emit(':ask', outputSpeech);
  },
  // Used to update favourite places
  FavouriteIntent() {
    // Update cities using only delegate directive.
    if (this.event.request.dialogState !== 'COMPLETED') {
      this.emit(':delegate');
    } else {
      this.attributes.favouriteGBCity = this.event.request.intent.slots.favouriteGBCity.value;
      this.attributes.favouriteUSCity = this.event.request.intent.slots.favouriteUSCity.value;
      this.emit(':tell', `I've recorded in my database that your favourite British city is ${this.attributes.favouriteGBCity} and your favourite American city is ${this.attributes.favouriteUSCity}.`);
    }

    // Update cities using elicitSlot, confirmSlot, and confirmIntent
    /*
    if (!this.event.request.intent.slots.FavouriteUSCity.value) {
      this.emit(':elicitSlot', 'FavouriteUSCity', 'So what is your favourite American city?', 'So what is your favourite American city?');
    } else if (this.event.request.intent.slots.FavouriteUSCity.confirmationStatus !== 'CONFIRMED') {
      this.emit(':confirmSlot', 'FavouriteUSCity', `So can you confirm your favourite American city is ${this.event.request.intent.slots.FavouriteUSCity.value}`, `So can you confirm your favourite American city is ${this.event.request.intent.slots.FavouriteUSCity.value}`);
    } else if (!this.event.request.intent.slots.FavouriteGBCity.value) {
      this.emit(':elicitSlot', 'FavouriteGBCity', 'So what is your favourite British city?', 'So what is your favourite British city?');
    } else if (this.event.request.intent.slots.FavouriteGBCity.confirmationStatus !== 'CONFIRMED') {
      this.emit(':confirmSlot', 'FavouriteGBCity', `So can you confirm your favourite British city is ${this.event.request.intent.slots.FavouriteGBCity.value}`, `So can you confirm your favourite British city is ${this.event.request.intent.slots.FavouriteGBCity.value}`);
    } else if (this.event.request.intent.confirmationStatus !== 'CONFIRMED') {
      this.emit(':confirmIntent', `So can you confirm that your favourite American city is ${this.event.request.intent.slots.FavouriteUSCity.value} and your favourite British city is ${this.event.request.intent.slots.FavouriteGBCity.value}.`, `So can you confirm that your favourite American city is ${this.event.request.intent.slots.FavouriteUSCity.value} and your favourite British city is ${this.event.request.intent.slots.FavouriteGBCity.value}.`)
    } else {
      this.attributes.favouriteGBCity = this.event.request.intent.slots.FavouriteGBCity.value;
      this.attributes.favouriteUSCity = this.event.request.intent.slots.FavouriteUSCity.value;
      this.emit(':tell', `I've recorded in my database that your favourite British city is ${this.attributes.favouriteGBCity} and your favourite American city is ${this.attributes.favouriteUSCity}.`);
    }
    */
  },
  'AMAZON.HelpIntent': function HelpIntent() {
    this.emit(':ask', 'Say update my favourite places to change your favourite places', 'Say update my favourite places to change your favourite places');
  },
  'AMAZON.CancelIntent': function CancelIntent() {
    this.emit(':tell', 'Goodbye!');
  },
  'AMAZON.StopIntent': function StopIntent() {
    this.emit(':tell', 'Goodbye!');
  },
  Unhandled() {
    this.emit(':tell', 'If this has been called, I think something has gone wrong...');
  },
};

// Main
exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback); // See alexa.js in alexa-sdk package.
  alexa.dynamoDBTableName = 'FavouritePlaces';
  // TODO: Add App ID.
  alexa.registerHandlers(sessionHandlers); // See response.js in alexa-sdk package to see other registered handlers.
  alexa.execute(); // Handles lambda event.
};
