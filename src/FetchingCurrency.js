import React from 'react'

export default function FetchingCurrency(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    return (
        <div class="row">
            <div class="col-sm"><input type ="number" className="input" value={amount} onChange={onChangeAmount} /></div>
            <div class="col-sm">
                <select class="custom-select custom-select-lg mb-3"value={selectedCurrency} onChange={onChangeCurrency}>
                    {currencyOptions.map(option => (
                    <option key={option} value = {option}>{option}</option> 
                    )
                    )}
                </select>
            </div>
            
        </div>
    )
}
