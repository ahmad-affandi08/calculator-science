const nimToNameMap = {
  230103243: "AHMAD AFFANDI SIKUMBANG",
  230103248: "FARIS SYAFIQ",
  230103264: "FERBI SETIYANTO",
  230103250: "ROYAN FIRDAUS UBAIDAH",
};

function appendToDisplay(value) {
  const display = document.querySelector("#display");
  display.value += value;
}

function clearDisplay() {
  const display = document.querySelector("#display");
  display.value = "";
}

function handleEquals() {
  const display = document.querySelector("#display");
  const nilaiDisplay = display.value.trim();

  if (nimToNameMap[nilaiDisplay]) {
    display.value = nimToNameMap[nilaiDisplay];
  } else if (nilaiDisplay.startsWith("08")) {
    const nomorWA = nilaiDisplay.replace(/\s+/g, "");
    if (/^\d+$/.test(nomorWA)) {
      const urlWhatsApp = `https://wa.me/62${nomorWA.slice(1)}`;
      window.open(urlWhatsApp, "_blank");
    } else {
      display.value = "Nomor WhatsApp tidak valid";
    }
  } else {
    try {
      const result = eval(nilaiDisplay);
      display.value = result;
    } catch (e) {
      display.value = "Error";
    }
  }
}

function handleFunction(func) {
  const display = document.querySelector("#display");
  const value = parseFloat(display.value);

  if (isNaN(value)) {
    display.value = "Error";
    return;
  }

  let result;
  switch (func) {
    case "sin":
      result = Math.sin(value);
      break;
    case "cos":
      result = Math.cos(value);
      break;
    case "tan":
      result = Math.tan(value);
      break;
    case "log":
      result = Math.log10(value);
      break;
    case "sqrt":
      result = Math.sqrt(value);
      break;
    default:
      result = "Error";
  }

  display.value = result;
}

function handleBackspace() {
  const display = document.querySelector("#display");
  display.value = display.value.slice(0, -1);
}

document.querySelectorAll("button").forEach((button) => {
  const value = button.textContent.trim();
  if (value === "=") {
    button.addEventListener("click", handleEquals);
  } else if (value === "C") {
    button.addEventListener("click", clearDisplay);
  } else if (value === "←") {
    button.addEventListener("click", handleBackspace);
  } else if (value === "√") {
    button.addEventListener("click", () => handleFunction("sqrt"));
  } else if (["sin", "cos", "tan", "log"].includes(value)) {
    button.addEventListener("click", () => handleFunction(value));
  } else {
    button.addEventListener("click", () => appendToDisplay(value));
  }
});

function handleKeyboardInput(event) {
  const key = event.key;

  const keyMappings = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    ".": ".",
    Enter: "=",
    Backspace: "Backspace",
    c: "C",
  };

  const display = document.querySelector("#display");

  if (keyMappings.hasOwnProperty(key)) {
    const value = keyMappings[key];

    if (value === "Backspace") {
      handleBackspace();
    } else if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      handleEquals();
    } else {
      appendToDisplay(value);
    }
  }
}

document.addEventListener("keydown", handleKeyboardInput);
