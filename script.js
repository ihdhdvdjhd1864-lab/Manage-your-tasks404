let Task = document.querySelector(".Task");
let input = document.querySelector("input");
let dilidAll = document.querySelector(".dilid");
let ul = document.querySelector("ul");
let count = document.querySelector("#count");
let up = document.querySelector(".up");

let dadaTscks = [];
if (localStorage.getItem("Tascksll") != null) {
  dadaTscks = JSON.parse(localStorage.getItem("Tascksll"));
} else {
  dadaTscks = [];
}

Task.addEventListener("click", function () {
  if (input.value.trim() === "") return;
  let dadeTSWOsck = {
    titel: input.value,
    completed: false,
  };
  dadaTscks.push(dadeTSWOsck);
  localStorage.setItem("Tascksll", JSON.stringify(dadaTscks));
  input.value = "";
  shawdade();
  updateCount();
});
function shawdade() {
  ul.innerHTML = "";
  for (let i = 0; i < dadaTscks.length; i++) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.classList.add("span11");
    let tadal = document.createElement("button");
    tadal.classList.add("tadal");
    let mktamll = document.createElement("button");
    mktamll.classList.add("mktamll");
    let DiliD = document.createElement("button");
    DiliD.classList.add("DiliD");
    let div = document.createElement("div");
    div.classList.add("div1100");
    li.appendChild(span);
    div.appendChild(DiliD);
    div.appendChild(tadal);
    div.appendChild(mktamll);
    ul.appendChild(li);
    li.appendChild(div);
    span.textContent = dadaTscks[i].titel;
    if (dadaTscks[i].completed === true) {
      // لو لقينها true (يعني خلصت)، حط خط رمادي وصغر الخط
      span.style.cssText = `
    text-decoration: line-through;
    font-size: 14px;
    color: rgb(144, 144, 144);
  `;
    }
    DiliD.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    mktamll.innerHTML = `<i class="fa-solid fa-check"></i>`;
    tadal.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    input.value = "";
    All();
    DiliD.addEventListener("click", function () {
      if (confirm("هل انت متاكد من حذف هذه المهمه؟")) {
        li.remove();
        dadaTscks.splice(i, 1);
        localStorage.setItem("Tascksll", JSON.stringify(dadaTscks));
        shawdade();
        updateCount();
      }
    });

    tadal.addEventListener("click", function () {
      let newTask = prompt("اكتب المهمه الجديده", span.textContent);
      if (newTask !== null && newTask.trim() !== "") {
        dadaTscks[i].titel = newTask;
        span.textContent = newTask;
        span.style.cssText = `
font-size: 20px;
transition: 1s;
color: rgb(0, 0, 0);
  `;
      }
      localStorage.setItem("Tascksll", JSON.stringify(dadaTscks));
      shawdade();
    });

    mktamll.addEventListener("click", function () {
      dadaTscks[i].completed = !dadaTscks[i].completed;
      localStorage.setItem("Tascksll", JSON.stringify(dadaTscks));
      if (dadaTscks[i].completed) {
        span.style.cssText = `
      text-decoration: line-through;
      font-size: 14px;
      color: rgb(144, 144, 144);
      transition: 0.5s ease;
    `;
      } else {
        span.style.cssText = `
      text-decoration: none;
      font-size: 20px;
      color: rgb(0, 0, 0);
      transition: 0.5s ease;
    `;
      }

      setTimeout(function () {
        shawdade();
      }, 500);
    });
  }
}
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    Task.click();
  }
});

function All() {
  if (ul.children.length > 0) {
    dilidAll.style.cssText = `
  display: block;
`;
  } else {
    dilidAll.style.cssText = `
          display: none;
        `;
  }
}

dilidAll.addEventListener("click", function () {
  if (confirm("هل انت متاكد مسح جميع مهام؟")) {
    ul.innerHTML = "";
    localStorage.removeItem("Tascksll");
    dadaTscks = [];
    input.value = "";
    All();
    updateCount();
  }
});

shawdade();

function updateCount() {
  count.textContent = dadaTscks.length;
}
updateCount();

up.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
setInterval(function () {
  if (window.scrollY > 200) {
    up.style.cssText = `
    display: flex;
    transition: 0.5s ease;
  `;
  } else {
    up.style.cssText = `
    display: none;
    transition: 0.5s ease;
  `;
  }
}, 100);
