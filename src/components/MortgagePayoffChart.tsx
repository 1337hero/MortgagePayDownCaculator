import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import React from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface MortgagePayoffChartProps {
  chartData: { month: string; original: number; new: number }[];
  originalPayoffDate: Date;
  newPayoffDate: Date;
}

const chartConfig = {
  original: {
    label: "Original Payoff",
    color: "hsl(var(--chart-1))",
  },
  new: {
    label: "New Payoff",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const MortgagePayoffChart: React.FC<MortgagePayoffChartProps> = ({ chartData, originalPayoffDate, newPayoffDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Payoff Comparison</CardTitle>
        <CardDescription>
          Comparing original payoff schedule to new payoff schedule with extra payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="original" stackId="1" stroke={chartConfig.original.color} fill={chartConfig.original.color} />
              <Area type="monotone" dataKey="new" stackId="1" stroke={chartConfig.new.color} fill={chartConfig.new.color} />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 text-sm">
          <p>Original Payoff Date: {originalPayoffDate.toLocaleDateString()}</p>
          <p>New Payoff Date: {newPayoffDate.toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};