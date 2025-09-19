# Employee Management System
Deployed Link : https://employee-management-seven-sage.vercel.app/

This project is an Employee Management System built using Spring Boot, JPA, and Object-Oriented Programming principles. It provides a RESTful API for managing employee records, including creating, retrieving, updating, and deleting employee information.

## Features

- **Employee Management**: Create, read, update, and delete employee records.
- **RESTful API**: Exposes endpoints for employee operations.
- **Database Integration**: Uses JPA for database interactions, supporting MySQL or PostgreSQL.
- **Testing**: Includes unit tests to ensure application reliability.

## Technologies Used

- Spring Boot
- Spring Data JPA
- Lombok
- H2 Database (for testing)
- MySQL/PostgreSQL (for production)

## Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd Employee-Management-System
   ```

2. **Configure Database**:
   Update the `src/main/resources/application.properties` file with your database connection details.

3. **Build the Project**:
   Use Maven to build the project:
   ```
   mvnd clean install
   ```

4. **Run the Application**:
   Start the application using:
   ```
   mvnd spring-boot:run
   ```

5. **Access the API**:
   The API will be available at `http://localhost:8080/api/employees`.

## API Endpoints

- **Create Employee**: `POST /api/employees`
- **Get All Employees**: `GET /api/employees`
- **Get Employee by ID**: `GET /api/employees/{id}`
- **Update Employee**: `PUT /api/employees/{id}`
- **Delete Employee**: `DELETE /api/employees/{id}`

## Testing

Run the tests using:
```
mvn test
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.