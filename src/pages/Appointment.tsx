import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';

// TODO: Replace with real API fetch
const therapists = [
  'Leslie Evangelista', 'Chu, Jen', 'Icy Lin', 'Seva Kraft', 'Alanna Emmerton',
  'Cheung, Lok Hang Mete', 'Wang, Charles', 'Nell, Mariska', 'March, Joseph', 'Wu, Ngai Chit',
  'Boon, Vanessa', 'Kamper, Christiaan', 'Cox, Glenn', 'Leung, Dr. Elaine', 'May Lee',
  'Leung, Wing Lam', 'Fu, Chiu Man (Taylor)', 'Piachaud, Emma', 'Leung, Dr. Kwok Bill',
  'Cheng, Ava Ying', 'Suen, Pak Yin (Kelly)', 'Man, Ngai See Moriah', 'Chu, Ana',
  'Jeff Lenz', 'Shahzada, Shamoon', 'Yu, Hsin Tzu Grace'
];
const rooms = [
  'Rehab/Gym', 'Yoga Studio [Y]', 'Offsite (jockey)', 'Pilates studio 10/F', 'Mete Room [D]',
  'Charles Room [B]', "Joe's Room [A]", 'Kayden Room [I]', 'Glenn/Vanessa Room [J]',
  'Chiro Room 10/F [C]', 'May/Ana/Jeff Room [E]', 'Jo Leung Room [H]', "Emma's Room [F]",
  'Chiro Room 1/F [G]', "Ava/Grace Women's Health Room [K]"
];
const therapyTypes = ['Physio', 'Pilates', 'Chiro', 'Massage', 'Rehab', 'Other'];

export default function AppointmentPage() {
  const [mode, setMode] = useState<'smart' | 'manual'>('smart');
  const [form, setForm] = useState({
    therapist: '',
    time: '',
    therapyType: '',
    room: '',
    clientName: '',
    clientEmail: '',
    notes: ''
  });
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as 'smart' | 'manual');
    setSuggestions([]);
    setSelectedSuggestion(null);
    setMessage('');
  };

  // Smart scheduler: fetch suggestions
  const handleSmartSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    // TODO: Replace with real API call
    // Simulate API: return 3 suggestions
    setTimeout(() => {
      setSuggestions([
        { id: 1, time: '2025-09-10T09:00', therapist: form.therapist || therapists[0], room: form.room || rooms[0], reason: 'Optimal for knee rehab', confidence: 95 },
        { id: 2, time: '2025-09-10T10:00', therapist: form.therapist || therapists[1], room: form.room || rooms[1], reason: 'High success rate', confidence: 90 },
        { id: 3, time: '2025-09-10T11:00', therapist: form.therapist || therapists[2], room: form.room || rooms[2], reason: 'Specialized', confidence: 88 }
      ]);
      setLoading(false);
    }, 800);
  };

  // Smart scheduler: confirm booking
  const handleSmartBook = async () => {
    if (selectedSuggestion == null) return;
    setLoading(true);
    setMessage('');
    // TODO: POST to /api/appointments/smart-book
    setTimeout(() => {
      setLoading(false);
      setMessage('Appointment booked via smart scheduler!');
    }, 800);
  };

  // Manual booking
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    // TODO: POST to /api/appointments/manual-book
    setTimeout(() => {
      setLoading(false);
      setMessage('Appointment booked manually!');
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">New Appointment</h2>
      <div className="flex gap-4 mb-4">
        <label>
          <input type="radio" value="smart" checked={mode === 'smart'} onChange={handleModeChange} />
          <span className="ml-1">Smart Scheduler</span>
        </label>
        <label>
          <input type="radio" value="manual" checked={mode === 'manual'} onChange={handleModeChange} />
          <span className="ml-1">Manual Booking</span>
        </label>
      </div>
      {mode === 'smart' ? (
        <form onSubmit={handleSmartSuggest} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Therapist (optional)</label>
            <select name="therapist" value={form.therapist} onChange={handleChange} className="w-full border rounded p-2">
              <option value="">Any therapist</option>
              {therapists.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Room (optional)</label>
            <select name="room" value={form.room} onChange={handleChange} className="w-full border rounded p-2">
              <option value="">Any room</option>
              {rooms.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Therapy Nature</label>
            <select name="therapyType" value={form.therapyType} onChange={handleChange} required className="w-full border rounded p-2">
              <option value="">Select type</option>
              {therapyTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Client Name</label>
            <Input name="clientName" value={form.clientName} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Client Email</label>
            <Input name="clientEmail" type="email" value={form.clientEmail} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Notes</label>
            <Textarea name="notes" value={form.notes} onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Finding Suggestions...' : 'Get Smart Suggestions'}</Button>
        </form>
      ) : (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Therapist</label>
            <select name="therapist" value={form.therapist} onChange={handleChange} required className="w-full border rounded p-2">
              <option value="">Select therapist</option>
              {therapists.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Time Slot</label>
            <Input name="time" type="datetime-local" value={form.time} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Therapy Nature</label>
            <select name="therapyType" value={form.therapyType} onChange={handleChange} required className="w-full border rounded p-2">
              <option value="">Select type</option>
              {therapyTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Room</label>
            <select name="room" value={form.room} onChange={handleChange} required className="w-full border rounded p-2">
              <option value="">Select room</option>
              {rooms.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Client Name</label>
            <Input name="clientName" value={form.clientName} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Client Email</label>
            <Input name="clientEmail" type="email" value={form.clientEmail} onChange={handleChange} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Notes</label>
            <Textarea name="notes" value={form.notes} onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Booking...' : 'Book Manually'}</Button>
        </form>
      )}
      {/* Smart suggestions UI */}
      {mode === 'smart' && suggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Smart Slot Suggestions</h3>
          <ul className="space-y-2">
            {suggestions.map((s, idx) => (
              <li key={s.id} className={`border rounded p-3 flex items-center justify-between ${selectedSuggestion === idx ? 'border-blue-500 bg-blue-50' : ''}`}>
                <div>
                  <div><b>Time:</b> {new Date(s.time).toLocaleString()}</div>
                  <div><b>Therapist:</b> {s.therapist}</div>
                  <div><b>Room:</b> {s.room}</div>
                  <div className="text-xs text-gray-500">{s.reason} ({s.confidence}%)</div>
                </div>
                <Button variant={selectedSuggestion === idx ? 'default' : 'outline'} onClick={() => setSelectedSuggestion(idx)}>
                  {selectedSuggestion === idx ? 'Selected' : 'Choose'}
                </Button>
              </li>
            ))}
          </ul>
          <Button className="mt-4 w-full" disabled={selectedSuggestion == null || loading} onClick={handleSmartBook}>
            {loading ? 'Booking...' : 'Book Selected Slot'}
          </Button>
        </div>
      )}
      {message && <div className="mt-4 text-green-600 font-semibold">{message}</div>}
    </div>
  );
}
