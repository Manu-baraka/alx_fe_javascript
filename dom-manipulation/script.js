const quotes = [
    { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
    { text: "Code is like humor. When you have to explain it, it's bad.", category: "Programming" },
    { text: "In the middle of difficulty lies opportunity.", category: "Motivation" },
    { text: "Simplicity is the soul of efficiency.", category: "Productivity" }
  ];
    
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const Quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<p>"${Quote.text}" - ${Quote.category}</p>`;

}
function createAddQuoteForm() {
 const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

 if (text && category) {
    quotes.push({ text, category });

    // Create a new <p> element to show the quote
    const quoteElement = document.createElement("p");
    quoteElement.textContent = `"${text}" —${category}`;

    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear previous
    quoteDisplay.appendChild(quoteElement); // Append new

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both quote and category.");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementsByTagName("button")[1].addEventListener("click", createAddQuoteForm);
  showRandomQuote(); // Show one on load
});

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const saved = localStorage.getItem("quotes");
  if (saved) {
    quotes = JSON.parse(saved);
  }
}
function exportToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (error) {
      alert("Failed to import: " + error.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}
document.getElementsByTagName("button")[2].addEventListener("click", exportToJson);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
loadQuotes();
