

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

function updateActiveLink() {

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  let currentSection = "";

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 200 && rect.bottom >= 200) {
      currentSection = section.id;
    }

    if (window.scrollY < 50) {
      currentSection = "etusivu";
    }
  });

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
    currentSection = sections[sections.length - 1].id;
  }

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

function downloadCV() {
  alert("Tiedoston lataaminen onnistui.");

  const link = document.createElement('a');
  link.href = "Visuaalinen cv 2026.pdf";
  link.download = "Visuaalinen cv 2026.pdf";
  link.click();
}

document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const submission = {
    date: new Date().toLocaleString(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
};

  let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

  submissions.push(submission);

  localStorage.setItem("submissions", JSON.stringify(submissions));

  alert("Tiedot tallennettu!");
  document.getElementById("myForm").reset();
});

document.getElementById("secret").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = document.getElementById("secret");
  const devKeyInput = document.getElementById("devKey");
  const devKey = devKeyInput.value;

  if (devKey !== "Devinfo093") {
    alert("Pääsy kielletty!");
    form.reset();
    return;
  }

  const submissions = localStorage.getItem("submissions");

  if (!submissions) {
    alert("Dataa ei löytynyt.");
    form.reset();
    return;
  }

  const blob = new Blob([submissions], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "submissions.json";
  a.click();

  URL.revokeObjectURL(url);

  alert("Lataus alkoi.");

  form.reset();
});

