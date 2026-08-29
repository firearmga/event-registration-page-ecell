const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Get values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const team = document.getElementById("team").value.trim();
  const idea = document.getElementById("idea").value.trim();

  // Error elements
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const teamError = document.getElementById("teamError");
  const ideaError = document.getElementById("ideaError");

  // Clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  teamError.textContent = "";
  ideaError.textContent = "";

  let valid = true;

  // Name validation
  if (name.length < 2) {
    nameError.textContent = "Please enter a valid name.";
    valid = false;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    valid = false;
  }

  // Phone validation
  const phonePattern = /^[0-9]{10}$/;

  if (!phonePattern.test(phone)) {
    phoneError.textContent = "Phone number must contain 10 digits.";
    valid = false;
  }

  // Team validation
  if (team.length < 2) {
    teamError.textContent = "Please enter a team name.";
    valid = false;
  }

  // Idea validation
  if (idea.length < 20) {
    ideaError.textContent =
      "Please describe your idea in at least 20 characters.";
    valid = false;
  }

  // Stop if validation failed
  if (!valid) {
    return;
  }

  // Disable submit button while sending
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  try {
    // Send data to your backend
    const response = await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        team: team,
        idea: idea,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Submission failed.");
    }

    // Only show success after backend confirms submission
    successMessage.textContent = "Registration submitted successfully!";
    successMessage.style.display = "block";

    // Reset form
    form.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  } catch (error) {
    console.error("Submission error:", error);

    alert(
      "Sorry, your registration could not be submitted. Please try again."
    );
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
  }
});
