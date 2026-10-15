const form = document.getElementById("registrationForm");
const resultMessage = document.getElementById("resultMessage");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const pictureInput = document.getElementById("picture");
const fileHint = document.getElementById("fileHint");
const toast = document.getElementById("toast");

const citiesByState = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tirunelveli"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"]
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.setTimeout(() => toast.classList.add("hidden"), 2600);
}

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.toggle;
    const menu = document.getElementById(`${name}-menu`);
    const isHidden = menu.classList.toggle("hidden");
    const chevron = button.querySelector(".chevron");
    if (chevron) chevron.textContent = isHidden ? "⌄" : "⌃";
  });
});

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const page = button.dataset.page;
    if (page !== "Practice Form") {
      showToast(`${page} is a navigation demo. The Practice Form is ready to use.`);
    }
  });
});

stateSelect.addEventListener("change", () => {
  const state = stateSelect.value;
  citySelect.innerHTML = '<option value="">Choose City</option>';
  const cities = citiesByState[state] || [];
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
  citySelect.disabled = cities.length === 0;
});

pictureInput.addEventListener("change", () => {
  const file = pictureInput.files[0];
  fileHint.textContent = file ? `Selected: ${file.name}` : "Optional image upload; the file is not sent to a server.";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get("studentName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const mobile = String(formData.get("mobile") || "").trim();
  const gender = formData.get("gender");
  const hobbies = formData.getAll("hobbies");

  if (!/^[0-9]{10}$/.test(mobile)) {
    resultMessage.className = "result-message error";
    resultMessage.textContent = "Please enter a valid 10-digit mobile number.";
    return;
  }
  if (!gender) {
    resultMessage.className = "result-message error";
    resultMessage.textContent = "Please select a gender option.";
    return;
  }

  const details = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Gender: ${gender}`,
    `Mobile: ${mobile}`,
    `Hobbies: ${hobbies.length ? hobbies.join(", ") : "None selected"}`,
    `State: ${formData.get("state") || "Not selected"}`,
    `City: ${formData.get("city") || "Not selected"}`
  ];

  resultMessage.className = "result-message";
  resultMessage.innerHTML = "";
  const heading = document.createElement("strong");
  heading.textContent = "Registration submitted successfully!";
  const list = document.createElement("ul");
  details.forEach((detail) => {
    const item = document.createElement("li");
    item.textContent = detail;
    list.appendChild(item);
  });
  resultMessage.append(heading, list);
  showToast(`Thanks, ${name}! Demo registration completed.`);
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    citySelect.innerHTML = '<option value="">Choose City</option>';
    citySelect.disabled = true;
    resultMessage.className = "result-message hidden";
    resultMessage.textContent = "";
    fileHint.textContent = "Optional image upload; the file is not sent to a server.";
  }, 0);
});
