-- Sample data for Sports Biz Boost


-- Therapists (expanded)
INSERT INTO employees (id, name, role, fixed_salary, commission_rate, email, is_active) VALUES
  (1, 'Leslie Evangelista', 'junior', 36000, NULL, 'leslie@clinic.com', TRUE),
  (2, 'Chu, Jen', 'junior', 36000, NULL, 'jenchu@clinic.com', TRUE),
  (3, 'Icy Lin', 'junior_associate', NULL, 0.3, 'icylin@clinic.com', TRUE),
  (4, 'Seva Kraft', 'junior', 36000, NULL, 'sevakraft@clinic.com', TRUE),
  (5, 'Alanna Emmerton', 'junior', 36000, NULL, 'alanna@clinic.com', TRUE),
  (6, 'Cheung, Lok Hang Mete', 'associate', NULL, 0.4, 'mete@clinic.com', TRUE),
  (7, 'Wang, Charles', 'associate', NULL, 0.4, 'charles@clinic.com', TRUE),
  (8, 'Nell, Mariska', 'associate', NULL, 0.4, 'mariska@clinic.com', TRUE),
  (9, 'March, Joseph', 'associate', NULL, 0.4, 'joseph@clinic.com', TRUE),
  (10, 'Wu, Ngai Chit', 'associate', NULL, 0.4, 'ngai@clinic.com', TRUE),
  (11, 'Boon, Vanessa', 'associate', NULL, 0.4, 'vanessa@clinic.com', TRUE),
  (12, 'Kamper, Christiaan', 'associate', NULL, 0.4, 'christiaan@clinic.com', TRUE),
  (13, 'Cox, Glenn', 'associate', NULL, 0.4, 'glenn@clinic.com', TRUE),
  (14, 'Leung, Dr. Elaine', 'manager', NULL, 0.5, 'elaine@clinic.com', TRUE),
  (15, 'May Lee', 'junior', 36000, NULL, 'maylee@clinic.com', TRUE),
  (16, 'Leung, Wing Lam', 'junior', 36000, NULL, 'winglam@clinic.com', TRUE),
  (17, 'Fu, Chiu Man (Taylor)', 'junior', 36000, NULL, 'taylor@clinic.com', TRUE),
  (18, 'Piachaud, Emma', 'associate', NULL, 0.4, 'emma@clinic.com', TRUE),
  (19, 'Leung, Dr. Kwok Bill', 'manager', NULL, 0.5, 'kwokbill@clinic.com', TRUE),
  (20, 'Cheng, Ava Ying', 'team_leader', NULL, 0.6, 'ava@clinic.com', TRUE),
  (21, 'Suen, Pak Yin (Kelly)', 'junior', 36000, NULL, 'kelly@clinic.com', TRUE),
  (22, 'Man, Ngai See Moriah', 'junior', 36000, NULL, 'moriah@clinic.com', TRUE),
  (23, 'Chu, Ana', 'junior', 36000, NULL, 'ana@clinic.com', TRUE),
  (24, 'Jeff Lenz', 'junior', 36000, NULL, 'jeff@clinic.com', TRUE),
  (25, 'Shahzada, Shamoon', 'junior', 36000, NULL, 'shamoon@clinic.com', TRUE),
  (26, 'Yu, Hsin Tzu Grace', 'team_leader', NULL, 0.6, 'grace@clinic.com', TRUE);


-- Rooms (expanded)
INSERT INTO rooms (id, name) VALUES
  (1, 'Rehab/Gym'),
  (2, 'Yoga Studio [Y]'),
  (3, 'Offsite (jockey)'),
  (4, 'Pilates studio 10/F'),
  (5, 'Mete Room [D]'),
  (6, 'Charles Room [B]'),
  (7, 'Joe''s Room [A]'),
  (8, 'Kayden Room [I]'),
  (9, 'Glenn/Vanessa Room [J]'),
  (10, 'Chiro Room 10/F [C]'),
  (11, 'May/Ana/Jeff Room [E]'),
  (12, 'Jo Leung Room [H]'),
  (13, 'Emma''s Room [F]'),
  (14, 'Chiro Room 1/F [G]'),
  (15, 'Ava/Grace Women''s Health Room [K]');

-- Clients
INSERT INTO clients (id, name, email) VALUES
  (1, 'John Doe', 'john@example.com'),
  (2, 'Jane Smith', 'jane@example.com'),
  (3, 'Bob Wilson', 'bob@example.com'),
  (4, 'Lisa Brown', 'lisa@example.com');


-- Appointments (room_id added, sample mapping)
INSERT INTO appointments (id, therapist_id, client_id, room_id, start_time, end_time, revenue, status) VALUES
  (1, 1, 1, 1, '2025-09-08 09:00:00', '2025-09-08 09:45:00', 800, 'confirmed'),
  (2, 2, 2, 2, '2025-09-08 10:00:00', '2025-09-08 11:00:00', 900, 'confirmed'),
  (3, 3, 3, 5, '2025-09-08 11:00:00', '2025-09-08 12:00:00', 850, 'pending'),
  (4, 4, 4, 6, '2025-09-08 12:00:00', '2025-09-08 12:30:00', 600, 'confirmed'),
  (5, 5, 1, 7, '2025-09-08 13:00:00', '2025-09-08 14:00:00', 950, 'confirmed'),
  (6, 6, 2, 8, '2025-09-08 14:00:00', '2025-09-08 14:45:00', 800, 'confirmed');

-- Example Alert (if you have an alerts table)
INSERT INTO alerts (id, type, message) VALUES
  (1, 'warning', 'Room 3 idle 2.5 hrs (10:30-1:00) - scheduling gap'),
  (2, 'suggestion', 'Tomorrow 10-12 slot underbooked. Send SMS blast to Sports Injury segment offering 15% off - projected +$600 revenue');
