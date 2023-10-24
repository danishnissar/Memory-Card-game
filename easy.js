const easyEl = document.querySelector(".easy");

const easy = [];
const imgs = ["kim", "netanyahu", "Salman", "trump"];

for (let i = 0; i < 8; i++) {
  let el = document.createElement("div");
  el.classList.add("card");
//   remainder of 1 to 3
  el.innerHTML = `<img class="hide" src="./imgs/${imgs[i % 4]}.jpg" alt=${
    imgs[i % 4]
  }/>`;
  easy.push(el);
}

easy.sort(() => {
  return Math.random() - 0.5;
});

for (let c of easy) {
  easyEl.append(c);
}

let isFirstCardFlipped = null;
let isSecondCardFlipped = null;

for (let c of easy) {
  c.addEventListener("click", async () => {
    if (isFirstCardFlipped == null && isSecondCardFlipped == null) {
      c.children[0].classList.remove("hide");
      isFirstCardFlipped = c;
    } else if (isFirstCardFlipped && isSecondCardFlipped == null) {
      c.children[0].classList.remove("hide");
      isSecondCardFlipped = c;
      if (
        isFirstCardFlipped.children[0].src !==
        isSecondCardFlipped.children[0].src
      ) {
        await new Promise((r) => setTimeout(r, 1000));
        isFirstCardFlipped.children[0].classList.add("hide");
        isSecondCardFlipped.children[0].classList.add("hide");
      } else {
        let isWin = checkWin();
        if (isWin) {
          window.location.href = "win.html";
        }
      }
      isFirstCardFlipped = null;
      isSecondCardFlipped = null;
    }
  });
}

const checkWin = () => {
  for (let c of easy) {
    if (c.children[0].classList.contains("hide")) {
      return false;
    }
  }
  return true;
};