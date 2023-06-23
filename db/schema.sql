DROP DATABASE IF EXISTS spiderman_db;

CREATE DATABASE spiderman_db;


USE spiderman_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)


);
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE NULL
);


CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (roles_id) 
    REFERENCES roles(id)
    ON DELETE NULL
    FOREIGN KEY (manager_id) 
    REFERENCES employees(id)
    ON DELETE NULL

)


