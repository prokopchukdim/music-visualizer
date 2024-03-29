package com.musicvisualizer.musicvisualizer.controllers;

import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
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
import org.springframework.web.bind.annotation.ResponseBody;
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

    private final String[] undeletableFiles = { "Elevator Music.mp3", "Sweep Frequency.wav", "Test Tune.mp3" };

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
        return ResponseEntity.ok().body("Backend running");
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
        log.info("User requested file: {}", filename);
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
    public ResponseEntity<String> uploadFile(MultipartFile file, String name) {
        log.info("Uploaded file {}", name);
        if (Arrays.asList(undeletableFiles).contains(name)) {
            log.error("Denied overwrite request for {}, protected resource", name);
            return ResponseEntity.badRequest().body("Couldn't overwrite, file protected on server");
        }

        if (storageService.loadAll().count() >= 10) {
            return ResponseEntity.badRequest().body("Error: The max number of uploaded files has been reached");
        }
        try {
            storageService.store(file, name);
        } catch (Exception e) {
            log.error("Failed file upload {}", e);
            return ResponseEntity.badRequest().body("Error: Failed to upload file");
        }

        return ResponseEntity.ok().body(file.getOriginalFilename() + " has been uploaded");
    }

    @DeleteMapping("deleteFile/")
    @ResponseBody
    public ResponseEntity<String> deleteFile(String filename) {
        if (Arrays.asList(undeletableFiles).contains(filename)) {
            log.error("Denied delete request for {}, protected resource", filename);
            return ResponseEntity.badRequest().body("Couldn't delete, file labled undeletable on server");
        }

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