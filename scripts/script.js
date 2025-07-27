// calls fns on render
document.addEventListener("DOMContentLoaded", () => {
  setupNavigationLinks();
  setupAnimations();
  setupConnectButton();
});

// Function to handle navigation link click behavior
function setupNavigationLinks() {
  const links = document.querySelectorAll(".nav-link"); // Select all navigation links
  if (links.length) {
    links.forEach((link) => {
      link.addEventListener("click", () => {
        links.forEach((link) => link.classList.remove("active")); // Remove "active" class from all links
        link.classList.add("active"); // Add "active" class to the clicked link
      });
    });
  }
}

// Function to set up animations triggered by scrolling into view (in the section)
function setupAnimations() {
  const the_animation = document.querySelectorAll([
    ".fadein",
    ".slidein",
    ".popup",
    "toaster",
  ]); // Select elements with specific animation classes

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("scroll-animation", entry.isIntersecting); // Toggle animation class when element is in view
      });
    },
    { threshold: 0.2 } // Trigger animations when 20% of the element is visible
  );

  the_animation.forEach((element) => observer.observe(element)); // Observe each animation element
}

// Function to set up behavior for "Connect" buttons
function setupConnectButton() {
  const connectBtn = document.querySelectorAll(".connect-btn"); // Select all "Connect" buttons
  if (connectBtn) {
    connectBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        window.open("../pages/contact.html", "_self"); // Open the contact page when the btn is clicked
      })
    );
  }
}

// For scroll behavior
window.onscroll = (() => {
  let scrollTimeout; // Timeout variable to limit scroll handler frequency
  return () => {
    if (scrollTimeout) return; // Skip if timeout is active
    scrollTimeout = setTimeout(() => {
      const nav = document.getElementById("nav"); // Select navigation bar
      const selectionItems = document.querySelectorAll(".selection-item"); // Select elements with class "selection-item"

      // check scroll position
      const shouldBlur =
        document.body.scrollTop > 50 || document.documentElement.scrollTop > 50;

      nav.classList.toggle("blur", shouldBlur); // Toggle blur class for navigation bar
      selectionItems.forEach((item) =>
        item.classList.toggle("blur", shouldBlur)
      ); // Toggle blur class for other elements

      scrollTimeout = null; // Clear timeout
    }, 50); // Delay in execution
  };
})();

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get input elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const inputs = [nameInput, emailInput, messageInput];

  //email regex to check the format of emails
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Reset error states
  inputs.forEach((input) => input.classList.remove("error"));

  //function to show toaster when called
  const showToaster = (message, isError = false) => {
    const toaster = document.getElementById("toaster");
    toaster.textContent = message;

    // Add a class for styling error/success messages
    toaster.classList.toggle("error", isError);
    toaster.classList.add("visible");

    // Hide the toaster after 3 seconds
    setTimeout(() => {
      toaster.classList.remove("visible");
    }, 3000);
  };

  // Validation

  //validate all inputs are filled
  if (
    !nameInput.value ||
    !emailInput.value ||
    !messageInput.value
  ) {
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("error"); // Add error class to empty input
      }
    });
    showToaster("Please fill in all fields", true); // error message
    return;
  }

  //validate email format

  if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.add("error"); //add error class to email
    showToaster("Invalid email format", true);
    return;
  }

  // Success message
  showToaster(`Thank you ${nameInput.value} for reaching out!`);

  // Clear the inputs
  inputs.forEach((input) => {
    input.value = ""; // Reset input value
  });
});

const inputs = document.querySelectorAll("input, textarea"); //selects inputs and textareas

inputs.forEach((input) => {
  // Remove error class on change
  input.addEventListener("input", () => {
    input.classList.remove("error");
  });
});
