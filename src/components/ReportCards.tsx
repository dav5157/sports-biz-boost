import React from "react";

export function DailyReport({ data }: { data: any }) {
  if (!data) return null;
  const f = data.financial_pulse;
  const o = data.operational_efficiency;
  const t = data.top_performer;
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h3 className="text-xl font-bold mb-2">Sports Clinic Daily Snapshot - {data.date}</h3>
      <div className="mb-2">
        <span className="font-semibold">💰 Financial Pulse</span>
        <ul className="ml-4 mt-1 text-sm">
          <li>Revenue: <b>${f.revenue.toLocaleString()}</b> <span className="text-green-600">↑{f.revenue_change_pct}%</span> <span className="text-muted-foreground">[Target: ${f.revenue_target} ✓]</span></li>
          <li>EBITA: <b>${f.ebita.toLocaleString()}</b> <span className="text-green-600">↑{f.ebita_change_pct}%</span> <span className="text-muted-foreground">[Target: ${f.ebita_target} ✓]</span></li>
          <li>Profit Margin: <b>{f.profit_margin}%</b> <span className="text-muted-foreground">[Industry Avg: {f.industry_avg_margin}%]</span></li>
          <li>Cash Collected: <b>${f.cash_collected.toLocaleString()}</b> ({f.collection_rate}% collection rate)</li>
        </ul>
      </div>
      <div className="mb-2">
        <span className="font-semibold">🏃 Operational Efficiency</span>
        <ul className="ml-4 mt-1 text-sm">
          <li>Room Utilization: <b>{o.room_utilization}%</b></li>
        </ul>
        <div className="overflow-x-auto">
          <table className="min-w-max text-xs border mb-2">
            <thead>
              <tr>
                <th className="px-2 py-1 border">Room</th>
                <th className="px-2 py-1 border">Utilization</th>
                <th className="px-2 py-1 border">Sessions</th>
                <th className="px-2 py-1 border">Idle Hours</th>
              </tr>
            </thead>
            <tbody>
              {o.rooms.map((r: any) => (
                <tr key={r.name}>
                  <td className="px-2 py-1 border font-medium">{r.name}</td>
                  <td className="px-2 py-1 border text-center">{r.utilization}%</td>
                  <td className="px-2 py-1 border text-center">{r.sessions}</td>
                  <td className="px-2 py-1 border text-center">{r.idle_hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="ml-4 mt-1 text-sm">
          <li>Patients Seen: <b>{o.patients_seen}</b> [Walk-ins: {o.walk_ins} | Pre-booked: {o.pre_booked}]</li>
          <li>Avg Session Value: <b>${o.avg_session_value}</b> <span className="text-green-600">↑${o.avg_session_value_change} from last week</span></li>
          <li>No-Show Rate: <b>{o.no_show_rate}%</b> <span className={o.no_show_rate > o.no_show_target ? "text-yellow-600" : "text-green-600"}>⚠️</span> (Target &lt;{o.no_show_target}%)</li>
        </ul>
      </div>
      <div className="mb-2">
        <span className="font-semibold">👥 Employee Details</span>
        <div className="overflow-x-auto">
          <table className="min-w-max text-xs border mb-2">
            <thead>
              <tr>
                <th className="px-2 py-1 border">Name</th>
                <th className="px-2 py-1 border">Role</th>
                <th className="px-2 py-1 border">Patients</th>
                <th className="px-2 py-1 border">Revenue</th>
                <th className="px-2 py-1 border">Satisfaction</th>
                <th className="px-2 py-1 border">Sessions</th>
              </tr>
            </thead>
            <tbody>
              {data.employees?.map((emp: any) => (
                <tr key={emp.name}>
                  <td className="px-2 py-1 border font-medium">{emp.name}</td>
                  <td className="px-2 py-1 border">{emp.role}</td>
                  <td className="px-2 py-1 border text-center">{emp.patients}</td>
                  <td className="px-2 py-1 border text-center">${emp.revenue?.toLocaleString()}</td>
                  <td className="px-2 py-1 border text-center">{emp.satisfaction}%</td>
                  <td className="px-2 py-1 border text-center">{emp.sessions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">⭐ Top Performer:</span> {t.name} - {t.satisfaction}% satisfaction, ${t.revenue.toLocaleString()} revenue generated
      </div>
      <div className="mb-2">
        <span className="font-semibold">⚠️ Attention Needed:</span> {data.alerts[0]?.message}
      </div>
      <div className="mb-2">
        <span className="font-semibold">💡 AI-Suggested Action:</span> <span className="italic">{data.ai_suggestion}</span>
      </div>
    </div>
  );
}

export function WeeklyReport({ data }: { data: any }) {
  if (!data) return null;
  const f = data.financial_dashboard;
  const o = data.operational_metrics;
  const p = data.power_tools;
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h3 className="text-xl font-bold mb-2">Weekly Business Intelligence Report - {data.date}</h3>
      <div className="mb-2">
        <span className="font-semibold">Financial Dashboard</span>
        <ul className="ml-4 mt-1 text-sm">
          <li>Total Revenue: <b>${f.total_revenue.toLocaleString()}</b> <span className="text-green-600">↑{f.revenue_wow_pct}% WoW</span> [Q4 Target Track: {f.q4_target_track}%]</li>
          <li>Revenue Breakdown: Physio ${f.revenue_breakdown.physiotherapy.toLocaleString()} ({Math.round(f.revenue_breakdown.physiotherapy/f.total_revenue*100)}%), Massage ${f.revenue_breakdown.massage_therapy.toLocaleString()} ({Math.round(f.revenue_breakdown.massage_therapy/f.total_revenue*100)}%), Premium Add-ons ${f.revenue_breakdown.premium_addons.toLocaleString()} ({Math.round(f.revenue_breakdown.premium_addons/f.total_revenue*100)}%)</li>
          <li>EBITA: <b>${f.ebita.toLocaleString()}</b> ({f.profit_margin}% margin)</li>
          <li>Price/EBITA: {f.price_ebita}x <span className="text-muted-foreground">[Healthy range: {f.healthy_range}]</span></li>
          <li>Per-Room Revenue: <b>${f.per_room_revenue.toLocaleString()}</b> <span className="text-green-600">↑${f.per_room_revenue_change} from last week</span></li>
          <li>Cash Collected: <b>${f.cash_collected.toLocaleString()}</b> ({f.cash_collection_rate}% - Insurance delays)</li>
          <li>Outstanding AR: <b>${f.outstanding_ar.toLocaleString()}</b> ({f.ar_30days_pct}% &gt;30 days) <span className="text-yellow-600">⚠️</span></li>
          <li>Refunds Issued: <b>${f.refunds_issued}</b> ({f.refunds_pct}% - within normal range)</li>
        </ul>
        <div className="overflow-x-auto mt-2">
          <table className="min-w-max text-xs border mb-2">
            <thead>
              <tr>
                <th className="px-2 py-1 border">Room</th>
                <th className="px-2 py-1 border">Utilization</th>
                <th className="px-2 py-1 border">Sessions</th>
                <th className="px-2 py-1 border">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {f.room_details?.map((r: any) => (
                <tr key={r.name}>
                  <td className="px-2 py-1 border font-medium">{r.name}</td>
                  <td className="px-2 py-1 border text-center">{r.utilization}%</td>
                  <td className="px-2 py-1 border text-center">{r.sessions}</td>
                  <td className="px-2 py-1 border text-center">${r.revenue?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Operational Metrics</span>
        <div className="overflow-x-auto">
          <table className="min-w-max text-xs border mb-2">
            <thead>
              <tr>
                <th className="px-2 py-1 border">Time</th>
                {o.days.map((d: string) => <th key={d} className="px-2 py-1 border">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {o.room_utilization_labels.map((label: string, i: number) => (
                <tr key={label}>
                  <td className="px-2 py-1 border font-medium">{label}</td>
                  {o.room_utilization_heatmap[i].map((val: number, j: number) => (
                    <td key={j} className="px-2 py-1 border text-center">{val}%</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="ml-4 mt-1 text-sm">
          <li>Total Patients: <b>{o.total_patients}</b> [New: {o.new_patients} | Returning: {o.returning_patients}]</li>
          <li>Avg Wait Time: <b>{o.avg_wait_time} mins</b> [Target: &lt;{o.wait_time_target} mins ✓]</li>
          <li>Treatment Completion: <b>{o.treatment_completion}%</b> ({o.dropped_out} dropped out mid-package)</li>
        </ul>
        <div className="mt-2">
          <span className="font-semibold">Staff Productivity Ranking</span>
          <ol className="ml-6 mt-1 text-sm list-decimal">
            {o.staff_productivity.map((s: any, i: number) => (
              <li key={s.name} className={s.below_target ? "text-yellow-600" : ""}>{s.name} ({s.role}) - {s.patients} patients, ${s.revenue.toLocaleString()} revenue, {s.satisfaction}% satisfaction {s.below_target ? '⚠️ Below target' : ''}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Power Tools</span>
        <ul className="ml-4 mt-1 text-sm">
          <li>Predictive Cash Flow: Next week revenue <b>${p.predictive_cash_flow.next_week_revenue.toLocaleString()}</b>, Fixed costs <b>${p.predictive_cash_flow.fixed_costs.toLocaleString()}</b>, Variable costs <b>${p.predictive_cash_flow.variable_costs.toLocaleString()}</b>, Projected cash surplus <b>${p.predictive_cash_flow.projected_cash_surplus.toLocaleString()}</b></li>
          <li>Recommendation: <span className="italic">{p.predictive_cash_flow.recommendation}</span></li>
          <li>Equipment ROI: {p.equipment_roi.name} (${p.equipment_roi.cost}) - Sessions: {p.equipment_roi.sessions}, Revenue: ${p.equipment_roi.revenue_generated}, Payback: {p.equipment_roi.payback_period_months} mo, 6-mo ROI: {p.equipment_roi.roi_6mo_pct}%</li>
        </ul>
      </div>
    </div>
  );
}
