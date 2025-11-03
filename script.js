const btnEnter = document.getElementById("btnEnter");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const mainForm = document.getElementById("mainForm");
const btnSend = document.getElementById("btnSend");
const btnHome = document.getElementById("btnHome");

let activeUser = "";

const loginName = "";
const loginPass = "";

btnEnter.addEventListener("click", () => {
    const userValue = document.getElementById("userField").value.trim();
    const passValue = document.getElementById("passField").value.trim();
    activeUser = userValue;
    if (userValue === loginName && passValue === loginPass) {
        document.getElementById("loginSection").classList.remove("visible");
        document.getElementById("welcomeSection").classList.add("visible");
        document.getElementById("welcomeHeader").textContent = `Welcome, ${userValue}!`;
    } else {
        showForm();
    }
});

if (btnYes && btnNo) {
    btnYes.addEventListener("click", () => {
        showForm();
        document.getElementById("welcomeSection").classList.remove("visible");
        mainForm.reset();
        btnSend.disabled = true;
    });
    btnNo.addEventListener("click", () => {
        document.getElementById("welcomeSection").classList.remove("visible");
        document.getElementById("resultSection").classList.add("visible");
        document.getElementById("resultHeader").textContent = `See you, ${activeUser}!`;
        document.getElementById("output").innerHTML = "<p>You have refused to participate in the survey.</p>";
    });
}

function showForm() {
    document.getElementById("loginSection").classList.remove("visible");
    document.getElementById("formSection").classList.add("visible");
    document.getElementById("formHeader").textContent = `Questionnaire for ${activeUser}`;
}

mainForm.addEventListener("input", () => {
    const requiredInputs = mainForm.querySelectorAll("[required]");
    let allValid = true;
    const petOptions = mainForm.querySelectorAll('input[name="Животные"]');
    const petChosen = Array.from(petOptions).some(r => r.checked);
    if (!petChosen) allValid = false;
    requiredInputs.forEach(field => {
        if (field.type !== "radio" && !field.value.trim()) {
            allValid = false;
        }
        if (field.tagName === "SELECT" && field.value === "") {
            allValid = false;
        }
    });
    btnSend.disabled = !allValid;
});

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(mainForm);
    let htmlResult = "<ul>";
    for (let [key, value] of formData.entries()) {
        htmlResult += `<li><b>${key}:</b> ${value}</li>`;
    }
    htmlResult += "</ul>";
    document.getElementById("output").innerHTML = htmlResult;
    document.getElementById("formSection").classList.remove("visible");
    document.getElementById("resultSection").classList.add("visible");
    document.getElementById("resultHeader").textContent = `Results for ${activeUser}`;
});

btnHome.addEventListener("click", () => {
    document.getElementById("resultSection").classList.remove("visible");
    document.getElementById("loginSection").classList.add("visible");
    document.getElementById("userField").value = "";
    document.getElementById("passField").value = "";
    mainForm.reset();
    btnSend.disabled = true;
    document.getElementById("output").innerHTML = "";
    activeUser = "";
});
