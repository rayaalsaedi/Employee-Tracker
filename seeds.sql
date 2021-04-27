insert into departments (name)
values ("HR"), ("Accounting"),("engineering");

insert into roles (title, department_id, salary )
values ("HR Business Partner", 95000.00, 1),(HR Generalist, 78000.00,1), ("Senior Accountant", 85000.00, 2), ("Senior Engineer", 150000.00, 3), ("Software Engineer, 12000.00,3");

insert into employee (firstName, lastName, role_id, manager_id)
values ("Alex", "Doyle", 1, null), ("Chris", "Thompson", 2, 1), ("John", "Smith", 3, 1), ("Omar", "Martinez", 6, 5);
