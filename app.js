document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchResults = document.getElementById("search-results");
    const nearbyDoctors = document.getElementById("nearby-doctors");

    // Fetch nearby doctors (mock data for now)
    fetch("/nearby-doctors")
        .then(response => response.json())
        .then(data => {
            let output = "<ul>";
            data.forEach(doctor => {
                output += `<li>${doctor.name} - ${doctor.specialty} - ${doctor.location}</li>`;
            });
            output += "</ul>";
            nearbyDoctors.innerHTML = output;
        });

    // Search doctors
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const query = document.getElementById("doctor-search").value;

        fetch(`/search?query=${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    searchResults.innerHTML = "<p>No doctors found.</p>";
                } else {
                    let output = "<ul>";
                    data.forEach(doctor => {
                        output += `<li>${doctor.name} - ${doctor.specialty}</li>`;
                    });
                    output += "</ul>";
                    searchResults.innerHTML = output;
                }
            });
    });
});
