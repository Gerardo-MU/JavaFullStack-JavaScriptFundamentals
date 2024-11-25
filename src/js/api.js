// api.js
class ExchangeRateAPI {
    
    //Constructor que establece como parámetro el End-Point
    constructor() {
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest/';
    }

    //Método que obtiene el tipo de cambio
    async getExchangeRate(fromCurrency) {
        const url = this.baseUrl + fromCurrency;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            const data = await response.json();
            return data.rates;
        } catch (error) {
            console.error('Error al obtener las tasas de cambio:', error);
            throw error;
        }
    }
}