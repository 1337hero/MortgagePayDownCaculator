import { MortgageForm } from '@/components/MortgageForm'
import { MortgagePayoffChart } from '@/components/MortgagePayoffChart'
import { ResultsDisplay } from '@/components/ResultsDisplay'
import { useMortgageCalculator } from '@/hooks/useMortgageCalculator'

function App() {
  const { mortgageData, handleInputChange, handleSubmit, result } = useMortgageCalculator()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Mortgage Payoff Calculator</h1>
      <div className="mx-auto mx-auto max-w-3xl mb-4">
        <MortgageForm
          mortgageData={mortgageData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
      {result && (
        <>
        <MortgagePayoffChart
          chartData={result.chartData}
          originalPayoffDate={result.originalPayoffDate}
          newPayoffDate={result.newPayoffDate}
        />
        <ResultsDisplay result={result} loanTerm={mortgageData.loanTerm} />
      </>
      )}
    </div>
  )
}

export default App