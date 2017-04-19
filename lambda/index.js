'use strict';

const Alexa = require('alexa-sdk');

const sessionHandlers = {
  LaunchRequest() {
    let output;
    if (this.attributes.favouriteCity && this.attributes.favouriteRegion) {
      output = `Last time you told me your favourite British city was ${this.attributes.favouriteCity} and your favourite British region was ${this.attributes.favouriteRegion}.`;
    } else {
      output = `I don't yet have your favourite British city or region. Say update my favourite places to start.`;
    }
    this.emit(':ask', output);
  },
  FavouriteIntent() {
    if (this.event.request.dialogState !== 'COMPLETED') {
      this.emit(':delegate');
    } else {
      this.attributes.favouriteCity = this.event.request.intent.slots.FavouriteCity.value;
      this.attributes.favouriteRegion = this.event.request.intent.slots.FavouriteRegion.value;
      this.emit(':tell', `I've recorded in my database that your favourite British city is ${this.attributes.favouriteCity} and your favourite British region is ${this.attributes.favouriteRegion}.`);
    }
  },
  'AMAZON.HelpIntent': function HelpIntent() {
    this.emit(':ask', 'Tell me about your favourite city and region!');
  },
  'AMAZON.CancelIntent': function CancelIntent() {
    this.emit(':tell', 'Goodbye!');
  },
  'AMAZON.StopIntent': function StopIntent() {
    this.emit(':tell', 'Goodbye!');
  },
  Unhandled() {
    this.emit(':tell', 'There was an error.');
  },
};

// Main
exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback); // See alexa.js in alexa-sdk package.
  alexa.dynamoDBTableName = 'FavouritePlaces';
  alexa.registerHandlers(sessionHandlers); // See response.js in alexa-sdk package to see other registered handlers.
  alexa.execute(); // Handles lambda event.
};
