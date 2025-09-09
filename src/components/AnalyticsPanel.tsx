import React from "react";

export default function AnalyticsPanel({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h3 className="text-xl font-bold mb-4">Comprehensive Analytics</h3>
      <div className="mb-4">
        <span className="font-semibold">Room Utilization Algorithms</span>
        <ul className="ml-4 mt-1 text-sm">
          <li>Overall Utilization: <b>{data.utilization}%</b></li>
          <li>Trend: {data.trend?.map((t: any) => `${t.date}: $${t.revenue} revenue, $${t.profit} profit`).join(" | ")}</li>
        </ul>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Financial Models & Projections</span>
        <ul className="ml-4 mt-1 text-sm">
          <li>Revenue: <b>${data.revenue?.toLocaleString()}</b></li>
          <li>Profit: <b>${data.profit?.toLocaleString()}</b></li>
          <li>Retention Rate: <b>{data.retention}%</b></li>
          <li>Unique Clients: <b>{data.uniqueClients}</b></li>
        </ul>
      </div>
      <div className="mb-4">
        <span className="font-semibold">EBITA & Key Metrics</span>
        <ul className="ml-4 mt-1 text-sm">
          <li>EBITA: <b>${data.profit?.toLocaleString()}</b></li>
          <li>Profit Margin: <b>{data.profit && data.revenue ? Math.round((data.profit / data.revenue) * 100) : '-'}%</b></li>
        </ul>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Other KPIs</span>
        <ul className="ml-4 mt-1 text-sm">
          <li>Utilization: <b>{data.utilization}%</b></li>
          <li>Unique Clients: <b>{data.uniqueClients}</b></li>
          <li>Retention: <b>{data.retention}%</b></li>
        </ul>
      </div>
    </div>
  );
}
