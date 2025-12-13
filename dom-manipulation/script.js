// script.js task 1
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


// Local Storage Functions task 2
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

// Dynamic Quote Display task 3
 function populateCategories() {
  const filter = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];

  filter.innerHTML = "";
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filter.appendChild(option);
  });

  // Restore last selected filter
  const lastSelected = localStorage.getItem("selectedCategory") || "all";
  filter.value = lastSelected;
}

document.addEventListener("DOMContentLoaded", populateCategories);

function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);

  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  displayQuoteList(filtered);
}

// syncing data with local storage task 4
const SERVER_API_URL = "https://jsonplaceholder.typicode.com/posts";

/* UI notification */
function showSyncMessage(message) {
    let notification = document.getElementById("syncNotification");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "syncNotification";
        document.body.appendChild(notification);
    }

    notification.textContent = message;

    setTimeout(() => {
        notification.textContent = "";
    }, 3000);
}

/* POST local quotes to server (async/await) */
async function postQuotesToServer() {
    try {
        const response = await fetch(SERVER_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quotes)
        });
        await response.json();
        showSyncMessage("Local quotes sent to server.");
    } catch (error) {
        console.error("POST failed:", error);
    }
}

/* Sync logic (server wins, async/await) */
async function syncQuotes() {
    try {
        const response = await fetch(SERVER_API_URL);
        const serverData = await response.json();

        const serverQuotes = serverData.slice(0, 5).map(item => ({
            text: item.title,
            category: "Server"
        }));

        let updated = false;

        serverQuotes.forEach(serverQuote => {
            const exists = quotes.some(
                localQuote => localQuote.text === serverQuote.text
            );

            if (!exists) {
                quotes.push(serverQuote);
                updated = true;
            }
        });

        if (updated) {
            saveQuotes();
            populateCategories();
            showSyncMessage("Quotes synced with server!");
        }
    } catch (error) {
        console.error("Sync failed:", error);
    }
}

/* Required by ALX: fetchQuotesFromServer */
async function fetchQuotesFromServer() {
    await syncQuotes();
}

/* Periodic server sync (every 30 seconds) */
setInterval(fetchQuotesFromServer, 30000);