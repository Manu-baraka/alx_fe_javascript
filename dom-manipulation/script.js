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
  // Get the input values
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  // Validate input
  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both fields.");
    return;
  }

  // Create a new quote object
  const newQuote = {
    text: quoteText,
    category: quoteCategory
  };

  // Add to the array
  quotes.push(newQuote);

  // Optionally: Display the newly added quote
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerText = `"newQuote.text" —{newQuote.category}`;

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

