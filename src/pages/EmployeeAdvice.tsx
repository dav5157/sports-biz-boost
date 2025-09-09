import React, { useState } from "react";

// Mock employee data (replace with API fetch in production)
const employees = [
  { name: "Sarah Chen", role: "Partner", patients: 52, revenue: 10400, satisfaction: 97, sessions: 48, target: 11000 },
  { name: "Mike Torres", role: "Associate", patients: 48, revenue: 8900, satisfaction: 92, sessions: 44, target: 9500 },
  { name: "Amy Liu", role: "Associate", patients: 44, revenue: 8200, satisfaction: 95, sessions: 40, target: 9000 },
  { name: "James Park", role: "Partner", patients: 39, revenue: 6500, satisfaction: 90, sessions: 36, target: 8000 },
];

export default function EmployeeAdvicePage() {
  const [selected, setSelected] = useState(employees[0]);
  const [target, setTarget] = useState(selected.target);
  const [feedback, setFeedback] = useState("");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const emp = employees.find(emp => emp.name === e.target.value)!;
    setSelected(emp);
    setTarget(emp.target);
    setFeedback("");
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(e.target.value));
  };

  const handleSetTarget = () => {
    setFeedback(`Target for ${selected.name} set to $${target.toLocaleString()}`);
  };

  // Simple advice logic (replace with AI/analytics in production)
  const getAdvice = (emp: typeof employees[0]) => {
    let advice = [];
    if (emp.revenue < emp.target) advice.push("Focus on upselling premium add-ons and improving patient retention.");
    if (emp.satisfaction < 95) advice.push("Consider requesting more patient feedback and reviewing session quality.");
    if (emp.patients < 45) advice.push("Increase outreach to returning clients and follow up on missed appointments.");
    if (advice.length === 0) advice.push("Excellent performance! Keep up the great work.");
    return advice;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Personalized Employee Advice</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Employee</label>
        <select value={selected.name} onChange={handleSelect} className="w-full border rounded p-2">
          {employees.map(emp => <option key={emp.name} value={emp.name}>{emp.name} ({emp.role})</option>)}
        </select>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <div className="font-semibold">Patients</div>
          <div>{selected.patients}</div>
        </div>
        <div>
          <div className="font-semibold">Revenue</div>
          <div>${selected.revenue.toLocaleString()}</div>
        </div>
        <div>
          <div className="font-semibold">Satisfaction</div>
          <div>{selected.satisfaction}%</div>
        </div>
        <div>
          <div className="font-semibold">Sessions</div>
          <div>{selected.sessions}</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Performance Review</div>
        <ul className="list-disc ml-6 text-sm">
          {getAdvice(selected).map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Set Revenue Target</div>
        <div className="flex gap-2 items-center">
          <input type="number" value={target} onChange={handleTargetChange} className="border rounded p-2 w-32" />
          <button onClick={handleSetTarget} className="px-4 py-2 rounded bg-primary text-white">Set Target</button>
        </div>
        {feedback && <div className="text-green-600 mt-2">{feedback}</div>}
      </div>
    </div>
  );
}
