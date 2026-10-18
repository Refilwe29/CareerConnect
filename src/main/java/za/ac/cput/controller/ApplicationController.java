package za.ac.cput.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Application;
import za.ac.cput.service.ApplicationService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/application")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    public record ApplicationRequest(String studentNumber, String internshipId) {}

    @PostMapping("/create")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> create(@RequestBody ApplicationRequest request,
                                    Authentication authentication) {
        requireStudentOwner(request.studentNumber(), authentication);
        try {
            Application created = applicationService.apply(
                    request.studentNumber(),
                    request.internshipId()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/read/{applicationId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'COMPANY', 'ADMIN')")
    public ResponseEntity<Application> read(@PathVariable String applicationId,
                                            Authentication authentication) {
        Optional<Application> application = applicationService.read(applicationId);

        if (isStudent(authentication) && application.isPresent()
                && !application.get().getStudent().getEmail().equalsIgnoreCase(authentication.getName())) {
            throw new AccessDeniedException("Access Denied: You may only view your own applications.");
        }

        return application
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/update/{applicationId}")
    @PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
    public ResponseEntity<?> updateStatus(@PathVariable String applicationId,
                                          @RequestParam String status) {
        try {
            Application updated = applicationService.updateStatus(applicationId, status);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{applicationId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable String applicationId) {
        try {
            applicationService.delete(applicationId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Application>> getAll() {
        return ResponseEntity.ok(applicationService.readAll());
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<Application>> getByStudent(@PathVariable String studentId,
                                                          Authentication authentication) {
        requireStudentOwner(studentId, authentication);
        return ResponseEntity.ok(applicationService.readByStudent(studentId));
    }

    @GetMapping("/internship/{internshipId}")
    @PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
    public ResponseEntity<List<Application>> getByInternship(@PathVariable String internshipId) {
        return ResponseEntity.ok(applicationService.readByInternship(internshipId));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Application>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(applicationService.readByStatus(status));
    }

    private void requireStudentOwner(String studentNumber, Authentication authentication) {
        if (!isAdmin(authentication) && !applicationService.isStudentOwner(studentNumber, authentication.getName())) {
            throw new AccessDeniedException("Access Denied: You may only access your own applications.");
        }
    }

    private boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(a -> Objects.equals(a.getAuthority(), "ROLE_ADMIN"));
    }

    private boolean isStudent(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(a -> Objects.equals(a.getAuthority(), "ROLE_STUDENT"));
    }
}