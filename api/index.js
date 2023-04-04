import { Configuration, OpenAIApi } from 'openai' 
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import {stringHelper} from './helpers/string.helper.js';
// const { Configuration, OpenAIApi } = require("openai");
// const express = require('express');
// const bodyParser = require('body-parser')
// var cors = require('cors');
// const { default: stringHelper } = require("./helpers/string.helper");
// import {stringHelper} from './helpers/string.helper'
const app = express();
const port = 3001;

var corsOptions = {
    origin: '*'// some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(bodyParser.json())

const api_key = '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';
const config = new Configuration({
    apiKey: api_key,
})
const openai = new OpenAIApi(config)

app.post('/', async (req, res) => {

    const prompt = req.body?.text

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 1000
    })

    const responseText = stringHelper.sanitize(response.data.choices[0].text)
    
    return res.status(200).json({
        success: true,
        message: { text:  responseText}
    });
});
app.post('/image', async (req, res) => {

    const prompt = req.body?.text

    const responseImage = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024"
    })

    const imageUrl = responseImage.data.data[0].url

    return res.status(200).json({
        success: true,
        message: { image: imageUrl }
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});