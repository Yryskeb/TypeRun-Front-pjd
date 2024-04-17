const mainInput = document.querySelector(".main-input");
const inputWidth = mainInput.offsetWidth;
const fontSize = parseInt(window.getComputedStyle(mainInput).fontSize);

const inputLength = Math.floor(inputWidth / (fontSize * 0.6));

let bitsPart = document.querySelector(".play-bits");

// console.log(inputLength);

let text = document.querySelector(".main-text");
let mainTextPart = document.querySelector(".main-text-part");
let backInput = document.querySelector(".back-input");

// music
const audio = document.getElementById("audio");
const bars = document.querySelectorAll(".bar");
const startButton = document.getElementById("startButton");

const content = {
  segments: [
    {
      id: 0,
      seek: 0,
      start: 6.0,
      end: 13.0,
      text: " This night is cold in the kingdom, I can feel you fade away",
      tokens: [
        50364, 639, 1818, 307, 3554, 294, 264, 10231, 11, 286, 393, 841, 291,
        21626, 1314, 51014,
      ],
      temperature: 0.0,
      avg_logprob: -0.18266945916253166,
      compression_ratio: 1.4656084656084656,
      no_speech_prob: 0.43782174587249756,
    },
    {
      id: 1,
      seek: 0,
      start: 13.0,
      end: 19.0,
      text: " From the kitchen to the bathroom sinkin' Your steps keep me awake",
      tokens: [
        51014, 3358, 264, 6525, 281, 264, 8687, 9500, 259, 6, 2260, 4439, 1066,
        385, 15994, 51314,
      ],
      temperature: 0.0,
      avg_logprob: -0.18266945916253166,
      compression_ratio: 1.4656084656084656,
      no_speech_prob: 0.43782174587249756,
    },
    {
      id: 2,
      seek: 0,
      start: 19.0,
      end: 22.0,
      text: " Don't cut me down, throw me out Leave me here to waste",
      tokens: [
        51314, 1468, 380, 1723, 385, 760, 11, 3507, 385, 484, 9825, 385, 510,
        281, 5964, 51464,
      ],
      temperature: 0.0,
      avg_logprob: -0.18266945916253166,
      compression_ratio: 1.4656084656084656,
      no_speech_prob: 0.43782174587249756,
    },
    {
      id: 3,
      seek: 0,
      start: 22.0,
      end: 28.0,
      text: " I once was a man with dignity and grace Now I'm slippin' through the cracks of your cold embrace",
      tokens: [
        51464, 286, 1564, 390, 257, 587, 365, 19672, 293, 10042, 823, 286, 478,
        20129, 259, 6, 807, 264, 21770, 295, 428, 3554, 14038, 51764,
      ],
      temperature: 0.0,
      avg_logprob: -0.18266945916253166,
      compression_ratio: 1.4656084656084656,
      no_speech_prob: 0.43782174587249756,
    },
    {
      id: 4,
      seek: 2800,
      start: 28.0,
      end: 34.0,
      text: " Oh please, please Could you find a way to let me down slowly",
      tokens: [
        50364, 876, 1767, 11, 1767, 7497, 291, 915, 257, 636, 281, 718, 385,
        760, 5692, 50664,
      ],
      temperature: 0.2,
      avg_logprob: -0.11280815871720462,
      compression_ratio: 2.3691275167785233,
      no_speech_prob: 0.3796709477901459,
    },
    {
      id: 5,
      seek: 2800,
      start: 34.0,
      end: 40.0,
      text: " A little sympathy I hope you can show me If you wanna go then I'll be so lonely",
      tokens: [
        50664, 316, 707, 33240, 286, 1454, 291, 393, 855, 385, 759, 291, 1948,
        352, 550, 286, 603, 312, 370, 14236, 50964,
      ],
      temperature: 0.2,
      avg_logprob: -0.11280815871720462,
      compression_ratio: 2.3691275167785233,
      no_speech_prob: 0.3796709477901459,
    },
    {
      id: 6,
      seek: 2800,
      start: 40.0,
      end: 46.0,
      text: " If you're leaving baby let me down slowly Let me down down, let me down down",
      tokens: [
        50964, 759, 291, 434, 5012, 3186, 718, 385, 760, 5692, 961, 385, 760,
        760, 11, 718, 385, 760, 760, 51264,
      ],
      temperature: 0.2,
      avg_logprob: -0.11280815871720462,
      compression_ratio: 2.3691275167785233,
      no_speech_prob: 0.3796709477901459,
    },
    {
      id: 7,
      seek: 2800,
      start: 46.0,
      end: 50.0,
      text: " Let me down, let me down down Let me down, let me down",
      tokens: [
        51264, 961, 385, 760, 11, 718, 385, 760, 760, 961, 385, 760, 11, 718,
        385, 760, 51464,
      ],
      temperature: 0.2,
      avg_logprob: -0.11280815871720462,
      compression_ratio: 2.3691275167785233,
      no_speech_prob: 0.3796709477901459,
    },
    {
      id: 8,
      seek: 2800,
      start: 50.0,
      end: 56.0,
      text: " If you wanna go then I'll be so lonely If you're leaving baby let me down slowly",
      tokens: [
        51464, 759, 291, 1948, 352, 550, 286, 603, 312, 370, 14236, 759, 291,
        434, 5012, 3186, 718, 385, 760, 5692, 51764,
      ],
      temperature: 0.2,
      avg_logprob: -0.11280815871720462,
      compression_ratio: 2.3691275167785233,
      no_speech_prob: 0.3796709477901459,
    },
    {
      id: 9,
      seek: 5600,
      start: 56.0,
      end: 63.0,
      text: " Cold skin, drag my feet on the tile As I'm walking down the corridor",
      tokens: [
        50364, 16918, 3178, 11, 5286, 452, 3521, 322, 264, 20590, 1018, 286,
        478, 4494, 760, 264, 25602, 50714,
      ],
      temperature: 0.0,
      avg_logprob: -0.04969210426012675,
      compression_ratio: 1.5482456140350878,
      no_speech_prob: 0.061835356056690216,
    },
    {
      id: 10,
      seek: 5600,
      start: 63.0,
      end: 69.0,
      text: " And I know we haven't talked in a while So I'm looking for an open door",
      tokens: [
        50714, 400, 286, 458, 321, 2378, 380, 2825, 294, 257, 1339, 407, 286,
        478, 1237, 337, 364, 1269, 2853, 51014,
      ],
      temperature: 0.0,
      avg_logprob: -0.04969210426012675,
      compression_ratio: 1.5482456140350878,
      no_speech_prob: 0.061835356056690216,
    },
    {
      id: 11,
      seek: 5600,
      start: 69.0,
      end: 73.0,
      text: " Don't cut me down, throw me out Leave me here to waste",
      tokens: [
        51014, 1468, 380, 1723, 385, 760, 11, 3507, 385, 484, 9825, 385, 510,
        281, 5964, 51214,
      ],
      temperature: 0.0,
      avg_logprob: -0.04969210426012675,
      compression_ratio: 1.5482456140350878,
      no_speech_prob: 0.061835356056690216,
    },
    {
      id: 12,
      seek: 5600,
      start: 73.0,
      end: 79.0,
      text: " I once was a man with dignity and grace Now I'm slippin' through the cracks of your cold embrace",
      tokens: [
        51214, 286, 1564, 390, 257, 587, 365, 19672, 293, 10042, 823, 286, 478,
        20129, 259, 6, 807, 264, 21770, 295, 428, 3554, 14038, 51514,
      ],
      temperature: 0.0,
      avg_logprob: -0.04969210426012675,
      compression_ratio: 1.5482456140350878,
      no_speech_prob: 0.061835356056690216,
    },
    {
      id: 13,
      seek: 5600,
      start: 79.0,
      end: 85.0,
      text: " Oh please, please Could you find a way to let me down slowly",
      tokens: [
        51514, 876, 1767, 11, 1767, 7497, 291, 915, 257, 636, 281, 718, 385,
        760, 5692, 51814,
      ],
      temperature: 0.0,
      avg_logprob: -0.04969210426012675,
      compression_ratio: 1.5482456140350878,
      no_speech_prob: 0.061835356056690216,
    },
    {
      id: 14,
      seek: 8500,
      start: 85.0,
      end: 92.0,
      text: " A little sympathy I hope you can show me If you wanna go then I'll be so lonely",
      tokens: [
        50364, 316, 707, 33240, 286, 1454, 291, 393, 855, 385, 759, 291, 1948,
        352, 550, 286, 603, 312, 370, 14236, 50714,
      ],
      temperature: 0.0,
      avg_logprob: -0.05737897496164581,
      compression_ratio: 2.3739837398373984,
      no_speech_prob: 0.04152844101190567,
    },
    {
      id: 15,
      seek: 8500,
      start: 92.0,
      end: 98.0,
      text: " If you're leaving baby let me down slowly Let me down down, let me down down",
      tokens: [
        50714, 759, 291, 434, 5012, 3186, 718, 385, 760, 5692, 961, 385, 760,
        760, 11, 718, 385, 760, 760, 51014,
      ],
      temperature: 0.0,
      avg_logprob: -0.05737897496164581,
      compression_ratio: 2.3739837398373984,
      no_speech_prob: 0.04152844101190567,
    },
    {
      id: 16,
      seek: 8500,
      start: 98.0,
      end: 101.0,
      text: " Let me down, let me down down Let me down, let me down",
      tokens: [
        51014, 961, 385, 760, 11, 718, 385, 760, 760, 961, 385, 760, 11, 718,
        385, 760, 51164,
      ],
      temperature: 0.0,
      avg_logprob: -0.05737897496164581,
      compression_ratio: 2.3739837398373984,
      no_speech_prob: 0.04152844101190567,
    },
    {
      id: 17,
      seek: 8500,
      start: 101.0,
      end: 108.0,
      text: " If you wanna go then I'll be so lonely If you're leaving baby let me down slowly",
      tokens: [
        51164, 759, 291, 1948, 352, 550, 286, 603, 312, 370, 14236, 759, 291,
        434, 5012, 3186, 718, 385, 760, 5692, 51514,
      ],
      temperature: 0.0,
      avg_logprob: -0.05737897496164581,
      compression_ratio: 2.3739837398373984,
      no_speech_prob: 0.04152844101190567,
    },
    {
      id: 18,
      seek: 10800,
      start: 108.0,
      end: 121.0,
      text: " And I can't stop myself from fallin' And I can't stop myself from fallin'",
      tokens: [
        50364, 400, 286, 393, 380, 1590, 2059, 490, 2100, 259, 6, 400, 286, 393,
        380, 1590, 2059, 490, 2100, 259, 6, 51014,
      ],
      temperature: 1.0,
      avg_logprob: -0.08982983879421068,
      compression_ratio: 3.0625,
      no_speech_prob: 0.3029294013977051,
    },
    {
      id: 19,
      seek: 10800,
      start: 121.0,
      end: 134.0,
      text: " And I can't stop myself from fallin' And I can't stop myself from fallin'",
      tokens: [
        51014, 400, 286, 393, 380, 1590, 2059, 490, 2100, 259, 6, 400, 286, 393,
        380, 1590, 2059, 490, 2100, 259, 6, 51664,
      ],
      temperature: 1.0,
      avg_logprob: -0.08982983879421068,
      compression_ratio: 3.0625,
      no_speech_prob: 0.3029294013977051,
    },
    {
      id: 20,
      seek: 13400,
      start: 134.0,
      end: 137.0,
      text: " Could you find a way to let me down slowly?",
      tokens: [
        50364, 7497, 291, 915, 257, 636, 281, 718, 385, 760, 5692, 30, 50514,
      ],
      temperature: 0.0,
      avg_logprob: -0.1147287045755694,
      compression_ratio: 2.6258503401360542,
      no_speech_prob: 0.6258537173271179,
    },
    {
      id: 21,
      seek: 13400,
      start: 137.0,
      end: 140.0,
      text: " A little sympathy, I hope you can show me",
      tokens: [
        50514, 316, 707, 33240, 11, 286, 1454, 291, 393, 855, 385, 50664,
      ],
      temperature: 0.0,
      avg_logprob: -0.1147287045755694,
      compression_ratio: 2.6258503401360542,
      no_speech_prob: 0.6258537173271179,
    },
    {
      id: 22,
      seek: 13400,
      start: 140.0,
      end: 143.0,
      text: " If you wanna go, then I'll be so lonely",
      tokens: [
        50664, 759, 291, 1948, 352, 11, 550, 286, 603, 312, 370, 14236, 50814,
      ],
      temperature: 0.0,
      avg_logprob: -0.1147287045755694,
      compression_ratio: 2.6258503401360542,
      no_speech_prob: 0.6258537173271179,
    },
    {
      id: 23,
      seek: 13400,
      start: 143.0,
      end: 146.0,
      text: " If you're leaving, baby, let me down slowly",
      tokens: [
        50814, 759, 291, 434, 5012, 11, 3186, 11, 718, 385, 760, 5692, 50964,
      ],
      temperature: 0.0,
      avg_logprob: -0.1147287045755694,
      compression_ratio: 2.6258503401360542,
      no_speech_prob: 0.6258537173271179,
    },
    {
      id: 24,
      seek: 13400,
      start: 146.0,
      end: 149.0,
      text: " Let me down, down, let me down, down, down",
      tokens: [
        50964, 961, 385, 760, 11, 760, 11, 718, 385, 760, 11, 760, 11, 760,
        51114,
      ],
      temperature: 0.0,
      avg_logprob: -0.1147287045755694,
      compression_ratio: 2.6258503401360542,
      no_speech_prob: 0.6258537173271179,
    },
    {
      id: 25,
      seek: 13400,
      start: 149.0,
      end: 153.0,
      text: " Let me down, down, let me down, down, let me down",
      tokens: [
        51114, 961, 385, 760, 11, 760, 11, 718, 385, 760, 11, 760, 11, 718, 385,
        760, 51314,
      ],
      temperature: 0.0,
      avg_logprob: -0.1147287045755694,
      compression_ratio: 2.6258503401360542,
      no_speech_prob: 0.6258537173271179,
    },
    {
      id: 26,
      seek: 13400,
      start: 153.0,
      end: 156.0,
      text: " If you wanna go, then I'll be so lonely",
      tokens: [
        51314, 759, 291, 1948, 352, 11, 550, 286, 603, 312, 370, 14236, 51464,
      ],
      temperature: 0.0,
      avg_logprob: -0.1147287045755694,
      compression_ratio: 2.6258503401360542,
      no_speech_prob: 0.6258537173271179,
    },
    {
      id: 27,
      seek: 13400,
      start: 156.0,
      end: 159.0,
      text: " If you're leaving, baby, let me down slowly",
      tokens: [
        51464, 759, 291, 434, 5012, 11, 3186, 11, 718, 385, 760, 5692, 51614,
      ],
      temperature: 0.0,
      avg_logprob: -0.1147287045755694,
      compression_ratio: 2.6258503401360542,
      no_speech_prob: 0.6258537173271179,
    },
    {
      id: 28,
      seek: 13400,
      start: 159.0,
      end: 162.0,
      text: " If you wanna go, then I'll be so lonely",
      tokens: [
        51614, 759, 291, 1948, 352, 11, 550, 286, 603, 312, 370, 14236, 51764,
      ],
      temperature: 0.0,
      avg_logprob: -0.1147287045755694,
      compression_ratio: 2.6258503401360542,
      no_speech_prob: 0.6258537173271179,
    },
    {
      id: 29,
      seek: 16200,
      start: 162.0,
      end: 165.0,
      text: " If you're leaving, baby, let me down slowly",
      tokens: [
        50364, 759, 291, 434, 5012, 11, 3186, 11, 718, 385, 760, 5692, 50514,
      ],
      temperature: 0.0,
      avg_logprob: -0.03670958536011832,
      compression_ratio: 0.8775510204081632,
      no_speech_prob: 0.20527522265911102,
    },
  ],
  language: "en",
};

