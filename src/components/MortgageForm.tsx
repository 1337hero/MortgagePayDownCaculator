import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MortgageData } from "@/hooks/useMortgageCalculator";
import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface MortgageFormProps {
  mortgageData: MortgageData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const MortgageForm: React.FC<MortgageFormProps> = ({
  mortgageData,
  handleInputChange,
  handleSubmit,
}) => {
  const handleSelectChange = (value: string) => {
    handleInputChange({
      target: { name: "paymentFrequency", value },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
  <form onSubmit={handleSubmit} className="mx-auto">
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <Label
          htmlFor="originalAmount"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          Original Mortgage Amount ($)
        </Label>
        <div className="mt-2.5">
          <Input
            type="number"
            id="originalAmount"
            name="originalAmount"
            value={mortgageData.originalAmount}
            onChange={handleInputChange}
            className="block w-full rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="startDate"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          Start Date
        </Label>
        <div className="mt-2.5">
          <Input
            type="date"
            id="startDate"
            name="startDate"
            value={mortgageData.startDate.toISOString().split("T")[0]}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="loanTerm"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          Loan Term (years)
        </Label>
        <div className="mt-2.5">
          <Input
            type="number"
            id="loanTerm"
            name="loanTerm"
            value={mortgageData.loanTerm}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="annualInterestRate"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          Annual Interest Rate (%)
        </Label>
        <div className="mt-2.5">
          <Input
            type="number"
            id="annualInterestRate"
            name="annualInterestRate"
            value={mortgageData.annualInterestRate}
            onChange={handleInputChange}
            step="0.01"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="additionalPayment"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          Additional Payment ($)
        </Label>
        <div className="mt-2.5">
          <Input
            type="number"
            id="additionalPayment"
            name="additionalPayment"
            value={mortgageData.additionalPayment}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="paymentFrequency"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          Extra Payment Frequency
        </Label>
        <div className="mt-2.5">
        <Select
              onValueChange={handleSelectChange}
              value={mortgageData.paymentFrequency}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="one-time">One Time</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </div>
    </div>
    <div className="mt-10">
      <Button
        type="submit"
        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Calculate
      </Button>
    </div>
  </form>
 );
};