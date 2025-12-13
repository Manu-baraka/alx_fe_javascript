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

