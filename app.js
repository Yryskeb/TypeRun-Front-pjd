const mainInput = document.querySelector(".main-input");
const inputWidth = mainInput.offsetWidth;
const fontSize = parseInt(window.getComputedStyle(mainInput).fontSize);

const inputLength = Math.floor(inputWidth / (fontSize * 0.6)); // Adjust 0.6 based on font and padding

console.log(inputLength);

let text = document.querySelector(".main-text");
let mainTextPart = document.querySelector(".main-text-part");

// create Element

// let arr = [1, 2, 3, 4, 5];

// arr.forEach(function(element) {
//   console.log(element);
// });

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
let space = "";
let newLetter = 0;
let switchCicle = 1;

mainInput.addEventListener("keydown", async (e) => {
  if ("Enter" === e.key) {
    mainInput.value = "";

    // let separatedContent = content.split(/[.?]/);

    async function mainFunction() {
      let separatedContent = content.split(/[.?]/);

      for (let cont of separatedContent) {
        if (cont.length <= inputLength) {
          cont = cont.trim();
          for (let letterPlay of cont) {
            await delay(50);

            newLetter = document.createElement("p");
            newLetter.classList.add("main-text");

            newLetter.innerText = letterPlay;
            let addClass = `main-text${i}`;
            newLetter.classList.add(addClass);
            mainTextPart.appendChild(newLetter);

            if (letterPlay === " ") {
              console.log(newLetter.innerText);
              newLetter.style.padding = "2px";
            }

            gsap.to(`.${addClass}`, {
              ease: "easeOutIn",
              duration: 1,
              repeat: 0,
              paddingTop: 400,
              paddingBottom: 0,
            });

            // console.log(cont.length, i);
            i++;

            if (i >= cont.length) {
              await delay(1000);
              mainTextPart.innerHTML = "";
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
                await delay(50);

                newLetter = document.createElement("p");
                newLetter.classList.add("main-text");

                newLetter.innerText = letterPlay;
                let addClass = `main-text${i}`;
                newLetter.classList.add(addClass);
                mainTextPart.appendChild(newLetter);

                if (letterPlay === " ") {
                  console.log(newLetter.innerText);
                  newLetter.style.padding = "2px";
                }

                gsap.to(`.${addClass}`, {
                  ease: "easeOutIn",
                  duration: 1,
                  repeat: 0,
                  paddingTop: 400,
                  paddingBottom: 0,
                });

                // console.log(cont.length, i);
                i++;

                if (i >= cont.length) {
                  await delay(1000);
                  mainTextPart.innerHTML = "";
                  i = 0;
                }
              }
            }
          }
        } 
      }
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    mainFunction();
  }
});
