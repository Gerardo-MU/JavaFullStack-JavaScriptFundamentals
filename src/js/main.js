
// Elementos del DOM
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const resultCard = document.getElementById('resultCard');

//Oculta el card de Resultado
resultCard.hidden = true;

// Lista de monedas a mostrar
const currencies = {
    "USD": "Dólar Estadounidense",
    "EUR": "Euro",
    "MXN": "Peso Mexicano",
    "GBP": "Libra Esterlina",
    "JPY": "Yen Japonés",
    "CHF": "Franco Suizo",
    "AUD": "Dólar Australiano",
    "CAD": "Dólar Canadiense"
};

// Función para llenar los select con las opciones de moneda
function populateCurrencySelect(selectElement) {
  for (const [code, name] of Object.entries(currencies)) {
      let option = document.createElement('option');
      option.value = code;
      option.text = `${name} (${code})`;
      selectElement.appendChild(option);
  }
}

//Llenar los select con las opciones de moneda
populateCurrencySelect(fromCurrencySelect);
populateCurrencySelect(toCurrencySelect);

//Evento que ejecuta el botón del formulario
document.getElementById('convertBtn').addEventListener('click', async function() {
    let amount = document.getElementById('amount').value;
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;
    let resultElement = document.getElementById('result');
    let fromCurrencyText = document.getElementById('fromCurrencyText');
    let pairPrice = document.getElementById('pairPrice');
    let pairText = document.getElementById('pairText');
    if (amount === '') {
        resultElement.innerText = 'Por favor, ingresa una cantidad.';
        return;
    }

    if (fromCurrency === toCurrency) {
        alert('La moneda de origen y destino son la misma. Por favor, selecciona monedas diferentes.');
        return;
    }

    //Construye el objeto para comunicar con la API
    const api = new ExchangeRateAPI();

    //Detecta si hay una excepción causada por la comunicación
    try {
        //Se enviía el valor del tipo de cambio
        let rates = await api.getExchangeRate(fromCurrency);
        let rate = rates[toCurrency];

        //Evalya si se obtuvo una respuesta válida
        if (rate) {

            //Visualiza el Card de Resultado
            resultCard.hidden = false;

            //Realiza la conversión
            const convertedAmount = amount * rate;

            //Imprime valores en el la CArd de resultado
            fromCurrencyText.innerText = amount +" " + fromCurrency + " es:";
            resultElement.innerText = convertedAmount.toFixed(2)+ " " + toCurrency;
            pairText.innerText = " 1 " + fromCurrency + " es:";
            pairPrice.innerText = rate + " " + toCurrency;
        } else {
            resultElement.innerText = 'No se pudo obtener el tipo de cambio para la moneda seleccionada.';
        }
    } catch (error) {
        //Envía este mensaje si hubo un error al obtener la información de la API
        resultElement.innerText = 'No se pudo obtener el tipo de cambio.';
    }
});



