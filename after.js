// Create elements for the interface
var keypad1 = document.createElement("div");
keypad1.innerHTML = "<div style='padding: 30px; position: fixed; bottom: 20px; right: 20px; z-index:100; background-color: black'><button id='cool-button' style='font-size: 50px; background-color: white; color: black'>Export CSV</button></div>";
var output = document.createElement("div");

document.body.prepend(output);
document.body.prepend(keypad1);

// Function to extract data and export as CSV
function exportCSV() {
  // Select all comment items
  var comments = document.querySelectorAll(".comments-comment-item");
  var data = [];

  comments.forEach(comment => {
    // Extracting name, email, and profile URL
    var name = comment.querySelector(".comments-post-meta__name-text")?.textContent.trim();
    // Trim any extraneous text after "View" in the name, if present.
    if (name.includes("View")) {
      name = name.substring(0, name.indexOf("View")).trim();
    }
    var email = comment.querySelector("[href^='mailto:']")?.textContent.trim();
    var profileUrl = comment.querySelector(".comments-post-meta__actor-link")?.href;

    // Add to data array if all information is available
    if (name && email && profileUrl) {
      data.push({ name, email, profileUrl });
    }
  });

  // Convert data array to CSV string
  var csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Name,Email,LinkedIn Profile URL\n"; // CSV header
  data.forEach(row => {
    csvContent += `${row.name},${row.email},${row.profileUrl}\n`;
  });

  // Check if a download button already exists
  var downloadBtn = document.getElementById("downloadCSV");
  if (!downloadBtn) {
    // If it doesn't exist, create the download button
    downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download CSV";
    downloadBtn.id = "downloadCSV";
    downloadBtn.style.fontSize = "50px";
    downloadBtn.style.backgroundColor = "red";
    downloadBtn.style.color = "white";
    downloadBtn.style.marginTop = "10px"; // Spacing between buttons
    // Add the download button below the export button
    keypad1.firstChild.appendChild(downloadBtn);
  }

  // Update or set the download button's onclick function to use the latest CSV data
// Update or set the download button's onclick function to use the latest CSV data
downloadBtn.onclick = function () {
  // Use a Blob for the CSV content
  var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "linkedin_data.csv");
  document.body.appendChild(link); // Temporarily add the link to the document
  link.click(); // Trigger the download
  
  // Clean up by revoking the Blob URL and removing the link
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};




}

document.getElementById("cool-button").addEventListener("click", exportCSV);
