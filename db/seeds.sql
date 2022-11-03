INSERT INTO departments (name)
VALUES
("Service"),
("Curbside"),
("Bakery"),
("Produce");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Service Manager", 20.00, 1),
("Curbside Manager", 20.00, 2),
("Bakery Manager", 20.00, 3),
("Produce Manager", 20.00, 4),
("Cashier", 15.00, 1),
("Curby", 13.00, 2),
("Baker", 14.00, 3),
("Stocker", 16.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Mayer", 1, NULL),
("Edmond", "Dantes", 2, NULL),
("Tom", "Holland", 3, NULL),
("Peter", "Parker", 4, NULL),
("Alex", "Man", 5, 1),
("Bruce", "Wayne", 6, 2),
("Mari", "Egg", 7, 3),
("Amuro", "Ray", 8, 4);
