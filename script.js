const voiceIcon = document.querySelector(".voiceIcon")
const doraImage = document.querySelector(".doraImage")
const container = document.querySelector(".container")

// const listenMessage = document.querySelector(".listenMessage")

let playSound = () => new Audio("sounds/click.wav").play()

let hereIam = () => new Audio("sounds/response/hereIam2.mp3").play()
let yesOfcourse = () => new Audio("sounds/response/yesOfcourse.mp3").play()
let appear = () => new Audio("sounds/appear.mp3").play()

// create speech to text function

function bottalk(m) {
  let speech = new SpeechSynthesisUtterance()
  speech.lang = "en"
  let voices = []
  voices = window.speechSynthesis.getVoices()
  speech.voice = voices[4]
  speech.pitch = 1
  speech.volume = 1
  speech.rate = 1
  speech.lang = "en-US"
  speech.text = m
  window.speechSynthesis.speak(speech)
}

voiceIcon.addEventListener("click", (e) => {
  e.preventDefault()
  console.log("clicked")
  playSound()

  runSpeechRecognition()
})

function runSpeechRecognition() {
  voiceIcon.classList.toggle("saySomething")
  // listenMessage.classList.toggle("hidden")
  // get output div reference
  var output = document.getElementById("output")
  // get action element reference
  var action = document.getElementById("action")
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var recognition = new SpeechRecognition()

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    // action.innerHTML = "<small>listening, please speak...</small>";
  }

  recognition.onspeechend = function () {
    voiceIcon.classList.toggle("saySomething")
    // listenMessage.classList.toggle("hidden")
    // action.innerHTML = "<small>stopped listening, hope you are done...</small>";
    recognition.stop()
  }

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript
    var confidence = event.results[0][0].confidence
    output.innerHTML =
      "<b>Nobita:</b> " +
      transcript +
      "<br/> <b>Confidence:</b> " +
      confidence * 100 +
      "%"
    output.classList.remove("hide")

    console.log(transcript)
    console.log(typeof transcript)

    chatbot(transcript)
  }

  // start recognition
  recognition.start()
}

function chatbot(text) {
  message = text.toLowerCase()
  let reply = ""

  if (message == "hello anyone here") {
    yesOfcourse()

    setTimeout(() => {
      appear()
      doraImage.classList.remove("hidden")
      doraImage.classList.add("appear")
    }, 2000)
    setTimeout(() => {
      hereIam()
    }, 6000)
  } else {
    dorachat(message)
  }
}

//get API from dorochatbot flask app on replit

async function getapi(url) {
  const response = await fetch(url)

  let data = await response.json()
  console.log(data)
  // moviesContainer.innerHTML = "";
  // showdata(data);
  //   console.log(data["rep"])

  // botTalk(data["rep"])
  return data["rep"]
}

const url = "https://chatbot.doraemon99.repl.co/dorachat/"
function dorachat(message) {
  getapi(url + message).then(function (value) {
    bottalk(value)
  })
}
