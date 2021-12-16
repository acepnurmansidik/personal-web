function submitForm() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-Email").value;
  let subject = document.getElementById("input-Content").value;
  let message = document.getElementById("input-Message").value;

  if (!name || !email || !subject || !message) {
    alert("Semua form harus diisi");
  } else {
    sendEmail(name, email, subject, message);
  }
}

function sendEmail(name, email, subject, message) {
  let a = document.createElement("a");
  a.href = `mailto:${email}?subject=${subject}&body=My name ${name}, ${message}`;
  a.click();
}
