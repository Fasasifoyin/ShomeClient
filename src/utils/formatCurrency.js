const currencyFormat = new Intl.NumberFormat(undefined, {
    currency: 'USD',
    style: 'currency'
})

export function formatCurrency(number){
    return currencyFormat.format(number)
}

export function percentage(first, second){
    return 100 -  (first/second) * 100
}