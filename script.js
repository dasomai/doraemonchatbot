const voiceIcon = document.querySelector(".voiceIcon")
const doraImage = document.querySelector(".doraImage")
const container = document.querySelector(".container")

let userInfo = {
  name: "John Brown",
  type: "Admin",
  rep: ""
}

// const listenMessage = document.querySelector(".listenMessage")

let playSound = () => new Audio("sounds/click.wav").play()

let hereIam = () => new Audio("sounds/response/hereIam2.mp3").play()
let yesOfcourse = () =>
  new Audio("static/sounds/response/yesOfcourse.mp3").play()

voiceIcon.addEventListener("click", (e) => {
  e.preventDefault()
  console.log("clicked")
  playSound()
  userInfo["rep"] = ""

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
    userInfo["rep"] = transcript
    chatbot(transcript)
  }

  // start recognition
  recognition.start()
}

function botTalk(m) {
  var msg = new SpeechSynthesisUtterance()
  var voices = window.speechSynthesis.getVoices()
  msg.voice = voices[10]
  msg.voiceURI = "native"
  msg.volume = 1
  msg.rate = 1
  msg.pitch = 0.8
  msg.text = m
  msg.lang = "en-US"
  speechSynthesis.speak(msg)
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

  botTalk(data["rep"])
}

function dorachat(message) {
  const url = "https://chatbot.doraemon99.repl.co/dorachat/"
  getapi(url + message)
  //   console.log(rep)
}
