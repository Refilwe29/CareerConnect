package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Student;

import static org.junit.jupiter.api.Assertions.*;

/*
 * StudentFactoryTest.java
 * Student factory test class
 * Author: Ebenezer Kouakou (230480152)
 * Date: 08 March 2026
 */
class StudentFactoryTest {

    @Test
    void testBuildSuccess() {
        Student student = StudentFactory.buildStudent("230480152", "Ebenezer",
                "eben@cput.ac.za", "1234");

        assertNotNull(student);
        System.out.println(student);
    }

    @Test
    void testBuildStudentWithEmptyName() {
        Student student = StudentFactory.buildStudent("230480152", "",
                "eben@cput.ac.za", "1234");

        assertNull(student);
        System.out.println("Student is null because name was empty.");
    }

    @Test
    void testBuildStudentWithNullEmail() {
        Student student = StudentFactory.buildStudent("230480152", "Ebenezer",
                null, "1234");

        assertNull(student);
        System.out.println("Student is null because email was null.");
    }
}