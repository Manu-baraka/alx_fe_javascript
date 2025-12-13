const quotes = [
    { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
    { text: "Code is like humor. When you have to explain it, it's bad.", category: "Programming" },
    { text: "In the middle of difficulty lies opportunity.", category: "Motivation" },
    { text: "Simplicity is the soul of efficiency.", category: "Productivity" }
  ];
    
function showRandomQuote() {
  if (quotes.length === 0) 
    return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const Quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `${Quote.text}" —${Quote.category}`;
}


function createAddQuoteForm() {
 const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    showRandomQuote(); // optionally show the new quote
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both quote and category.");
  }
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementsByTagName("button")[1].addEventListener("click", createAddQuoteForm);
  showRandomQuote(); // Show one on load
});

