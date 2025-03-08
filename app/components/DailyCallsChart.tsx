"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyCallsChartProps {
  data: Array<{
    date: string;
    calls: number;
  }>;
}

const CustomXAxis = ({ ...props }) => (
  <XAxis
    {...props}
    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
    stroke="hsl(var(--foreground))"
    tick={{ fill: 'hsl(var(--foreground))' }}
    axisLine={{ stroke: 'hsl(var(--border))' }}
    tickLine={{ stroke: 'hsl(var(--border))' }}
  />
);

const CustomYAxis = ({ ...props }) => (
  <YAxis
    {...props}
    stroke="hsl(var(--foreground))"
    tick={{ fill: 'hsl(var(--foreground))' }}
    axisLine={{ stroke: 'hsl(var(--border))' }}
    tickLine={{ stroke: 'hsl(var(--border))' }}
  />
);

export function DailyCallsChart({ data }: DailyCallsChartProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Daily Call Overview</h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <CustomXAxis dataKey="date" />
            <CustomYAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--foreground))'
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
              formatter={(value: number) => [`${value} calls`, 'Total Calls']}
            />
            <Line
              type="monotone"
              dataKey="calls"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{
                fill: 'hsl(var(--primary))',
                stroke: 'hsl(var(--primary))',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: 'hsl(var(--primary))',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}