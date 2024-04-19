const mainInput = document.querySelector(".main-input");
const inputWidth = mainInput.offsetWidth;
const fontSize = parseInt(window.getComputedStyle(mainInput).fontSize);


const inputLength = Math.floor(inputWidth / (fontSize * 0.6));


let bitsPart = document.querySelector(".play-bits");

console.log(inputLength);


// console.log(inputLength);

let mainTextPart = document.querySelector(".main-text-part");
let backInput = document.querySelector(".back-input");


const audio = document.getElementById("audio");
const bars = document.querySelectorAll(".bar");
const startButton = document.getElementById("startButton");

let i = 0;
let index = 0;
let newLetter = 0;
let gameStart = 0;
let timeOut = 0;

window.addEventListener("keydown", async (enter) => {
  if ("Enter" === enter.key) {
    gameStart++;
  }

  if (gameStart === 1) {
    mainInput.value = '';
    mainInput.focus();


    async function mainFunction(content) {
      // let separatedContent = cont.split(/[.?]/);
      for (let cont of content) {
        let delayCont = Math.floor((cont["start"] - timeOut) * 1000);
        await delay(delayCont);
        timeOut = cont["end"];

        // await delay(2000)

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

        async function mainAnimationLetter(fullText, cont) {

          let li = 0;

          for (let endText of fullText) {
            mainInput.maxLength = endText.length
            endText = endText.trim();
            let i = 0;
            let countIter = 1;
            let backInputText = "";

            for (let animeLetter of endText) {
              let timeLetter = Math.round(
                ((cont["end"] - cont["start"]) * 1000) /
                fullText.join(" ").length
              );

              await delay(timeLetter / 4);

              backInputText = backInputText + animeLetter;
              backInput.style.textAlign = "start";
              backInput.innerText = backInputText;

              newLetter = document.createElement("p");
              newLetter.classList.add("main-text");
              let addClass = `main-text${li}`;
              newLetter.classList.add(addClass);
              // '&nbsp;'
              if (animeLetter === ' ') {
                newLetter.innerHTML = "&nbsp;";
                mainTextPart.appendChild(newLetter);
              } else {
                newLetter.innerText = animeLetter
                mainTextPart.appendChild(newLetter);
              }
              
              

              newLetter.style.animationName = "animationText";

              i++;
              newLetter.style.marginLeft = `${countIter}px`
              countIter += parseInt(window.getComputedStyle(newLetter).width)

            }

            await delay(2000)
            let elements = document.querySelectorAll(`.main-text${li}`);
            elements.forEach(element => element.remove());
            li++;
          }
        }

        async function mainSpellCheck(finellText, cont) {
          for (let resText of finellText) {
            resText = resText.trim();
            let i = 0;



            for (let letterPlay of resText) {
              let timeLetter = Math.round(
                ((cont["end"] - cont["start"]) * 1000) /
                finellText.join(" ").length
              );

              await delay(timeLetter);

              
              

              i++;

              if (i >= resText.length) {
                await delay(timeLetter);
                mainInput.value = ``;
                
              }
            }
          }
        }

        mainSpellCheck(splitText, cont);
        mainAnimationLetter(splitText, cont);

        let middleForTime = Math.round((cont["end"] - cont["start"]) * 1000);

        await delay(middleForTime);
      }

      gameStart = 0;
      backInput.innerText = "ENTER TO START!";
      backInput.style.textAlign = "center";
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    let content = fetch("Let_Me_Down.json")
      .then((response) => response.json())
      .then((data) => {
        content = data;
        const segments = content["segments"];
        mainFunction(segments);
      });

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
          bar.style.background = `linear-gradient(to bottom, transparent ${barHeight}, red 20%, yellow 30%, rgb(3, 255, 3) 80%)`;
          // bar.style.background = `linear-gradient(to bottom, transparent ${barHeight}, red 10%, rgb(213, 19, 252) 20%, rgb(255, 47, 168) 30%, rgb(3, 104, 255) 80%)`;
        });
      }

      updateBars();
    });
    // .catch((error) => console.error("Error playing audio:", error));
  }

});
