# Employee Management System API Documentation

## Overview
The Employee Management System is a Spring Boot application that allows for the management of employee records. It provides a RESTful API for creating, retrieving, updating, and deleting employee information.

## API Endpoints

### 1. Create Employee
- **Endpoint:** `POST /employees`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "Developer"
  }
  ```
- **Response:** 
  - **201 Created** with the created employee object.

### 2. Get All Employees
- **Endpoint:** `GET /employees`
- **Response:** 
  - **200 OK** with a list of all employees.

### 3. Get Employee by ID
- **Endpoint:** `GET /employees/{id}`
- **Response:** 
  - **200 OK** with the employee object if found.
  - **404 Not Found** if the employee does not exist.

### 4. Update Employee
- **Endpoint:** `PUT /employees/{id}`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "Senior Developer"
  }
  ```
- **Response:** 
  - **200 OK** with the updated employee object.
  - **404 Not Found** if the employee does not exist.

### 5. Delete Employee
- **Endpoint:** `DELETE /employees/{id}`
- **Response:** 
  - **204 No Content** if the employee was successfully deleted.
  - **404 Not Found** if the employee does not exist.

## Setup Instructions
1. Clone the repository.
2. Navigate to the project directory.
3. Update the `application.properties` file with your database configuration.
4. Run the application using `mvn spring-boot:run`.
5. Access the API at `http://localhost:8080`.

## Testing
Unit tests are included in the `src/test/java` directory to ensure the application functions as expected. Use `mvn test` to run the tests.

## Technologies Used
- Spring Boot
- Spring Data JPA
- Lombok
- MySQL/PostgreSQL
- H2 (for testing)

## License
This project is licensed under the MIT License.