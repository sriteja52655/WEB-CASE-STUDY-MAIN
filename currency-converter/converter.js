// Fetch currency list and populate dropdowns
async function loadCurrencies() {
    let apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
    
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        let currencies = Object.keys(data.rates);
        
        let fromDropdown = document.getElementById("fromCurrency");
        let toDropdown = document.getElementById("toCurrency");

        fromDropdown.innerHTML = toDropdown.innerHTML = "";
        
        currencies.forEach(currency => {
            let option1 = new Option(currency, currency);
            let option2 = new Option(currency, currency);

            fromDropdown.add(option1);
            toDropdown.add(option2);
        });

        // Set default selections
        fromDropdown.value = "USD";
        toDropdown.value = "INR";
    } catch (error) {
        alert("Error loading currencies.");
    }
}

// Convert currency
async function convertCurrency() {
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    let amount = document.getElementById("amount").value;

    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    let apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        let rate = data.rates[toCurrency];

        let convertedAmount = (amount * rate).toFixed(2);
        document.getElementById("result").innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        alert("Error fetching exchange rates. Please try again.");
    }
}

// Load currencies when the page loads
window.onload = loadCurrencies;