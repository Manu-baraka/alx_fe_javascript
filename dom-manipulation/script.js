const quotes = [
  { text: "Stay hungry, stay foolish.", category: "Motivation" },
  { text: "Talk is cheap. Show me the code.", category: "Tech" },
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
     quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

function createAddQuoteForm() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    showRandomQuote(); // Optional: show the new quote
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both fields.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteButton").addEventListener("click", addQuote);
  showRandomQuote(); // Show one on load
});
