const greenButtons = document.querySelectorAll(".green-word-button");
const redButtons = document.querySelectorAll(".red-word-button");
const btnsArea = document.querySelector(".content-area");
const generate = document.querySelector("#generate-btn");

const degree = localStorage.getItem("type");
let enData;
let uzData;
if (degree === "hard") {
  enData = hard.en;
  uzData = hard.uz;
} else if (degree === "medium") {
  enData = medium.en;
  uzData = medium.uz;
} else {
  enData = easy.en;
  uzData = easy.uz;
}

// Random n number
function random(length, max) {
  if (length > max + 1) return [];
  let set = new Set([]);

  for (let i = 1; i > 0; i++) {
    let num = Math.ceil(Math.random() * 100);
    if (num <= max) set.add(num);
    if (set.size === length) break;
  }

  return [...set];
}

// Fixed array
function fixing(arr) {
  let copyArr = arr.slice();
  for (let i = copyArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
  }
  return copyArr;
}

// Select Words by random numbers
function randomBtns(uz, en) {
  const btns = { uz: [], uzPos: [], en: [], enPos: [] };
  const enWords = Object.keys(en);
  const uzWords = Object.keys(uz);

  const arrPos = fixing(btnsPositions);
  btns.uzPos = arrPos.slice(0, 10);
  btns.enPos = arrPos.slice(10);

  const arrBtn = random(10, enWords.length);
  for (let i = 0; i < arrBtn.length; i++) {
    btns.uz.push(uzWords[i]);
    btns.en.push(enWords[i]);
  }
  return btns;
}

// Select Words
const eng = document.querySelectorAll(".english");
const uzb = document.querySelectorAll(".uzbek");
const result = document.querySelector(".result");
let engValue;
let uzbValue;
let correctAswer = 0;

eng.forEach((item) => {
  item.addEventListener("click", function () {
    const selecetedWord = localStorage.getItem("uzWord");
    let keyWord = easy.en[this.innerText];
    if (selecetedWord == keyWord) {
      this.classList.add("bg-gray-500", "text-white");
      this.classList.remove(
        "bg-red-200",
        "text-orange-500",
        "hover:bg-[#9DE4C8]"
      );
      uzbValue?.classList.add("bg-gray-500", "text-white");
      uzbValue?.classList.remove(
        "bg-red-200",
        "text-orange-500",
        "hover:bg-[#9DE4C8]"
      );
      uzbValue = null;
      correctAswer++;
      result.innerText = correctAswer;
    } else {
      localStorage.setItem("enWord", keyWord);
      engValue = this;
      eng.forEach((item) => {
        item.classList.remove("bg-green-600", "text-white");
        item.classList.add("bg-[#D7E9E1]", "text-orange-500");
      });
      this.classList.add("bg-green-600", "text-white");
      this.classList.remove("bg-[#D7E9E1]", "text-orange-500");
    }
  });
});

uzb.forEach((item) => {
  item.addEventListener("click", function () {
    const selecetedWord = localStorage.getItem("enWord");
    let keyWord = easy.uz[this.innerText];
    if (selecetedWord == keyWord) {
      this.classList.add("bg-gray-500", "text-white");
      this.classList.remove(
        "bg-red-200",
        "text-orange-500",
        "hover:bg-red-400"
      );
      engValue.classList.add("bg-gray-500", "text-white", "hover:bg-gray-500");
      engValue.classList.remove(
        "bg-red-200",
        "text-orange-500",
        "bg-red-400",
        "hover:bg-red-400"
      );
      engValue = null;
      correctAswer++;
      result.innerText = correctAswer;
    } else {
      uzbValue = this;
      localStorage.setItem("uzWord", keyWord);
      uzb.forEach((item) => {
        item.classList.remove("bg-red-400", "text-white");
        item.classList.add("bg-red-200", "text-orange-500");
      });
      this.classList.add("bg-red-400", "text-white");
      this.classList.remove("bg-red-200", "text-orange-500");
    }
  });
});

var secons = 30;
var modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");
function countClock() {
  secons--;
  document.querySelector("#clock").innerText = secons;
  if (secons == 0) {
    clearInterval(timer);
    modal.classList.remove("hidden");
    const res = document.querySelector("#res");
    res.innerText = correctAswer;
  }
}

let timer = setInterval(countClock, 1000);
function restart() {
  secons = 31;
  clearInterval(timer);
  modal.classList.add("hidden");
  timer = setInterval(countClock, 1000);
}
const closeModalBtn = document.querySelector("#closeModal");
closeModalBtn?.addEventListener("click", restart);

function showBtns() {
  const btns = randomBtns(uzData, enData);
  for (let i = 0; i < btns.en.length; i++) {
    const uzBtnPos1 = "top-[" + btns.uzPos[i].top + "]";
    const uzBtnPos2 = "left-[" + btns.uzPos[i].left + "]";

    const btnElement = document.createElement("button");
    btnElement.classList.add(
      "-translate-x-1/2",
      "uzbek",
      "w-[150px]",
      "pt-[10px]",
      "pb-[12px]",
      "px-5",
      "duration-200",
      "hover:bg-red-400",
      "hover:text-white",
      "bg-red-200",
      "text-orange-500",
      "text-2xl",
      "mb-1",
      "inline-block",
      "rounded-md",
      "absolute",
      "font-bold",
      "rounded-md",
      uzBtnPos1,
      uzBtnPos2
    );
    btnElement.innerHTML = btns.uz[i];
    btnsArea.appendChild(btnElement);
  }

  for (let i = 0; i < btns.en.length; i++) {
    const enBtnPos1 = "top-[" + btns.enPos[i].top + "]";
    const enBtnPos2 = "left-[" + btns.enPos[i].left + "]";

    const btnElement = document.createElement("button");
    btnElement.classList.add(
      "-translate-x-1/2",
      "english",
      "w-[150px]",
      "pt-[10px]",
      "pb-[12px]",
      "duration-200",
      "hover:bg-[#9DE4C8]",
      "hover:text-white",
      "text-orange-500",
      "text-2xl",
      "bg-[#D7E9E1]",
      "mb-1",
      "inline-block",
      "rounded-md",
      "absolute",
      "font-bold",
      "rounded-md",
      enBtnPos1,
      enBtnPos2
    );
    btnElement.innerHTML = btns.en[i];
    btnsArea.appendChild(btnElement);
  }
  restart();
}
showBtns();

generate.addEventListener("click", function () {
  btnsArea.innerHTML = "";
  showBtns();
});
