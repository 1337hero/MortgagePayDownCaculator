import { CalculationResult } from '@/hooks/useMortgageCalculator'
import { format } from 'date-fns'
import React from 'react'

interface ResultsDisplayProps {
  result: CalculationResult
  loanTerm: number
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, loanTerm }) => (
  <div className="mt-8 p-4 bg-gray-100 rounded">
    <h2 className="text-xl font-bold mb-2">Results</h2>
    <p>Monthly Payment: ${result.monthlyPayment.toFixed(2)}</p>
    <p>New Payoff Date: {format(result.newPayoffDate, 'MM/dd/yyyy')}</p>
    <p>Total Interest Saved: ${result.totalInterestSaved.toFixed(2)}</p>
    <p>Time Shortened: {result.timeShortened.toFixed(2)} years</p>
    <p>Original Total Interest: ${result.originalTotalInterest.toFixed(2)}</p>
    <p>New Total Interest: ${result.newTotalInterest.toFixed(2)}</p>
    <p>Original Total (Principal + Interest): ${result.originalTotal.toFixed(2)}</p>
    <p>New Total (Principal + Interest): ${result.newTotal.toFixed(2)}</p>
    <p>Interest Savings Percentage: {((result.totalInterestSaved / result.originalTotalInterest) * 100).toFixed(2)}%</p>
    <p>Time Savings Percentage: {((result.timeShortened / loanTerm) * 100).toFixed(2)}%</p>
  </div>
)