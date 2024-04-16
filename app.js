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

const content = `This night is cold in the kingdom.
  I can feel you fade away.
  From the kitchen to the bathroom sink and.
  Your steps keep me awake.
  Don't cut me down, throw me out, leave me here to waste.
  I once was a man with dignity and grace.
  Now I'm slippin' through the cracks of your cold embrace.
  So please, please.
  Could you find a way to let me down slowly?
  A little sympathy, I hope you can show me.
  If you wanna go then I'll be so lonely.
  If you're leavin', baby, let me down slowly.
  Let me down, down, let me down, down, let me down.
  Let me down, down, let me down, down, let me down.
  If you wanna go then I'll be so lonely.
  If you're leavin', baby, let me down slowly.
  Cold skin, drag my feet on the tile.
  As I'm walking down the corridor.
  And I know we haven't talked in a while.
  So I'm looking for an open door.
  Don't cut me down, throw me out, leave me here to waste.
  I once was a man with dignity and grace.
  Now I'm slippin' through the cracks of your cold embrace.
  So please, please.
  Could you find a way to let me down slowly?
  A little sympathy, I hope you can show me.
  If you wanna go then I'll be so lonely.
  If you're leavin', baby, let me down slowly.
  Let me down, down, let me down, down, let me down.
  Let me down, down, let me down, down, let me down.
  If you wanna go then I'll be so lonely.
  If you're leavin', baby, let me down slowly.
  And I can't stop myself from fallin' (down) down.
  And I can't stop myself from fallin' (down) down.
  And I can't stop myself from fallin' (down) down.
  And I can't stop myself from fallin' (down) down.
  Could you find a way to let me down slowly?
  A little sympathy, I hope you can show me.
  If you wanna go then I'll be so lonely.
  If you're leavin', baby, let me down slowly.
  Let me down, down, let me down, down, let me down.
  Let me down, down, let me down, down, let me down.
  If you wanna go then I'll be so lonely.
  If you're leavin', baby, let me down slowly.
  If you wanna go then I'll be so lonely.
  If you're leavin', baby, let me down slowly.
  `;

let i = 0;
let index = 0;
let newLetter = 0;
let gameStart = 0;
let backInputText = "";

window.addEventListener("keydown", async (enter) => {
  if ("Enter" === enter.key) {
    gameStart++;
  }

  if (gameStart === 1) {
    mainInput.focus();
    // window.location.reload();

    async function mainFunction() {
      let separatedContent = content.split(/[.?]/);

      for (let cont of separatedContent) {
        if (cont.length <= inputLength) {
          cont = cont.trim();
          for (let letterPlay of cont) {
            await delay(40);

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

            gsap.to(`.${addClass}`, {
              ease: "easeOutIn",
              duration: 2,
              repeat: 0,
              paddingTop: 406,
              paddingBottom: 0,
            });

            i++;

            if (i >= cont.length) {
              await delay(2000);
              mainTextPart.innerHTML = "";
              mainInput.value = ``;
              backInputText = "";
              i = 0;
            }
          }
        } else if (cont.length > inputLength) {
          let spaceLess = cont.split(" ");
          let countCont = spaceLess.length;
          let cont1 = spaceLess.slice(0, countCont / 2).join(" ");
          let cont2 = spaceLess.slice(countCont / 2).join(" ");
          let cont3 = [cont1, cont2];

          for (let cont of cont3) {
            cont = cont.trim();
            if (cont.length <= inputLength) {
              for (let letterPlay of cont) {
                await delay(40);

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

                gsap.to(`.${addClass}`, {
                  ease: "easeOutIn",
                  duration: 2,
                  repeat: 0,
                  paddingTop: 406,
                  paddingBottom: 0,
                });

                // console.log(cont.length, i);
                i++;

                if (i >= cont.length) {
                  await delay(2000);
                  mainTextPart.innerHTML = "";
                  mainInput.value = "";
                  backInputText = "";
                  i = 0;
                }
              }
            }
          }
        }
      }

      gameStart = 0;
      backInput.innerText = "ENTER TO START!";
      backInput.style.textAlign = "center";
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    mainFunction();

    audio
      .play()
      .then(() => {
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
      })
      // .catch((error) => console.error("Error playing audio:", error));
  }

  console.log(enter.key);
});
