const output = document.querySelector('#output')
const input = document.querySelector('#input')
const resultImage = document.querySelector('#result-image')

const startBtn = document.querySelector('#start')
const generateBtn = document.querySelector('#generate')
const generateImageBtn = document.querySelector('#generate-image')

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

recognition.lang = "pt-BR";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true


const fetchChatGPW = async (prompt, endpoint = '') => {
    const response = await fetch('http://localhost:3001/' + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body:  JSON.stringify({text: prompt})
    }).catch(error => alert(JSON.stringify(error)))
    const json = await response.json();
    return json
}

const createReportWithGPT = async () => {
    const prompt = input.value
    const json = await fetchChatGPW(prompt)
    output.textContent = json.message.text
}

const createImageWithGPT = async () => {
    const prompt = input.value    
    const json = await fetchChatGPW(prompt, 'image')
    resultImage.src = json.message.image
    resultImage.style.width = "100%"
    console.log(json);
}


recognition.onspeechend = async () => {
    recognition.stop();
};

recognition.onspeechstart = () => {
    console.log("Speech recognition has stopped.");
};

recognition.addEventListener("speechstart", () => {
    console.log("Speech has been detected");
});

recognition.addEventListener("start", () => {
    console.log("Speech recognition service has started");
});

recognition.onresult = (event) => {
    const color = event.results[0][0].transcript;
    input.textContent = `${color}.`;
};


function start() {
    recognition.start()
}


startBtn.addEventListener('click', start);
generateBtn.addEventListener('click', createReportWithGPT);
generateImageBtn.addEventListener('click', createImageWithGPT);