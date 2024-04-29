
{
  class GamePlayAnimation {
    constructor() {
      this.mainInput = document.querySelector(".main-input");
      this.inputWidth = this.mainInput.offsetWidth;
      this.fontSize = parseInt(window.getComputedStyle(this.mainInput).fontSize);
      this.inputLength = Math.floor(this.inputWidth / (this.fontSize * 0.6));
      this.bitsPart = document.querySelector(".play-bits");
      this.mainTextPart = document.querySelector(".main-text-part");
      this.backInput = document.querySelector(".back-input");
      this.startButton = document.querySelector(".start-button");
      this.addNewSong = document.querySelector(".add-new-song")


      this.i = 0;
      this.index = 0;
      this.newLetter = 0;
      this.gameStart = 0;
      this.timeOut = 0;
      this.rightScore = 0;
      this.falseScore = 0;

      // 1 part 

      this.scrollButtonLeft = document.querySelector(".left-slide-button");
      this.sidebarLeft = document.querySelector(".sidebar-left");
      this.slideImgLeft = document.querySelector(".left-slide-img");
      this.images = ['icons/right_arrow_icon.png', 'icons/left_arrow_icon.png'];
      this.currentImageIndex = 0;

      this.scrollButtonRight = document.querySelector(".right-slide-button");
      this.sidebarRight = document.querySelector(".sidebur-right");
      this.slideImgRight = document.querySelector(".right-slide-img")
    }

    splitTextByNumber(text, number) {
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

    async mainSpellCheck(inputValue, contText) {
      let compareResult = 0;
      for (let i = 0; i < inputValue.length; i++) {
        if (inputValue[i] === contText[i]) {
          compareResult++
        }
      }
      this.rightScore = compareResult;
      this.falseScore = contText.length - compareResult
    }

    async mainAnimationLetter(fullText, cont) {

      let li = 0;

      for (let endText of fullText) {

        this.mainInput.maxLength = endText.length
        endText = endText.trim();
        this.resText = endText
        let i = 0;
        let countIter = 1;

        this.backInput.innerHTML = '';
        this.mainInput.value = '';

        this.mainInput.addEventListener("input", async (lett) => {

          let lastIndex = this.mainInput.value.length - 1;
          let backLetter = document.querySelector(`.back-letter${lastIndex}`)

          if (this.resText[lastIndex] === lett.data) {
            backLetter.style.boxShadow = "0px 12px 0px -2px rgb(255, 255, 255), 0px 24px 2px -2px rgb(1, 255, 1), 0px 24px 1px -1px rgb(0, 0, 0)"
          } else if (lett.data !== null) {
            backLetter.style.boxShadow = "0px 12px 0px -2px rgb(255, 255, 255), 0px 24px 2px -2px rgb(255, 1, 1), 0px 24px 1px -1px rgb(0, 0, 0)"
          } else {
            let lastIndex = this.mainInput.value.length;
            let backLetter = document.querySelector(`.back-letter${lastIndex}`)
            backLetter.style.boxShadow = "none"
          }
        })

        for (let animeLetter of endText) {

          let timeLetter = Math.round(
            ((cont["end"] - cont["start"]) * 1000) /
            fullText.join(" ").length
          );

          await this.delay(timeLetter / 4);

          this.newLetter = document.createElement("span");
          let addClass = `main-text${li}`;
          this.newLetter.classList.add("main-text", addClass);

          this.backInput.style.textAlign = "start";
          let splitLetter = document.createElement("span")
          splitLetter.classList.add(`back-letter${i}`, "back-letters")
          splitLetter.innerText = animeLetter;
          this.backInput.appendChild(splitLetter)
          if (animeLetter === ' ') {
            this.newLetter.innerHTML = "&nbsp;";
            this.mainTextPart.appendChild(this.newLetter);
          } else {
            this.newLetter.innerText = animeLetter
            this.mainTextPart.appendChild(this.newLetter);
          }
          this.newLetter.style.animationName = "animationText";
          i++;
          this.newLetter.style.marginLeft = `${countIter}px`
          countIter += parseInt(window.getComputedStyle(this.newLetter).width)
        }



        await this.delay(2000)
        let elements = document.querySelectorAll(`.main-text${li}`);
        elements.forEach(element => element.remove());
        li++;
        this.mainSpellCheck(this.mainInput.value, endText)
      }
    }

    async mainFunction(content) {
      this.startButton.style.display = 'none';
      this.mainInput.value = '';
      this.backInput.innerText = '';
      this.mainInput.focus();

      this.rightScore = 0;
      this.falseScore = 0;

      for (let cont of content) {

        let delayCont = Math.floor((cont["start"] - this.timeOut) * 1000);
        await this.delay(delayCont);
        this.timeOut = cont["end"];

        let splitText = this.splitTextByNumber(cont["text"], this.inputLength);

        this.mainAnimationLetter(splitText, cont);
        let middleForTime = Math.round((cont["end"] - cont["start"]) * 1000);
        await this.delay(middleForTime);

      }
      this.gameStart = 0;
      this.backInput.innerText = "ENTER TO START!";
      this.backInput.style.textAlign = "center";
    }

    attachPlayEvents() {
      this.startButton.addEventListener('click', () => {

        this.content = fetch("Let_Me_Down.json")
          .then((response) => response.json())
          .then((data) => {
            this.content = data;
            this.segments = this.content["segments"];
            this.mainFunction(this.segments)
          })

      })

      this.scrollButtonLeft.addEventListener("click", async () => {
        this.sidebarLeft.classList.toggle("hide-left")
        this.scrollButtonLeft.classList.toggle("hide-left-button")

        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.slideImgLeft.src = this.images[this.currentImageIndex];
      })

      this.scrollButtonRight.addEventListener("click", async () => {
        this.sidebarRight.classList.toggle("hide-right")
        this.scrollButtonRight.classList.toggle("hide-right-button")

      })

      this.addNewSong.addEventListener("click", () => {
        console.log("test");
        document.querySelector(".add-new-song-form").classList.toggle("hide-song-form")
      })

    }

    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

  }

  let game = new GamePlayAnimation();
  game.attachPlayEvents();

}

{
  class LoadContent {
    constructor() {
      this.addNewSongForm = document.querySelector(".add-new-song-form")
      this.textLine = document.querySelector(".right-block-text")
    }

    attachLoadEvents() {
      document.addEventListener('DOMContentLoaded', () => {

        this.addNewSongForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const songName = this.addNewSongForm.querySelector('.new-song-name').value;
          const songFile = this.addNewSongForm.querySelector('.new-song').files[0];

          const formData = new FormData();
          formData.append('title', songName);
          formData.append('audio', songFile);

          let response = await fetch('http://127.0.0.1:8000/api/account/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'admin', password: '1' })
          })

          const data = await response.json()

          let responseLoad = await fetch('http://127.0.0.1:8000/api/audio/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${data.access}`
            },
            body: formData
          })
            .then(response => response.text())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        });

        this.textLine.addEventListener('submit', async (event) => {
          event.preventDefault();
          
          const songText = this.textLine.querySelector("#block-text").value;
          const songTextStart = this.textLine.querySelector("#text-time-start").value;
          const songTextEnd = this.textLine.querySelector("#text-time-end").value;

          console.log(songText, songTextStart, songTextEnd);

        })

      });

    }
  }

  let load = new LoadContent();
  load.attachLoadEvents();
}

