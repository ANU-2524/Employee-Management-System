package com.example.employeemanagementsystem.service.impl;

import com.example.employeemanagementsystem.model.Employee;
import com.example.employeemanagementsystem.repository.EmployeeRepository;
import com.example.employeemanagementsystem.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public Employee createEmployee(Employee employee) {
        log.info("Creating employee: {}", employee);
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        log.info("Fetching all employees");
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        log.info("Fetching employee by id: {}", id);
        return employeeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Employee not found with id: " + id));
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        log.info("Updating employee id: {}", id);
        Employee existing = getEmployeeById(id);
        existing.setName(employee.getName());
        existing.setEmail(employee.getEmail());
        existing.setRole(employee.getRole());
        return employeeRepository.save(existing);
    }

    @Override
    public void deleteEmployee(Long id) {
        log.info("Deleting employee id: {}", id);
        Employee existing = getEmployeeById(id);
        employeeRepository.delete(existing);
    }
}