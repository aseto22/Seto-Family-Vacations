const SESSION_STORAGE_KEY = "setoFamilyVacationsAccessGranted";
const CORRECT_PASSWORD = "ASeto2268!"; // Make sure this matches your desired password!

// Get references to elements (these should be declared once globally)
var myInput = document.getElementById("myInput");
var clearButton = document.getElementById("clearSearch");
var noResultsMessage = document.getElementById("noResultsMessage");
var myUL = document.getElementById("myUL"); // Get a reference to your UL element

// Main function to perform the search and filter list
function myFunction() {
    var filter, li, a, i, txtValue; // 'ul' is now a global variable (myUL)
    var visibleCount = 0; // Counter for visible items

// 2. IMPORTANT: Add this check to prevent errors if search elements aren't on the current page.
    if (!myInput || !myUL) {
        // console.warn("Search elements not found. Skipping search functionality."); // Optional: uncomment for debugging
        return; // Exit if elements aren't present (e.g., on index.html)
    }
    
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
        // 3. Add a check for noResultsMessage here
        if (noResultsMessage) noResultsMessage.style.display = "block"; // Show the "No results found" message
        myUL.style.display = "none"; // Hide the entire UL container
    } else {
        // 4. Add a check for noResultsMessage here
        if (noResultsMessage) noResultsMessage.style.display = "none"; // Hide the "No results found" message
        myUL.style.display = "flex"; // Show the UL container (use 'flex' as you styled it with flexbox)
    }
    
    // --- LOGIC FOR CLEAR BUTTON VISIBILITY ---
    updateClearButton();
}

// Function to update the visibility of the clear button
function updateClearButton() {
    // 5. Add checks for clearButton and myInput here
    if (clearButton && myInput) { // Ensure both elements exist
        if (myInput.value.length > 0) {
            clearButton.style.display = "block";
        } else {
            clearButton.style.display = "none";
        }
    }
}

// Event listener for the clear button
// 6. Add a check for clearButton here
if (clearButton) {
    clearButton.addEventListener("click", function() {
        // 7. Add a check for myInput here
        if (myInput) { // Check if myInput exists
            myInput.value = "";
            myFunction();
            myInput.focus();
        }
    });
}

/* 
// Initializing state when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    myFunction();
});
*/

// Password Code //
function checkPassword() {
    // 1. Get the password entered by the user
    var enteredPassword = document.getElementById('passwordInput').value;
    // 2. Get the error message element
    var errorMessage = document.getElementById('errorMessage');

    // IMPORTANT: Replace 'yourpassword' with your actual password
    // 3. Change 'yourpassword' to the CORRECT_PASSWORD constant
    // 4. Also add element existence checks
    if (enteredPassword === CORRECT_PASSWORD) {
        // 4. If correct:
        //    a. Hide the password overlay
        var passwordOverlay = document.getElementById('password-overlay'); // Get reference here
        if (passwordOverlay) passwordOverlay.style.display = 'none';

        //    b. Show the main content
        var content = document.getElementById('content'); // Get reference here
        if (content) content.style.display = 'block';

        // 5. ADD THIS LINE: Store in sessionStorage that access has been granted
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");

    } else {
        // 5. If incorrect:
        //    a. Show the error message
        // 6. Add an element existence check
        if (errorMessage) errorMessage.style.display = 'block';
        //    b. Clear the password input field for the next attempt
        // 7. Add an element existence check
        if (document.getElementById('passwordInput')) {
            document.getElementById('passwordInput').value = '';
        }
    }
}

// 8. ADD THIS ENTIRE NEW FUNCTION: checkAccessOnLoad
//    This function checks sessionStorage and controls initial visibility.
function checkAccessOnLoad() {
    var accessGranted = sessionStorage.getItem(SESSION_STORAGE_KEY);
    var passwordOverlay = document.getElementById('password-overlay');
    var content = document.getElementById('content');

    if (accessGranted === "true") {
        // If access was granted, hide the overlay and show content
        if (passwordOverlay) passwordOverlay.style.display = 'none';
        if (content) content.style.display = 'block';
    } else {
        // If access has NOT been granted:
        // Check if the current page is the index page.
        // We do this to prevent a redirect loop.
        const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');

        if (!isIndexPage) {
            // If the user is on any page other than index.html,
            // redirect them back to the index page.
            window.location.href = 'index.html';
        } else {
            // If they are on the index page, show the password overlay.
            if (passwordOverlay) passwordOverlay.style.display = 'flex'; // Use flex to center the box
            if (content) content.style.display = 'none';
        }
    }
}


// 9. REPLACE YOUR EXISTING DOMContentLoaded BLOCK with this combined one.
//    This new block ensures checkAccessOnLoad runs first, then search functions.
document.addEventListener("DOMContentLoaded", function() {
    // Call checkAccessOnLoad first to set initial visibility based on session storage
    checkAccessOnLoad();

    // Now call myFunction for search functionality, but only if search elements exist
    // This prevents errors on index.html where myInput/myUL might not be present immediately
    if (document.getElementById("myInput") && document.getElementById("myUL")) {
        myFunction();
    }

    // 10. ADD THIS NEW EVENT LISTENER FOR THE ENTER KEY on the password input field
    var passwordInput = document.getElementById("passwordInput");

    if (passwordInput) { // Ensure passwordInput exists
        passwordInput.addEventListener("keypress", function(event) {
            // Check if the key pressed was the "Enter" key
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent default form submission behavior
                checkPassword(); // Call your password checking function
            }
        });
    }
});

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
