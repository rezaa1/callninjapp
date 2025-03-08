"use client";

import { PhoneCall, PhoneIncoming, PhoneOutgoing, Users } from "lucide-react";
import { DailyCallsChart } from "./components/DailyCallsChart";
import { StatsCard } from "./components/StatsCard";

const data = [
  { date: '2024-03-01', calls: 65 },
  { date: '2024-03-02', calls: 59 },
  { date: '2024-03-03', calls: 80 },
  { date: '2024-03-04', calls: 81 },
  { date: '2024-03-05', calls: 56 },
  { date: '2024-03-06', calls: 55 },
  { date: '2024-03-07', calls: 40 },
];

const stats = [
  {
    title: "Total Calls",
    value: "436",
    icon: PhoneCall,
    description: "Last 7 days",
    trend: "+12.5%",
  },
  {
    title: "Outbound Calls",
    value: "287",
    icon: PhoneOutgoing,
    description: "Last 7 days",
    trend: "+8.2%",
  },
  {
    title: "Inbound Calls",
    value: "149",
    icon: PhoneIncoming,
    description: "Last 7 days",
    trend: "+15.3%",
  },
  {
    title: "Active Agents",
    value: "12",
    icon: Users,
    description: "Currently online",
    trend: "+2",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor your Agents performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <DailyCallsChart data={data} />
      </div>
    </main>
  );
}