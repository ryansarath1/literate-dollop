use employee_db

INSERT INTO department_list
(dept_name)
VALUES
("engineering"), 
("marketing");


INSERT INTO role_list
(title, salary, department_list_id)
VALUES
("engineer", 90000, 1),
("tester", 50000, 1),
("graphic designer", 90000, 2);


INSERT INTO employee_list
(first_name, last_name, role_list_id, manager_id)
VALUES
("John", "Troy", 1, NULL),
("Peter", "Johnson", 2, NULL),
("Jack", "Nolan", 2, NULL);
