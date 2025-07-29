// Get references to elements (these should be declared once globally)
var myInput = document.getElementById("myInput");
var clearButton = document.getElementById("clearSearch"); // Make sure your HTML has id="clearSearch" for the button
var noResultsMessage = document.getElementById("noResultsMessage"); // Make sure your HTML has id="noResultsMessage" for the paragraph/div

// Main function to perform the search and filter list
function myFunction() {
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
} 

    // --- NEW LOGIC FOR "NO RESULTS FOUND" MESSAGE ---
    // Show/hide the "No results found" message based on visibleCount
    if (visibleCount === 0) {
        noResultsMessage.style.display = "block"; // Show the message
    } else {
        noResultsMessage.style.display = "none"; // Hide the message
    }

    // --- NEW LOGIC FOR CLEAR BUTTON VISIBILITY ---
    // Call the function to update clear button visibility
    updateClearButton();
}

// --- NEW FUNCTION: Update the visibility of the clear button ---
function updateClearButton() {
    if (myInput.value.length > 0) {
        clearButton.style.display = "block"; // Show button if input has text
    } else {
        clearButton.style.display = "none"; // Hide button if input is empty
    }
}

// --- NEW EVENT LISTENER: For the clear button click ---
// Add an event listener to the clear button (should be done once on page load)
clearButton.addEventListener("click", function() {
    myInput.value = ""; // Clear the input field
    myFunction();       // Re-run the search to show all items again and hide 'no results'
    myInput.focus();    // Optionally put focus back on the input for convenience
});

// --- NEW INITIALIZATION LOGIC: Run on page load ---
// This ensures the initial state (e.g., clear button hidden, no results message hidden) is correct
// when the page first loads, especially if the input field somehow has a pre-filled value.
document.addEventListener("DOMContentLoaded", function() {
    myFunction(); // Execute myFunction once the DOM is fully loaded
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
