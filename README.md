# Enabling callers to request a callback

In studio you can enable callers to be called-back instead of waiting; 

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart).

## Deploy the backend function: 

```bash
cd callback
cp .env.example .env
# EDIT .ENV
twilio serverless:deploy
```

## Use it in Studio: 

in Studio, add a "run function" widget, select your "add_callback" function and add 2 parameters : 

* phone_number: the phone number to call back: {{trigger.call.From}}
* motif: the reason for the call (if any): could be any text.  


## Deploy the UI (flex plugin)

```bash
cd ../plugin-callback
twilio flex:plugins:deploy --changelog "original version"
```
Then copy the code offered in response and run it. 
