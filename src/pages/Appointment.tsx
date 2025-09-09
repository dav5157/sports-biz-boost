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
  const [form, setForm] = useState({
    therapist: '',
    time: '',
    therapyType: '',
    room: '',
    clientName: '',
    clientEmail: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to backend
    alert('Appointment created! (not yet saved to backend)');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">New Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Button type="submit" className="w-full">Create Appointment</Button>
      </form>
    </div>
  );
}
