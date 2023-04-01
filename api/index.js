const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')
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
    
    return res.status(200).json({
        success: true,
        message: { text: response.data.choices[0].text }
    });
});
app.post('/image', async (req, res) => {

    const prompt = req.body?.text

    const responseImage = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024"
    })

    const image_url = responseImage.data.data[0].url

    return res.status(200).json({
        success: true,
        message: { image: image_url }
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});