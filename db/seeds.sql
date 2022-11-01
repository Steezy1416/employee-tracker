INSERT INTO departments (name)
VALUES
("Service"),
("Curbside"),
("Bakery"),
("Produce");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Cashier", 15.00, 1),
("Curby", 13.00, 2),
("Asm", 18.00, 1),
("Baker", 14.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Alex", "Fortin", 1, 3),
("Bob", "Man", 1, 3),
("Link", "Legends", 3, NULL),
("Diana", "Nava", 2, 3);
