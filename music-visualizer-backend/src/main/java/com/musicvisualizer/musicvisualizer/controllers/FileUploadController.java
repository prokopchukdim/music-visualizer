package com.musicvisualizer.musicvisualizer.controllers;

import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.musicvisualizer.musicvisualizer.storage.StorageProperties;
import com.musicvisualizer.musicvisualizer.storage.StorageService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class FileUploadController {

    private final StorageService storageService;
    private final StorageProperties storageProperties;

    @Autowired
    public FileUploadController(StorageService storageService, StorageProperties storageProperties) {
        this.storageService = storageService;
        this.storageProperties = storageProperties;
    }

    @GetMapping("/")
    public ResponseEntity<String> testEndpoint() {
        if (!Files.isDirectory(Paths.get(storageProperties.getLocation()))) {
            storageService.init();
        }
        return ResponseEntity.ok().body("test");
    }

    @GetMapping("getMusicFiles/")
    public ResponseEntity<Object[]> getAllMusicFiles(Model model) throws IOException {
        // Object[] result = storageService.loadAll().map(
        // path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
        // "getFile", path.getFileName().toString()).build().toUri().toString())
        // .toArray();
        Object[] result = storageService.loadAll().map(
                path -> path.getFileName().toString()).toArray();
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("getFile/")
    public ResponseEntity<Resource> getFile(String filename) {
        Resource file;
        try {
            file = storageService.loadAsResource(filename);
            return ResponseEntity.ok().body(file);
        } catch (Exception e) {
            log.error("Could not get file {}", filename, e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("uploadFile/")
    public ResponseEntity<String> uploadFile(MultipartFile file) {
        if (storageService.loadAll().count() >= 10) {
            return ResponseEntity.badRequest().body("Error: The max number of uploaded files has been reached");
        }
        storageService.store(file);
        return ResponseEntity.ok().body(file.getOriginalFilename() + " has been uploaded");
    }

    @DeleteMapping("deleteFile/")
    public ResponseEntity<String> deleteFile(String filename) {
        try {
            storageService.delete(filename);
        } catch (Exception e) {
            log.error("Could not delete {}", filename, e);
            return ResponseEntity.badRequest().body("Could not find file " + filename);
        }
        log.info("Deleted {}", filename);
        return ResponseEntity.ok().body("Deleted " + filename);
    }

}