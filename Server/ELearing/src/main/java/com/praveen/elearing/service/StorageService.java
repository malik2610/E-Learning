package com.praveen.elearing.service;



import com.praveen.elearing.entity.FileData;
import com.praveen.elearing.respository.FileDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class StorageService {

    @Autowired
    private FileDataRepository fileDataRepository;

    private final String FOLDER_PATH="C://webprg/Self Practice/React/Minor1/E-Learning/Server/ELearing/MyFiles/";
    private final String StudyMaterial_FOLDER_PATH="C://webprg/Self Practice/React/Minor1/E-Learning/Server/ELearing/StudyMaterials/";
    private final String Video_FOLDER_PATH="C://webprg/Self Practice/React/Minor1/E-Learning/Server/ELearing/VideoResources/";

    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath=FOLDER_PATH+file.getOriginalFilename();
        FileData fileData=fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());
        file.transferTo(new File(filePath));
        if (fileData != null) {
            return file.getOriginalFilename();
        }
        return null;
    }
    public String uploadPdfToFileSystem(MultipartFile file) throws IOException {
        String filePath=StudyMaterial_FOLDER_PATH+file.getOriginalFilename();
        FileData fileData=fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());
        file.transferTo(new File(filePath));
        if (fileData != null) {
            return file.getOriginalFilename();
        }
        return null;
    }

    public String uploadVideoToFileSystem(MultipartFile file) throws IOException {
        String filePath=Video_FOLDER_PATH+file.getOriginalFilename();
        FileData fileData=fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());
        file.transferTo(new File(filePath));
        if (fileData != null) {
            return file.getOriginalFilename();
        }
        return null;
    }

    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        List<FileData> fileDataList = fileDataRepository.findByName(fileName);
        if (!fileDataList.isEmpty()) {
            String filePath = fileDataList.get(0).getFilePath();
            return Files.readAllBytes(Paths.get(filePath));
        } else {
            throw new FileNotFoundException("File with name " + fileName + " not found.");
        }
    }




}
