const output = document.querySelector('#output')
const startBtn = document.querySelector('#start')
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true

const createReportWithGPT = async (prompt) => {
    
    const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        body: JSON.stringify({text: prompt})
    })
    const json = await response.json();
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
    output.textContent = `${color}.`;
    createReportWithGPT(output.textContent)
};


function start() {
    recognition.start()
}

startBtn.addEventListener('click', start);