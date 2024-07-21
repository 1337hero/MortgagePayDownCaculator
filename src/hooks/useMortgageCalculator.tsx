import { addMonths, differenceInMonths, format } from 'date-fns'
import React from 'react'

export interface MortgageData {
  originalAmount: number
  startDate: Date
  loanTerm: number
  annualInterestRate: number
  additionalPayment: number
  paymentFrequency: 'monthly' | 'quarterly' | 'yearly' | 'one-time'
}

export interface CalculationResult {
  monthlyPayment: number
  totalInterestSaved: number
  timeShortened: number
  originalTotalInterest: number
  newTotalInterest: number
  originalTotal: number
  newTotal: number
  originalPayoffDate: Date;
  newPayoffDate: Date;
  chartData: { month: string; original: number; new: number }[];
}

export const useMortgageCalculator = () => {
  const [mortgageData, setMortgageData] = React.useState<MortgageData>({
    originalAmount: 0,
    startDate: new Date(),
    loanTerm: 30,
    annualInterestRate: 0,
    additionalPayment: 0,
    paymentFrequency: 'monthly'
  })
  const [result, setResult] = React.useState<CalculationResult | null>(null)

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setMortgageData(prevData => ({
      ...prevData,
      [name]: name === 'startDate' ? new Date(value) : parseFloat(value) || value
    }))
  }, [])

  const calculateMortgage = React.useCallback((data: MortgageData): CalculationResult => {
    const monthlyRate = data.annualInterestRate / 100 / 12
    const totalPayments = data.loanTerm * 12
    const monthlyPayment = Number((data.originalAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) / (Math.pow(1 + monthlyRate, totalPayments) - 1)).toFixed(2))
  
    let originalBalance = data.originalAmount
    let newBalance = data.originalAmount
    let month = 0
    let totalInterest = 0
    let totalInterestWithExtra = 0
  
    const today = new Date()
    const monthsPassed = differenceInMonths(today, data.startDate)
  
    const chartData = []
  
    while (originalBalance > 0 || newBalance > 0) {
      const originalInterestPayment = Number((originalBalance * monthlyRate).toFixed(2))
      const originalPrincipalPayment = Number((monthlyPayment - originalInterestPayment).toFixed(2))
      originalBalance = Math.max(0, Number((originalBalance - originalPrincipalPayment).toFixed(2)))
      totalInterest += originalInterestPayment
  
      const newInterestPayment = Number((newBalance * monthlyRate).toFixed(2))
      let newPrincipalPayment = Number((monthlyPayment - newInterestPayment).toFixed(2))
      
      let extraPayment = 0
      if (data.paymentFrequency === 'monthly' || 
          (data.paymentFrequency === 'quarterly' && month % 3 === 0) ||
          (data.paymentFrequency === 'yearly' && month % 12 === 0) ||
          (data.paymentFrequency === 'one-time' && month === monthsPassed)) {
        extraPayment = data.additionalPayment
      }
  
      newPrincipalPayment = Number((newPrincipalPayment + extraPayment).toFixed(2))
      newBalance = Math.max(0, Number((newBalance - newPrincipalPayment).toFixed(2)))
      totalInterestWithExtra += newInterestPayment
  
      const currentDate = addMonths(data.startDate, month)
      chartData.push({
        month: format(currentDate, 'MMM yyyy'),
        original: originalBalance,
        new: newBalance
      })
  
      month++
  
      if (originalBalance === 0 && newBalance === 0) break
    }
  
    const originalPayoffDate = addMonths(data.startDate, totalPayments)
    const newPayoffDate = addMonths(data.startDate, month)
  
    const timeShortened = Number(((totalPayments - month) / 12).toFixed(2))
    const totalInterestSaved = Number((totalInterest - totalInterestWithExtra).toFixed(2))
  
    return {
      monthlyPayment,
      originalPayoffDate,
      newPayoffDate,
      chartData,
      totalInterestSaved,
      timeShortened,
      originalTotalInterest: Number(totalInterest.toFixed(2)),
      newTotalInterest: Number(totalInterestWithExtra.toFixed(2)),
      originalTotal: Number((data.originalAmount + totalInterest).toFixed(2)),
      newTotal: Number((data.originalAmount + totalInterestWithExtra).toFixed(2))
    }
  }, [])

  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const calculationResult = calculateMortgage(mortgageData)
    setResult(calculationResult)
  }, [mortgageData, calculateMortgage])

  return { mortgageData, handleInputChange, handleSubmit, result }
}