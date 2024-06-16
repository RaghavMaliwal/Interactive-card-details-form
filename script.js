let submit = document.querySelector(".submit");

submit.addEventListener("click", validate);

function validate(event) {
  event.preventDefault(); // Prevent form submission

  let inputs = [
    { element: document.querySelector("#name"), error: "Can't be blank" },
    {
      element: document.querySelector("#cardnumber"),
      error: "Can't be blank",
      regex: /^[0-9]{16}$/,
      regexError: "Enter valid cardnumber",
    },
    {
      element: document.querySelector("#cvc"),
      error: "Can't be blank",
      regex: /^[0-9]{3}$/,
      regexError: "Enter valid CVC",
    },
    { element: document.querySelector("#month"), error: "Can't be blank" },
    { element: document.querySelector("#year"), error: "Can't be blank" },
  ];

  let isValid = true;

  inputs.forEach((input) => {
    let { element, error, regex, regexError } = input;
    let value = element.value.trim();

    // Clear previous error messages
    clearError(element);

    if (value === "") {
      showError(element, error);
      element.style.borderColor = "hsl(0, 100%, 66%)";
      isValid = false;
    } else if (regex && !regex.test(value)) {
      showError(element, regexError);
      element.style.borderColor = "hsl(0, 100%, 66%)";
      isValid = false;
    } else {
      element.style.borderColor = "";
    }
  });

  if (isValid) {
    displayThankYou();
  }
}

function displayThankYou() {
  let thank = document.querySelector(".thank");
  let form = document.querySelector(".formelement");

  form.style.visibility = "hidden";
  thank.style.visibility = "visible";
  form.style.height = "0";
  form.style.width = "0";
  thank.style.height = "440px";
  thank.style.width = "440px";
}

let flag = 0;
function showError(element, error) {
  let alert = document.createElement("p");
  alert.innerHTML = error;
  alert.style.color = "hsl(0, 100%, 66%)";
  alert.style.fontSize = "14px";
  alert.style.fontWeight = "700";
  alert.style.marginBottom = "5px";
  alert.style.marginTop = "5px";
  alert.style.textTransform = "none";

  let parent = element.parentElement;

  if (
    element == document.querySelector("#month") ||
    (flag !== 1 && element == document.querySelector("#year"))
  ) {
    let grandparent = parent.parentElement;
    grandparent.appendChild(alert);
    alert.style.marginRight = "90px";
    flag = 1; // Set flag if condition is met
  } else if (element == document.querySelector("#year") && flag === 1) {
    // Handle specific case if needed
  } else {
    parent.appendChild(alert);
  }
}

function clearError(element) {
  let parent = element.parentElement;

  let alerts = parent.querySelectorAll("p");

  if (
    element == document.querySelector("#month") ||
    (flag !== 1 && element == document.querySelector("#year"))
  ) {
    let grandparent = parent.parentElement;
    let grandalerts = grandparent.querySelectorAll("p");
    grandalerts.forEach((alert) => alert.remove());
    flag = 1; // Set flag if condition is met
  } else if (element == document.querySelector("#year") && flag === 1) {
    // Handle specific case if needed
  } else {
    alerts.forEach((alert) => alert.remove());
  }
}
