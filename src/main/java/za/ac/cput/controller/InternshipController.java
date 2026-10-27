package za.ac.cput.controller;

/*
InternshipController.java
Internship REST Controller
Author: Refilwe Mabena (231013051)
Date: 27 October 2026
*/


import org.springframework.web.bind.annotation.*;
import za.ac.cput.dto.request.InternshipRequest;
import za.ac.cput.dto.response.InternshipResponse;
import za.ac.cput.service.IInternshipService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/internship")
@CrossOrigin(origins = "http://localhost:5173")
public class InternshipController {

    private final IInternshipService internshipService;

    public InternshipController(IInternshipService internshipService) {
        this.internshipService = internshipService;
    }

    @PostMapping("/create")
    public InternshipResponse create(
            @RequestBody InternshipRequest request) {
        return internshipService.create(request);
    }

    @GetMapping("/read/{internshipId}")
    public InternshipResponse read(
            @PathVariable String internshipId) {
        return internshipService.read(internshipId);
    }

    @PutMapping("/update/{internshipId}")
    public InternshipResponse update(
            @PathVariable String internshipId,
            @RequestBody InternshipRequest request) {
        return internshipService.update(internshipId, request);
    }

    @DeleteMapping("/delete/{internshipId}")
    public boolean delete(@PathVariable String internshipId) {
        return internshipService.delete(internshipId);
    }

    @GetMapping("/getAll")
    public List<InternshipResponse> getAll() {
        return internshipService.getAll();
    }

    @GetMapping("/getByLocation")
    public List<InternshipResponse> getByLocation(
            @RequestParam String location) {
        return internshipService.getInternshipsByLocation(location);
    }

    @GetMapping("/getByTitle")
    public List<InternshipResponse> getByTitle(
            @RequestParam String title) {
        return internshipService.getInternshipsByTitle(title);
    }

    @GetMapping("/getUpcoming")
    public List<InternshipResponse> getUpcoming() {
        return internshipService.getUpcomingInternships(
                LocalDateTime.now());
    }
}
