document.addEventListener("DOMContentLoaded", function () {
  let quotes = {};
  const quoteDisplay = document.querySelector(".quotes");

  // Fetch quotes from the JSON file
  fetch("quotes.json")
    .then((response) => response.json())
    .then((data) => {
      quotes = data;
      displayAllQuotes(quotes);
    });

  // Display all quotes
  function displayAllQuotes(quotes) {
    const allQuotes = Object.values(quotes).flat();
    allQuotes.forEach((quote) => {
      displayQuote(quote);
    });
  }

  // Display a random quote from a specific category
  function showRandomQuoteByCategory(category) {
    const categoryQuotes = quotes[category];
    categoryQuotes.forEach((quote) => {
      displayQuote(quote);
    });
    //   categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
  }

  // Generate HTML for a single quote and display it
  function displayQuote(quote) {
    const quoteDiv = document.createElement("div");
    quoteDiv.classList.add("quote");
    quoteDiv.innerHTML = `
      <div class="title">
        
        <p>"${quote.quote}"</p>
      </div>
      <div class="author">
        <p>${quote.author}</p>
      </div>
    `;
    quoteDisplay.appendChild(quoteDiv);
  }

  // Add event listener to the radio buttons
  document.querySelectorAll("input[name=filters]").forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        quoteDisplay.innerHTML = ""; // Clear existing quotes
        showRandomQuoteByCategory(this.value);
      }
    });
  });
});
