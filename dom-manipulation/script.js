const quotes = [
    { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
    { text: "Code is like humor. When you have to explain it, it's bad.", category: "Programming" },
    { text: "In the middle of difficulty lies opportunity.", category: "Motivation" },
    { text: "Simplicity is the soul of efficiency.", category: "Productivity" }
  ];

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    showRandomQuote(); // Show a quote on initial load
function showRandomQuote() {
  if (quotes.length === 0) 
    return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${randomQuote.text}" —${randomQuote.category}`;
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
document.getElementById('addQuoteButton').addEventListener('click', createAddQuoteForm);