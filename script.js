// Navigation toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Application form navigation
if (document.getElementById("applicationForm")) {
    const formSections = document.querySelectorAll(".form-section");
    const progressSteps = document.querySelectorAll(".progress-step");
    let currentSection = 0;
    
    // Show the first section initially
    showSection(currentSection);
    
    // Next button click handler
    document.querySelectorAll(".btn-next").forEach(button => {
        button.addEventListener("click", () => {
            if (validateSection(currentSection)) {
                currentSection++;
                showSection(currentSection);
                updateProgress();
            }
        });
    });
    
    // Previous button click handler
    document.querySelectorAll(".btn-prev").forEach(button => {
        button.addEventListener("click", () => {
            currentSection--;
            showSection(currentSection);
            updateProgress();
        });
    });
    
    // Form submission
    document.getElementById("applicationForm").addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Application submitted successfully!");
        // In a real application, you would send the data to a server here
    });
    
    function showSection(n) {
        // Hide all sections
        formSections.forEach(section => {
            section.style.display = "none";
        });
        
        // Show the current section
        formSections[n].style.display = "block";
        
        // Update button visibility
        document.querySelectorAll(".btn-prev").forEach(btn => {
            btn.style.display = n === 0 ? "none" : "block";
        });
        
        document.querySelectorAll(".btn-next").forEach(btn => {
            btn.style.display = n === formSections.length - 1 ? "none" : "block";
        });
        
        document.querySelectorAll(".btn-submit").forEach(btn => {
            btn.style.display = n === formSections.length - 1 ? "block" : "none";
        });
        
        // If we're on the review section, populate the review
        if (n === 3) {
            populateReview();
        }
    }
    
    function updateProgress() {
        progressSteps.forEach((step, index) => {
            if (index < currentSection) {
                step.classList.add("active");
            } else if (index === currentSection) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
    }
    
    function validateSection(n) {
        // Simple validation - in a real app, you'd want more comprehensive validation
        const inputs = formSections[n].querySelectorAll("input, select, textarea");
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute("required") && !input.value) {
                isValid = false;
                input.style.borderColor = "red";
            } else {
                input.style.borderColor = "#ddd";
            }
        });
        
        if (!isValid) {
            alert("Please fill in all required fields.");
        }
        
        return isValid;
    }
    
    function populateReview() {
        // Populate selected colleges
        const collegeCheckboxes = document.querySelectorAll('input[name="colleges"]:checked');
        let collegesHTML = "";
        
        collegeCheckboxes.forEach(checkbox => {
            const label = checkbox.nextElementSibling;
            collegesHTML += `<p>${label.querySelector("strong").textContent}</p>`;
        });
        
        document.getElementById("review-colleges").innerHTML = collegesHTML || "<p>No colleges selected</p>";
        
        // Populate personal information
        const personalData = {
            name: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            dob: document.getElementById("dob").value,
            citizenship: document.getElementById("citizenship").options[document.getElementById("citizenship").selectedIndex].text
        };
        
        document.getElementById("review-personal").innerHTML = `
            <p><strong>Name:</strong> ${personalData.name}</p>
            <p><strong>Email:</strong> ${personalData.email}</p>
            <p><strong>Phone:</strong> ${personalData.phone}</p>
            <p><strong>Date of Birth:</strong> ${personalData.dob}</p>
            <p><strong>Citizenship:</strong> ${personalData.citizenship}</p>
        `;
        
        // Populate academic background
        const academicData = {
            education: document.getElementById("education").options[document.getElementById("education").selectedIndex].text,
            school: document.getElementById("school").value,
            gpa: document.getElementById("gpa").value,
            graduation: document.getElementById("graduation").value,
            essay: document.getElementById("essay").value
        };
        
        document.getElementById("review-academic").innerHTML = `
            <p><strong>Education:</strong> ${academicData.education}</p>
            <p><strong>School:</strong> ${academicData.school}</p>
            <p><strong>GPA:</strong> ${academicData.gpa}</p>
            <p><strong>Graduation Year:</strong> ${academicData.graduation}</p>
            <p><strong>Essay Preview:</strong> ${academicData.essay.substring(0, 100)}...</p>
        `;
    }
}

// College search functionality
if (document.querySelector(".search-bar")) {
    const searchInput = document.querySelector(".search-bar input");
    const collegeCards = document.querySelectorAll(".college-card");
    
    searchInput.addEventListener("keyup", function() {
        const searchTerm = this.value.toLowerCase();
        
        collegeCards.forEach(card => {
            const collegeName = card.querySelector("h3").textContent.toLowerCase();
            const collegeLocation = card.querySelector(".location").textContent.toLowerCase();
            const collegeDescription = card.querySelector(".description").textContent.toLowerCase();
            
            if (collegeName.includes(searchTerm) || collegeLocation.includes(searchTerm) || collegeDescription.includes(searchTerm)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
}