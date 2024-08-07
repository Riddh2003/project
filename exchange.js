document.addEventListener('DOMContentLoaded', () => {
    const amount = document.getElementById('amount');
    const currency = document.getElementById('currency');
    const convert = document.getElementById('convert');
    const result = document.getElementById('result');

    const apiKey = "YOUR_APIKEY";

    convert.addEventListener('click', () => {
        console.log('hi');
        const amountTotal = parseFloat(amount.value); 
        if (isNaN(amountTotal) || amountTotal <= 0) {
            result.innerHTML = 'Please enter a valid amount.';
            return;
        }

        const currencyTotal = currency.value;
        const url = `https://api.api-ninjas.com/v1/exchangerate?pair=GBP_${currencyTotal}`;
        console.log('url', url);

        fetch(url, {
            headers: {
                'X-API-KEY': apiKey
            }
        })
        .then(response => {
            console.log('Response:', response); // Debugging statement
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data); // Debugging statement
            if (!data.exchange_rate) {
                throw new Error('Invalid data format received');
            }
            const rate = data.exchange_rate;
            const resultPrice = amountTotal * rate;
            console.log('result', resultPrice);
            result.innerHTML = `${amountTotal} GBP = ${resultPrice.toFixed(2)} ${currencyTotal}`;
        })
        .catch(error => {
            console.error('Request failed:', error.message);
            result.innerHTML = `An error occurred: ${error.message}`;
        });
    });
});
