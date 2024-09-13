document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'c3eacf9b32a5a72e4f96930b';
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amount = document.getElementById('amount');
    const convertBtn = document.getElementById('convert-btn');
    const result = document.getElementById('result');

    // Fetch currency options and populate dropdowns
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const fromCurrencyOpt = document.createElement('option');
                const toCurrencyOpt = document.createElement('option');
                fromCurrencyOpt.value = currency;
                fromCurrencyOpt.text = currency;
                toCurrencyOpt.text = currency;
                toCurrencyOpt.value = currency;
                fromCurrency.appendChild(fromCurrencyOpt);
                toCurrency.appendChild(toCurrencyOpt);
            });
        });

    // Handle conversion
    convertBtn.addEventListener('click', () => {
        const amountValue = amount.value;
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;

        if (amountValue === '' || isNaN(amountValue)) {
            result.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromValue}/${toValue}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rate;
                const convertedAmount = (amountValue * rate).toFixed(2);
                result.textContent = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
            })
            .catch(() => {
                result.textContent = 'Error fetching exchange rate.';
            });
    });
});
