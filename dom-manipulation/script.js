const quotes = [
    { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
    { text: "Code is like humor. When you have to explain it, it's bad.", category: "Programming" },
    { text: "In the middle of difficulty lies opportunity.", category: "Motivation" },
    { text: "Simplicity is the soul of efficiency.", category: "Productivity" }
  ];
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteElement = document.getElementById('quoteDisplay');
    quoteElement.innerText = `"${quote.text}" - ${quote.category}`;
}