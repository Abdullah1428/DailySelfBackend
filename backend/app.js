const express = require("express");
const cors = require('cors');
const {IBM_API_KEY, IBM_URL} = require('./config')

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2022-04-07',
  authenticator: new IamAuthenticator({
    apikey: IBM_API_KEY,
  }),
  serviceUrl: IBM_URL
});

const app = express();
// for parsing requests
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.post('/ibm', async(req, res) => {

  const { text } = req.body

  const analyzeParams = {
    text: text,
    features: {
      entities: {
        emotion: true,
        sentiment: true,
      },
      keywords: {
        emotion: true,
        sentiment: true,
      },
    },
  };
  
  naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      // console.log(JSON.stringify(analysisResults, null, 2));
      res.json(analysisResults.result.keywords)
  })
    .catch(err => {
      // console.log('Error', err)
      res.status(500).send("Server error");
  });
})


// export app
module.exports = {app}





