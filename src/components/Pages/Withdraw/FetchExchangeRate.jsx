import axios from 'axios';

export async function fetchExchangeRate() {
    try {
       // const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const exchangeRate = response.data.rates.BDT;
        return exchangeRate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        return null;
    }
}
