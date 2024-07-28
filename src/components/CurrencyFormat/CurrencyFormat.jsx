import React from 'react'
import numerical from 'numeral'

function CurrencyFormat({ amount }) {
  const formatedAmount = numerical(amount).format('$0,0.00')
  return (
    <div>{formatedAmount}</div>
  )
}

export default CurrencyFormat