package com.example.studentmgnt;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class StudentService {
	private StudentRepository studentRepository;
	public StudentService(StudentRepository studentRepository) {
		this.studentRepository=studentRepository;
	}
	public void save(Student student) {
		studentRepository.save(student);
	}
	public Optional<Student> find(int id) {
		return studentRepository.findById((int) id);
	}
	public List<Student> findAll(){
		return studentRepository.findAll();
	}
	public void delete(int id) {
	    studentRepository.deleteById(id);
	}
}