let i = 0;
let index = 0;
let newLetter = 0;
let gameStart = 0;
let backInputText = "";
let timeOut = 0;

window.addEventListener("keydown", async (enter) => {
  if ("Enter" === enter.key) {
    gameStart++;
  }

  if (gameStart === 1) {
    mainInput.focus();
    // window.location.reload();

    async function mainFunction() {
      // let separatedContent = cont.split(/[.?]/);

      for (let cont of content["segments"]) {
        let delayCont = Math.floor(cont["start"] - timeOut) * 1000;
        await delay(delayCont);
        timeOut = cont["end"];

        function splitTextByNumber(text, number) {
          let words = text.split(" ");
          let result = [];
          let currentLine = "";

          for (let i = 0; i < words.length; i++) {
            if ((currentLine + words[i]).length <= number) {
              currentLine += words[i] + " ";
            } else {
              result.push(currentLine);
              currentLine = words[i] + " ";
            }
          }

          if (currentLine) {
            result.push(currentLine);
          }

          return result;
        }

        let splitText = splitTextByNumber(cont["text"], inputLength);

        async function mainAnimation(finellText) {
          for (let resText of finellText) {
            await delay(delayCont)
            let timeLetter = Math.round(
              ((cont["end"] - cont["start"]) * 1000) / cont["text"].length
            );

            let animationLetter = (
              Math.round(cont["end"] - cont["start"]) / cont["text"].length
            ).toFixed(2);

            resText = resText.trim();

            for (let letterPlay of resText) {
              await delay(timeLetter);

              newLetter = document.createElement("p");
              newLetter.classList.add("main-text");

              newLetter.innerText = letterPlay;
              let addClass = `main-text${i}`;
              newLetter.classList.add(addClass);
              mainTextPart.appendChild(newLetter);

              if (letterPlay === " ") {
                newLetter.style.padding = "3.9px";
              }

              backInputText = backInputText + letterPlay;
              backInput.style.textAlign = "start";
              backInput.innerText = backInputText;
              mainInput.value = backInputText;

              // gsap.to(`.${addClass}`, {
              //   ease: "easeOutIn",
              //   duration: animationLetter,
              //   repeat: 0,
              //   paddingTop: 406,
              //   paddingBottom: 0,
              //   onComplete: i++,
              // });

              i++;

              if (i >= resText.length) {
                await delay(timeLetter * 2);
                mainTextPart.innerHTML = "";
                mainInput.value = ``;
                backInputText = "";
                i = 0;
              }
            }
          }
        }

        mainAnimation(splitText);
      }

      gameStart = 0;
      backInput.innerText = "ENTER TO START!";
      backInput.style.textAlign = "center";
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    mainFunction();

    audio.play().then(() => {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audio);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function updateBars() {
        requestAnimationFrame(updateBars);
        analyser.getByteFrequencyData(dataArray);
        bars.forEach((bar, index) => {
          const frequency = dataArray[index];
          const barProcent = (frequency / 255) * 100;
          const barHeight = 100 - Math.round(barProcent) + "%";
          // bar.style.background = `linear-gradient(to bottom, transparent ${barHeight}, red 20%, yellow 30%, rgb(3, 255, 3) 80%)`;
          bar.style.background = `linear-gradient(to bottom, transparent ${barHeight}, red 10%, rgb(213, 19, 252) 20%, rgb(255, 47, 168) 30%, rgb(3, 104, 255) 80%)`;
        });
      }

      updateBars();
    });
    // .catch((error) => console.error("Error playing audio:", error));
  }

  console.log(enter.key);
});
