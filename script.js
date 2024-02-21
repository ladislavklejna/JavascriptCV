"use strict";
const calc = document.querySelector("#vypocitej");
const mailSend = document.querySelector("#mail-send");

calc.addEventListener("click", calcAll);
mailSend.addEventListener("click", mailCheck);

function calcAll(event) {
  event.preventDefault();
  const chbg = document.querySelectorAll('input[name="typ_kola"]');
  const ks = document.querySelectorAll('input[name="pocet"]');
  const select = document.querySelectorAll("select");
  const rbg = document.querySelectorAll("input[type=radio]:checked");
  const userMax = document.querySelector("#max-castka");
  const sum = document.querySelector("#sum");
  const message = document.querySelector("#message");

  let cena = 0;

  function procenta(x) {
    cena = (cena / 100) * x + cena;
    return cena;
  }

  function sumMessage(color, cena) {
    sum.style.color = color;
    sum.textContent = "Celkem: " + cena.toString() + ",-Kč";
    if ((color = "green")) {
      message.classList.add("hidden");
    } else {
      message.classList.remove("hidden");
      message.textContent = "částka převyšuje vaši maximální zadanou částku!";
    }
  }

  for (let i = 0; i < chbg.length; i++) {
    if (chbg[i].checked) {
      let typNumber = parseInt(chbg[i].value);
      let ksNumber = ks[i].value === "" ? 0 : parseInt(ks[i].value);
      cena += typNumber * ksNumber;
    }
  }
  cena = cena * parseInt(select[0].value);

  switch (rbg[0].value) {
    case "10":
      cena = procenta(10);
      break;
    case "5":
      cena = procenta(5);
      break;

    default:
      break;
  }

  if (userMax.value !== "") {
    if (cena <= parseInt(userMax.value)) {
      sumMessage("green", cena);
    } else {
      sumMessage("red", cena);
    }
  } else {
    sum.textContent = "Celkem: " + cena.toString() + ",-Kč";
  }
}
function mailCheck() {
  const mailInput = document.querySelectorAll('input[name="email"]');
  const message = document.querySelector("#mail-message");

  function mailMessage(color) {
    message.style.color = color;
    message.textContent =
      color === "green" ? "Mail - OK - odesláno" : "Mail neobsahuje znak @";
    message.classList.remove("hidden");
  }

  if (mailInput[0].value.includes("@")) {
    mailMessage("green");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    mailMessage("red");
  }
}
