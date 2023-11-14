document.addEventListener("DOMContentLoaded", function () {
    // Function to toggle dropdown visibility
    function toggleDropdown(toggleId, dropdownId) {
        var toggle = document.getElementById(toggleId);
        var dropdown = document.getElementById(dropdownId);

        toggle.addEventListener("click", function () {
            dropdown.classList.toggle("show");
        });
    }

    // Apply toggle functionality to multiple buttons and dropdowns
    toggleDropdown("filterToggle1", "filterDropdown1");
    toggleDropdown("filterToggle2", "filterDropdown2");

    // Add more toggleDropdown calls for additional buttons and dropdowns
});
