let firstPara = document.querySelector(`.first_convert_para`);
let secondPara = document.querySelector(`.second_convert_para`);
fetch(`https://api.exchangerate.host/latest?base=RUB&symbols=USD `)
  .then((res) => res.json())
  .then((data) => {
    firstPara.innerHTML = `1 RUB = ${data.rates.USD} USD`;
    fInput.addEventListener("keyup", (event) => {
      sInput.value = `${fInput.value * data.rates.USD}`;
    });
  });
fetch(`https://api.exchangerate.host/latest?base=USD&symbols=RUB `)
  .then((res) => res.json())
  .then((data) => {
    secondPara.innerHTML = `1 USD = ${data.rates.RUB} RUB`;
    sInput.addEventListener("keyup", (event) => {
      fInput.value = `${sInput.value * data.rates.RUB}`;
    });
  });

let fHeader = document.querySelector(".first_header");
let fBtns = fHeader.querySelectorAll(".btn");
for (let i = 0; i < fBtns.length; i++) {
  let current = document.getElementsByClassName("active");
  fBtns[i].addEventListener("click", function () {
    console.log(fBtns[i].innerHTML);
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    sBtns.forEach((sBtn) => {
      if (sBtn.classList.contains("active")) {
        let simvol = sBtn.innerHTML;
        fetch(
          `https://api.exchangerate.host/latest?base=${fBtns[i].innerHTML}&symbols=${simvol}`
        )
          .then((res) => res.json())
          .then((data) => {
            firstPara.innerText = `1 ${fBtns[i].innerText} = ${Object.values(data.rates)[0]
              } ${simvol}`;
            secondPara.innerText = `1 ${simvol} = ${1 / Object.values(data.rates)[0]
              } ${fBtns[i].innerText}`;
            sInput.value = `${fInput.value * Object.values(data.rates)[0]}`;
            fInput.addEventListener("keyup", (event) => {
              sInput.value = `${fInput.value * Object.values(data.rates)[0]}`;
            });
          });
      }
    });
  });
}
let sHeader = document.querySelector(".second_header");
let sBtns = sHeader.querySelectorAll("button");
for (let i = 0; i < sBtns.length; i++) {
  let current = document.getElementsByClassName("active");
  sBtns[i].addEventListener("click", function () {
    current[1].className = current[1].className.replace(" active", "");
    this.className += " active";
    fBtns.forEach((fBtn) => {
      if (fBtn.classList.contains("active")) {
        let simvol = fBtn.innerHTML;
        fetch(
          `https://api.exchangerate.host/latest?base=${sBtns[i].innerHTML}&symbols=${simvol}`
        )
          .then((res) => res.json())
          .then((data) => {
            secondPara.innerHTML = `1 ${sBtns[i].innerHTML} = ${Object.values(data.rates)[0]
              } ${simvol}`;
            firstPara.innerHTML = `1 ${simvol} = ${1 / Object.values(data.rates)[0]
              } ${sBtns[i].innerHTML}`;
            fInput.value = `${sInput.value * Object.values(data.rates)[0]}`;
            sInput.addEventListener("keyup", (event) => {
              fInput.value = `${sInput.value * Object.values(data.rates)[0]}`;
            });
          });
      }
    });
  });
}
let fInput = document.querySelector(`.first_convert_content`);
let sInput = document.querySelector(`.second_convert_content`);
fInput.addEventListener("keyup", (event) => {
  if (event.target.value.includes(",") == true) {
    fInput.value = `${event.target.value.replaceAll(",", ".")}`;
  }
});
sInput.addEventListener("keyup", (event) => {
  if (event.target.value.includes(",") == true) {
    sInput.value = `${event.target.value.replaceAll(",", ".")}`;
  }
});