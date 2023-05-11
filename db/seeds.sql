USE employee_tracker_db;

INSERT INTO department (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Human Resources'),
    ('Finance'),
    ('Information Technology'),
    ('Operations');

INSERT INTO role (title, salary, department_id) VALUES
    ('Sales Manager', 80000, 1),
    ('Sales Representative', 50000, 1),
    ('Marketing Manager', 85000, 2),
    ('Marketing Coordinator', 45000, 2),
    ('Human Resources Director', 90000, 3),
    ('HR Generalist', 55000, 3),
    ('Financial Analyst', 75000, 4),
    ('Accountant', 60000, 4),
    ('IT Manager', 95000, 5),
    ('IT Support Specialist', 50000, 5),
    ('Operations Manager', 90000, 6),
    ('Logistics Coordinator', 55000, 6),
    ('Business Development Manager', 85000, 1),
    ('Product Manager', 90000, 2),
    ('Recruiter', 55000, 3),
    ('Compensation Analyst', 70000, 3),
    ('Software Engineer', 85000, 5),
    ('Data Analyst', 65000, 5),
    ('Network Administrator', 70000, 5),
    ('Financial Controller', 100000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    -- Sales
    (1, 'Tony', 'Stark', 1, NULL), -- Sales Manager
    (2, 'Pepper', 'Potts', 2, 1), -- Sales Representative
    (3, 'Luke', 'Cage', 2, 1), -- Sales Representative
    (4, 'Misty', 'Knight', 2, 1), -- Sales Representative
    (5, 'Danny', 'Rand', 2, 1), -- Sales Representative

    -- Marketing
    (6, 'Steve', 'Rogers', 3, NULL), -- Marketing Manager
    (7, 'Natasha', 'Romanoff', 4, 6), -- Marketing Coordinator
    (8, 'Bucky', 'Barnes', 4, 6), -- Marketing Coordinator
    (9, 'Sam', 'Wilson', 4, 6), -- Marketing Coordinator
    (10, 'Sharon', 'Carter', 4, 6), -- Marketing Coordinator

    -- Human Resources
    (11, 'Peter', 'Parker', 5, NULL), -- Human Resources Director
    (12, 'Gwen', 'Stacy', 6, 11), -- HR Generalist
    (13, 'Mary', 'Jane Watson', 6, 11), -- HR Generalist
    (14, 'Harry', 'Osborn', 6, 11), -- HR Generalist
    (15, 'Miles', 'Morales', 6, 11), -- HR Generalist

    -- Finance
    (16, 'Bruce', 'Banner', 7, NULL), -- Financial Analyst
    (17, 'Wanda', 'Maximoff', 8, 16), -- Accountant
    (18, 'Vision', 'Vision', 8, 16), -- Accountant
    (19, 'Scott', 'Lang', 8, 16), -- Accountant
    (20, 'Hope', 'van Dyne', 8, 16), -- Accountant

    -- Information Technology
    (21, 'Carol', 'Danvers', 9, NULL), -- IT Manager
    (22, 'Peter', 'Quill', 10, 21), -- IT Support Specialist
    (23, 'Gamora', 'Gamora', 10, 21), -- IT Support Specialist
    (24, 'Rocket', 'Raccoon', 10, 21), -- IT Support Specialist
    (25, 'Groot', 'Groot', 10, 21), -- IT Support Specialist

    -- Operations
    (26, 'Stephen', 'Strange', 11, NULL), -- Operations Manager
    (27, 'Wong', 'Wong', 12, 26), -- Logistics Coordinator
    (28, 'Okoye', 'Okoye', 12, 26), -- Logistics Coordinator
    (29, 'Nebula', 'Nebula', 12, 26), -- Logistics Coordinator
    (30, 'Drax', 'Drax', 12, 26); -- Logistics Coordinator



