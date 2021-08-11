import React, { useEffect, useState } from 'react';
import './App.css';
import FetchingCurrency from './FetchingCurrency'
const BASE_URL = 'https://openexchangerates.org/api/latest.json?app_id=22e3f115062a4d9f81227fe44bfe6b03'
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[58]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.rates[toCurrency])
      })
    }
  }, [fromCurrency, toCurrency])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  function handleReset(e) {
    setAmount(false)
    setAmountInFromCurrency(false)
  }

  return (
    <header className="App-header">
      <div class="container"style={{ 
          backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/Others/images/76.jpg)" , backgroundRepeat: "repeat",
          height: "100vh",backgroundSize: 'cover'
        }}
      >
      <div class="container footer p-3 ">
          <div class="align-items-center">
          <div class="d-flex justify-content-center"><h1>Convert Your Currency</h1></div>
            <div class="d-flex p-3 justify-content-center">
              <FetchingCurrency 
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={e1 => setFromCurrency(e1.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
              />
            </div>
            <div class="d-flex p-2 justify-content-center">=</div>
            <div class="d-flex p-3 justify-content-center">
                  <FetchingCurrency 
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={e2 => setToCurrency(e2.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
              />
            </div>
            <div class="d-flex p-3 justify-content-center"><button class="btn btn-secondary" type="reset"onClick={handleReset}>Reset</button></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default App;
