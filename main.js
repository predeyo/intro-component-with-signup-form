SIGN_UP_FORM = document.getElementsByClassName("sign-up-form")[0];
FORM_INPUT_BLOCKS = document.querySelectorAll(".sign-up-form .input-block");

function handleSubmit(e) {
  e.preventDefault();
  let errors = 0;
  for (entry of FORM_INPUT_BLOCKS) {
    errors = validateField(entry) ? errors : errors + 1;
  }
  // Submit if no errors
  if (!errors) {
    alert("Form sumbitted!");
    for (entry of FORM_INPUT_BLOCKS) {
      entry.children[0].value = "";
    }
  }
}

// return true if field is valid, else sets error message, .invalid class and returns false
function validateField(inputBlock) {
  if (!isNotEmpty(inputBlock.children[0].value)) {
    inputBlock.children[2].textContent =
      inputBlock.children[0].title + " cannot be empty";
    inputBlock.classList.add("invalid");
    return false;
  } else if (
    inputBlock.children[0].name == "email" &&
    !isEmail(inputBlock.children[0].value)
  ) {
    inputBlock.children[2].textContent =
      " Looks like this in not an " + inputBlock.children[0].title;
    inputBlock.classList.add("invalid");
    return false;
  } else {
    inputBlock.classList.remove("invalid");
    return true;
  }
}

function isNotEmpty(name) {
  return name.match(/\S+/) ? true : false;
}
function isEmail(name) {
  return name.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ? true
    : false;
}

// Event Listeners
SIGN_UP_FORM.addEventListener("submit", handleSubmit);
for (entry of FORM_INPUT_BLOCKS) {
  let self = entry;
  entry.children[0].addEventListener("input", function() {
    validateField(self);
  });
}
