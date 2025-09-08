-- Sample data for Sports Biz Boost

-- Employees
INSERT INTO employees (id, name, role, fixed_salary, commission_rate, email, is_active) VALUES
  (1, 'Alice Wong', 'junior', 36000, NULL, 'alice@clinic.com', TRUE),
  (2, 'Ben Lee', 'junior', 36000, NULL, 'ben@clinic.com', TRUE),
  (3, 'Cathy Chan', 'junior', 36000, NULL, 'cathy@clinic.com', TRUE),
  (4, 'David Yip', 'junior', 36000, NULL, 'david@clinic.com', TRUE),
  (5, 'Eva Lam', 'junior_associate', NULL, 0.3, 'eva@clinic.com', TRUE),
  (6, 'Frankie Ho', 'junior_associate', NULL, 0.3, 'frankie@clinic.com', TRUE),
  (7, 'Grace Fong', 'associate', NULL, 0.4, 'grace@clinic.com', TRUE),
  (8, 'Henry Cheung', 'associate', NULL, 0.4, 'henry@clinic.com', TRUE),
  (9, 'Ivy Lau', 'associate', NULL, 0.4, 'ivy@clinic.com', TRUE),
  (10, 'Jacky Ng', 'associate', NULL, 0.4, 'jacky@clinic.com', TRUE),
  (11, 'Karen Ma', 'manager', NULL, 0.5, 'karen@clinic.com', TRUE),
  (12, 'Louis Poon', 'manager', NULL, 0.5, 'louis@clinic.com', TRUE),
  (13, 'Mandy Choi', 'team_leader', NULL, 0.6, 'mandy@clinic.com', TRUE),
  (14, 'Nick So', 'team_leader', NULL, 0.6, 'nick@clinic.com', TRUE),
  (15, 'Olivia Tsang', 'team_leader', NULL, 0.6, 'olivia@clinic.com', TRUE),
  (16, 'Pauline Lee', 'partner', NULL, 0.6, 'pauline@clinic.com', TRUE),
  (17, 'Quentin Yu', 'partner', NULL, 0.6, 'quentin@clinic.com', TRUE),
  (18, 'Rita Cheng', 'partner', NULL, 0.6, 'rita@clinic.com', TRUE),
  (19, 'Sammy Wong', 'partner', NULL, 0.6, 'sammy@clinic.com', TRUE),
  (20, 'Tommy Leung', 'partner', NULL, 0.6, 'tommy@clinic.com', TRUE);

-- Rooms
INSERT INTO rooms (id, name) VALUES
  (1, 'Physio Room 1'),
  (2, 'Physio Room 2'),
  (3, 'Gym Area');

-- Clients
INSERT INTO clients (id, name, email) VALUES
  (1, 'John Doe', 'john@example.com'),
  (2, 'Jane Smith', 'jane@example.com'),
  (3, 'Bob Wilson', 'bob@example.com'),
  (4, 'Lisa Brown', 'lisa@example.com');

-- Appointments
INSERT INTO appointments (id, therapist_id, client_id, start_time, end_time, revenue, status) VALUES
  (1, 1, 1, '2025-09-08 09:00:00', '2025-09-08 09:45:00', 800, 'confirmed'),
  (2, 2, 2, '2025-09-08 10:00:00', '2025-09-08 11:00:00', 900, 'confirmed'),
  (3, 3, 3, '2025-09-08 11:00:00', '2025-09-08 12:00:00', 850, 'pending'),
  (4, 4, 4, '2025-09-08 12:00:00', '2025-09-08 12:30:00', 600, 'confirmed'),
  (5, 5, 1, '2025-09-08 13:00:00', '2025-09-08 14:00:00', 950, 'confirmed'),
  (6, 6, 2, '2025-09-08 14:00:00', '2025-09-08 14:45:00', 800, 'confirmed');

-- Example Alert (if you have an alerts table)
INSERT INTO alerts (id, type, message) VALUES
  (1, 'warning', 'Room 3 idle 2.5 hrs (10:30-1:00) - scheduling gap'),
  (2, 'suggestion', 'Tomorrow 10-12 slot underbooked. Send SMS blast to Sports Injury segment offering 15% off - projected +$600 revenue');
