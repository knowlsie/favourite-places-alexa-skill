# Favourite Places Skill

A quick day one skill to demo (in alexa-sdk) the new Alexa dialog models, and the Alexa skill builder. It will take in, and confirm your favourite British and American cities, then store them in DynamoDB.

It did do British regions rather than American cities, but that slot never seemed to work, and once accepted 'Open Favourite Places' as an answer. Plz fix.

### Installation

To make the lambda function:

- Install and configure AWS CLI and gulp.
- Find `{id}` in `gulpfile.js` and replace it with your Amazon Account ID number.
- Then from the main directory, run the following commands in this order:

  `gulp createRole`

  `gulp create`

You'll then have to manually create the actual skill for yourself by copying by making a new Alexa skill [here](https://developer.amazon.com/edw/home.html#/skills/list), and copying `interaction_model/intentschema.json` into Amazon skill builder.

### Usage

Say:

> Open Favourite places

or:

> Ask Favourite places to update my favourite places

### Code

The code includes solutions using both `delegate`, and the `:elicitSlot`/ `:confirmSlot`/`:confirmIntent` methods. I bumped into a few Skill Builder bugs on the way which I'm currently submitting to Amazon.


If you ever want to update the lambda with your local changes, you can run `gulp` to do this.

See [alexa-sdk](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) and [my other, better Alexa skill](https://github.com/alan-turing-institute/alexa-room-finder) for more actual documentation.
