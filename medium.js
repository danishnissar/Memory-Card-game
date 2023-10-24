const mediumEl = document.querySelector(".medium");

const medium = [];
const imgs = ["kim1", "netanyahu1", "Salman", "trump1","Kangana1","modi","adani","goswami","abdullah","mahbooba"];

for (let i = 0; i < 20; i++) {
  let el = document.createElement("div");
  el.classList.add("card");
//   remainder of 1 to 3
  el.innerHTML = `<img class="hide" src="./imgs/${imgs[i % 10]}.jpg" alt=${
    imgs[i % 10]
  }/>`;
  medium.push(el);
}

medium.sort(() => {
  return Math.random() - 0.5;
});

for (let c of medium) {
  mediumEl.append(c);
}

let isFirstCardFlipped = null;
let isSecondCardFlipped = null;

for (let c of medium) {
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
  for (let c of medium) {
    if (c.children[0].classList.contains("hide")) {
      return false;
    }
  }
  return true;
};