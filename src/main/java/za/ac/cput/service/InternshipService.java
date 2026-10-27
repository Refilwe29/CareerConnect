package za.ac.cput.service;

/*
InternshipService.java
Internship Service
Author: Refilwe Mabena (231013051)
Date: 27 October 2026
*/


import org.springframework.stereotype.Service;
import za.ac.cput.domain.Internship;
import za.ac.cput.dto.request.InternshipRequest;
import za.ac.cput.dto.response.InternshipResponse;
import za.ac.cput.factory.InternshipFactory;
import za.ac.cput.repository.InternshipRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InternshipService implements IInternshipService {

    private final InternshipRepository internshipRepository;

    public InternshipService(InternshipRepository internshipRepository) {
        this.internshipRepository = internshipRepository;
    }

    @Override
    public InternshipResponse create(InternshipRequest request) {
        if (request == null) {
            return null;
        }

        String id = UUID.randomUUID().toString();

        Internship internship = InternshipFactory.createInternship(
                id,
                request.getTitle(),
                request.getDescription(),
                request.getLocation(),
                request.getDeadline()
        );

        if (internship == null) {
            return null;
        }

        if (!internship.getDeadline().isAfter(LocalDateTime.now())) {
            return null;
        }

        if (internshipRepository.existsById(id)) {
            return null;
        }

        return toResponse(internshipRepository.save(internship));
    }

    @Override
    public InternshipResponse read(String id) {
        return internshipRepository.findById(id)
                .map(this::toResponse)
                .orElse(null);
    }

    @Override
    public InternshipResponse update(String id, InternshipRequest request) {
        if (request == null || !internshipRepository.existsById(id)) {
            return null;
        }

        Internship internship = InternshipFactory.createInternship(
                id,
                request.getTitle(),
                request.getDescription(),
                request.getLocation(),
                request.getDeadline()
        );

        if (internship == null
                || !internship.getDeadline().isAfter(LocalDateTime.now())) {
            return null;
        }

        return toResponse(internshipRepository.save(internship));
    }

    @Override
    public boolean delete(String id) {
        if (!internshipRepository.existsById(id)) {
            return false;
        }

        internshipRepository.deleteById(id);
        return true;
    }

    @Override
    public List<InternshipResponse> getAll() {
        return internshipRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<InternshipResponse> getInternshipsByLocation(String location) {
        return internshipRepository.findByLocation(location)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<InternshipResponse> getInternshipsByTitle(String title) {
        return internshipRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<InternshipResponse> getUpcomingInternships(
            LocalDateTime deadline) {
        return internshipRepository.findByDeadlineAfter(deadline)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private InternshipResponse toResponse(Internship internship) {
        boolean active = internship.getDeadline() != null
                && internship.getDeadline().isAfter(LocalDateTime.now());

        return new InternshipResponse(
                internship.getInternshipId(),
                internship.getTitle(),
                internship.getDescription(),
                internship.getLocation(),
                internship.getDeadline(),
                active
        );
    }
}
