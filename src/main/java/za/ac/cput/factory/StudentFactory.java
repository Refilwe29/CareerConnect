package za.ac.cput.factory;

import za.ac.cput.domain.Student;

/*
 * StudentFactory.java
 * Student factory class
 * Author: Ebenezer Kouakou (230480152)
 * Date: 08 March 2026
 */
public class StudentFactory {
    public static Student buildStudent(String studentNumber, String name,
                                       String email, String password) {

        if (studentNumber == null || studentNumber.isEmpty() ||
                name == null || name.isEmpty() ||
                email == null || email.isEmpty() ||
                password == null || password.isEmpty()) {
            return null;
        }

        return new Student.Builder()
                .setStudentNumber(studentNumber)
                .setName(name)
                .setEmail(email)
                .setPassword(password)
                .build();
    }
}
