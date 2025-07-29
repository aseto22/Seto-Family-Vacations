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
