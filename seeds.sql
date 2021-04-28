insert into department (name)
values ("HR"), ("Accounting"),("engineering");

insert into role (title, department_id, salary )
values ("HR Business Partner", 1, 95000.00),("HR Generalist",1, 75000.00), ("Senior Accountant", 2, 85000.00), ("Senior Engineer", 3, 150000.00), ("Software Engineer", 3, 100000.00);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Alex", "Doyle", 1, null), ("Chris", "Thompson", 2, 1), ("John", "Smith", 3, 1), ("Omar", "Martinez", 6, 5);

select * from department;
select * from role;
select * from employee;