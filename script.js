// Get references to elements (these should be declared once globally)
var myInput = document.getElementById("myInput");
var clearButton = document.getElementById("clearSearch");
var noResultsMessage = document.getElementById("noResultsMessage");
var myUL = document.getElementById("myUL"); // Get a reference to your UL element

// Main function to perform the search and filter list
function myFunction() {
    var filter, li, a, i, txtValue; // 'ul' is now a global variable (myUL)
    var visibleCount = 0; // Counter for visible items

    filter = myInput.value.toUpperCase();
    li = myUL.getElementsByTagName("li"); // Use the global myUL reference

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""; // Show the individual item
            visibleCount++; // Increment count if item is visible
        } else {
            li[i].style.display = "none"; // Hide the individual item
        }
    }

    // --- LOGIC FOR "NO RESULTS FOUND" MESSAGE AND HIDING/SHOWING THE UL ---
    if (visibleCount === 0) {
        noResultsMessage.style.display = "block"; // Show the "No results found" message
        myUL.style.display = "none"; // Hide the entire UL container
    } else {
        noResultsMessage.style.display = "none"; // Hide the "No results found" message
        myUL.style.display = "flex"; // Show the UL container (use 'flex' as you styled it with flexbox)
    }

    // --- LOGIC FOR CLEAR BUTTON VISIBILITY ---
    updateClearButton();
}

// Function to update the visibility of the clear button
function updateClearButton() {
    if (clearButton) {
        if (myInput.value.length > 0) {
            clearButton.style.display = "block";
        } else {
            clearButton.style.display = "none";
        }
    }
}

// Event listener for the clear button
if (clearButton) {
    clearButton.addEventListener("click", function() {
        myInput.value = "";
        myFunction();
        myInput.focus();
    });
}

// Initializing state when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    myFunction();
});

// Password Code //
function checkPassword() {
    // 1. Get the password entered by the user
    var enteredPassword = document.getElementById('passwordInput').value;
    // 2. Get the error message element
    var errorMessage = document.getElementById('errorMessage');

    // IMPORTANT: Replace 'yourpassword' with your actual password
    // 3. Compare the entered password with the correct password
    if (enteredPassword === "Seto123") {
        // 4. If correct:
        //    a. Hide the password overlay
        document.getElementById('password-overlay').style.display = 'none';
        //    b. Show the main content
        document.getElementById('content').style.display = 'block';
    } else {
        // 5. If incorrect:
        //    a. Show the error message
        errorMessage.style.display = 'block';
        //    b. Clear the password input field for the next attempt
        document.getElementById('passwordInput').value = '';
    }
}


// Old Code
/* function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
} */
