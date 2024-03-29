package com.musicvisualizer.musicvisualizer.storage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
@Slf4j
public class FileSystemStorageService implements StorageService {

	private final Path rootLocation;

	@Autowired
	public FileSystemStorageService(StorageProperties properties) {
		this.rootLocation = Paths.get(properties.getLocation());
	}

	@Override
	public void store(MultipartFile file, String name) {
		try {
			if (file.isEmpty()) {
				throw new StorageException("Failed to store empty file " + name);
			}
			// Overwrite existing file
			Path filePath = this.rootLocation.resolve(name);
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists() || resource.isReadable()) {
				FileSystemUtils.deleteRecursively(filePath);
			}
			Files.copy(file.getInputStream(), filePath);
		} catch (IOException e) {
			throw new StorageException("Failed to store file " + name, e);
		}
	}

	@Override
	public Stream<Path> loadAll() {
		try {
			return Files.walk(this.rootLocation, 1)
					.filter(path -> !path.equals(this.rootLocation))
					.map(path -> this.rootLocation.relativize(path));
		} catch (IOException e) {
			throw new StorageException("Failed to read stored files", e);
		}

	}

	@Override
	public Path load(String filename) {
		return rootLocation.resolve(filename);
	}

	@Override
	public Resource loadAsResource(String filename) {
		try {
			Path file = load(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new StorageFileNotFoundException("Could not read file: " + filename);

			}
		} catch (MalformedURLException e) {
			throw new StorageFileNotFoundException("Could not read file: " + filename, e);
		}
	}

	@Override
	public void deleteAll() {
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}

	@Override
	public void init() {
		try {
			Files.createDirectory(rootLocation);
			log.info("Initialized directory at {}", rootLocation);

		} catch (IOException e) {
			throw new StorageException("Could not initialize storage", e);
		}
	}

	@Override
	public void delete(String filename) {
		try {
			Path file = load(filename);
			FileSystemUtils.deleteRecursively(file);
		} catch (Exception e) {
			throw new StorageException("Could not delete file " + filename, e);
		}
	}
}
