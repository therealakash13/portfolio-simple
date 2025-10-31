document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS with your Public Key
  (function () {
    emailjs.init("aCmjro_bmIHU4V_jY"); // Emailjs Public Key
  })();

  const navLinks = document.querySelectorAll("header nav a");
  const logoLink = document.querySelector(".logo");
  const sections = document.querySelectorAll("section");
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector("header nav");
  const form = document.getElementsByClassName("contact-form");

  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  });

  const activePage = () => {
    const header = document.querySelector("header");
    const barsBox = document.querySelector(".bars-box");

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    header.classList.remove("active");
    setTimeout(() => {
      header.classList.add("active");
    }, 1000);

    barsBox.classList.remove("active");
    setTimeout(() => {
      barsBox.classList.add("active");
    }, 1000);

    sections.forEach((section) => {
      section.classList.remove("active");
    });

    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  };

  // navLinks.forEach((link, idx) => {
  //   link.addEventListener("click", () => {
  //     if (!link.classList.contains("active")) {
  //       activePage();

  //       link.classList.add("active");

  //       setTimeout(() => {
  //         sections[idx].classList.add("active");
  //       }, 1000);
  //     }
  //   });
  // });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default jump behavior

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (!link.classList.contains("active")) {
        activePage();

        link.classList.add("active");

        setTimeout(() => {
          targetSection.classList.add("active");
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth",
          });

          // Optionally update URL hash without scrolling again
          history.pushState(null, null, `#${targetId}`);
        }, 500);
      }
    });
  });

  // logoLink.addEventListener("click", () => {
  //   if (!navLinks[0].classList.contains("active")) {
  //     activePage();

  //     navLinks[0].classList.add("active");

  //     setTimeout(() => {
  //       sections[0].classList.add("active");
  //     }, 1000);
  //   }
  // });

  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    const homeSection = document.getElementById("home");

    if (!navLinks[0].classList.contains("active")) {
      activePage();

      navLinks[0].classList.add("active");

      setTimeout(() => {
        homeSection.classList.add("active");
        window.scrollTo({
          top: homeSection.offsetTop,
          behavior: "smooth",
        });
        history.pushState(null, null, `#home`);
      }, 500);
    }
  });

  const resumeBtns = document.querySelectorAll(".resume-btn");

  resumeBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const resumeDetails = document.querySelectorAll(".resume-detail");

      resumeBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");

      resumeDetails.forEach((detail) => {
        detail.classList.remove("active");
      });
      resumeDetails[idx].classList.add("active");
    });
  });

  const arrowRight = document.querySelector(
    ".portfolio-box .navigation .arrow-right"
  );
  const arrowLeft = document.querySelector(
    ".portfolio-box .navigation .arrow-left"
  );

  let index = 0;

  const activePortfolio = () => {
    const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
    const portfolioDetails = document.querySelectorAll(".portfolio-detail");

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
      index * 2
    }rem))`;
    portfolioDetails.forEach((detail) => {
      detail.classList.remove("active");
    });
    portfolioDetails[index].classList.add("active");
  };

  arrowRight.addEventListener("click", () => {
    if (index < 4) {
      index++;
      arrowLeft.classList.remove("disabled");
    } else {
      index = 5;
      arrowRight.classList.add("disabled");
    }

    activePortfolio();
  });
  arrowLeft.addEventListener("click", () => {
    if (index > 1) {
      index--;
      arrowRight.classList.remove("disabled");
    } else {
      index = 0;
      arrowLeft.classList.add("disabled");
    }

    activePortfolio();
  });

  // Handle Let's Connect button
  const letsConnectBtn = document.querySelector(".lets-connect-btn"); // Add a class to your button
  if (letsConnectBtn) {
    letsConnectBtn.addEventListener("click", () => {
      activePage(); // hide all
      navLinks[navLinks.length - 1].classList.add("active"); // assuming last link is "Contact"
      setTimeout(() => {
        sections[sections.length - 1].classList.add("active");
      }, 1000);
    });
  }

  // Handle contact form
  
  form[0].addEventListener("submit", function (event) {
    event.preventDefault();

    const params = {
      name: form[0].name.value,
      email: form[0].email.value,
      email: form[0].subject.value,
      message: form[0].message.value,
    };

    console.log(params);

    emailjs
      .send("service_5x8ly38", "template_3im9qhh", params)
      .then(() => {
        alert("✅ Message sent successfully!");
        form[0].reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("❌ Something went wrong. Please try again later.");
      });
  });
});
