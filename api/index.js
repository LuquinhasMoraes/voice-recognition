const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
var cors = require('cors')
const openai = require('openai');
const app = express();
const port = 3001;

var corsOptions = {
    origin: '*'// some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.post('/', cors(corsOptions), async (req, res) => {
    const api_key = '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';
    console.log(req.body);
    const config = new Configuration({
        apiKey: api_key,
    })

    const openai = new OpenAIApi(config)

    const prompt = req.body?.text

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 1000
    })

    console.log(response.data.choices[0].text);

    return res.status(200).json({
        success: true,
        message: response.data.choices[0].text,
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});