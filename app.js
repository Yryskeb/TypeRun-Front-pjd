const mainInput = document.querySelector(".main-input");
const inputWidth = mainInput.offsetWidth;
const fontSize = parseInt(window.getComputedStyle(mainInput).fontSize);

const inputLength = Math.floor(inputWidth / (fontSize * 0.6));

let bitsPart = document.querySelector(".play-bits");

let mainTextPart = document.querySelector(".main-text-part");
let backInput = document.querySelector(".back-input");


const audio = document.getElementById("audio");
const bars = document.querySelectorAll(".bar");
const startButton = document.querySelector(".start-button");

let i = 0;
let index = 0;
let newLetter = 0;
let gameStart = 0;
let timeOut = 0;

startButton.addEventListener("click", async () => {



  async function mainFunction(content) {

    startButton.style.display = 'none';
    mainInput.value = '';
    backInput.innerText = '';
    mainInput.focus();

    let rightScore = 0;
    let falseScore = 0;

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

      async function mainSpellCheck(inputValue, contText) {

        let compareResult = 0;

        for (let i = 0; i < inputValue.length; i++) {
          if (inputValue[i] === contText[i]) {
            compareResult++
          }
        }

        rightScore = compareResult;
        falseScore = contText.length - compareResult
      }


      let splitText = splitTextByNumber(cont["text"], inputLength);
      let resText;

      async function mainAnimationLetter(fullText, cont) {

        let li = 0;

        for (let endText of fullText) {
          mainInput.maxLength = endText.length
          endText = endText.trim();
          resText = endText
          let i = 0;
          let countIter = 1;
          backInput.innerHTML = '';
          mainInput.value = '';

          for (let animeLetter of endText) {
            let timeLetter = Math.round(
              ((cont["end"] - cont["start"]) * 1000) /
              fullText.join(" ").length
            );

            await delay(timeLetter / 4);
            newLetter = document.createElement("span");
            let addClass = `main-text${li}`;
            newLetter.classList.add("main-text", addClass);
            // newLetter.innerText = animeLetter
            // mainTextPart.appendChild(newLetter)



            backInput.style.textAlign = "start";
            let splitLetter = document.createElement("span")
            splitLetter.classList.add(`back-letter${i}`, "back-letters")
            splitLetter.innerText = animeLetter;
            backInput.appendChild(splitLetter)


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

          mainSpellCheck(mainInput.value, endText)
        }
      }

      mainInput.addEventListener("input", async (lett) => {


        let lastIndex = mainInput.value.length - 1;
        let backLetter = document.querySelector(`.back-letter${lastIndex}`)

        if (resText[lastIndex] === lett.data) {
          backLetter.style.boxShadow = "0px 12px 0px -2px rgb(255, 255, 255), 0px 24px 2px -2px rgb(1, 255, 1), 0px 24px 1px -1px rgb(0, 0, 0)"

        } else if (resText[lastIndex] !== lett.data && lett.data !== null) {
          backLetter.style.boxShadow = "0px 12px 0px -2px rgb(255, 255, 255), 0px 24px 2px -2px rgb(255, 1, 1), 0px 24px 1px -1px rgb(0, 0, 0)"

        }

        let backspaceLetter = document.querySelector(`.back-letter${lastIndex + 1}`)

        if (lett.data === null) {
          backspaceLetter.style.boxShadow = "none";
        }

      })



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

  audio.playbackRate = 1; // important thing for speed

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


});


// sidebare

const scrollButtonLeft = document.querySelector(".left-slide-button");
let sidebarLeft = document.querySelector(".sidebar-left");
let slideImgLeft = document.querySelector(".left-slide-img")

const images = ['icons/right_arrow_icon.png', 'icons/left_arrow_icon.png'];
let currentImageIndex = 0;

scrollButtonLeft.addEventListener("click", async () => {
  sidebarLeft.classList.toggle("hide-left")
  scrollButtonLeft.classList.toggle("hide-left-button")

  currentImageIndex = (currentImageIndex + 1) % images.length;
  slideImgLeft.src = images[currentImageIndex];
})

const scrollButtonRight = document.querySelector(".right-slide-button");
let sidebarRight = document.querySelector(".sidebur-right");
let slideImgRight = document.querySelector(".right-slide-img")

scrollButtonRight.addEventListener("click", async () => {
  sidebarRight.classList.toggle("hide-right")
  scrollButtonRight.classList.toggle("hide-right-button")

})

// console.log(slideImgRight);