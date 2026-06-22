package com.example.studentmgnt;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/students")
public class StudentController {
	private StudentService userService;
	public StudentController(StudentService userService) {
		this.userService=userService;
	}
	@PostMapping()
	@ResponseStatus(HttpStatus.CREATED)
	public void save(@RequestBody Student user) {
		userService.save(user);
	}
	@GetMapping("/{id}")
	public Optional<Student> find(@PathVariable int id) {
		return Optional.ofNullable(userService.find(id).get());
	}
	@GetMapping
	public List<Student> finadAll(){
		return userService.findAll();
	}
	@PutMapping
	public void updates(@RequestBody Student user) {
	    userService.save(user);
	}
	@PutMapping("/{id}")
	public String updateUser(@PathVariable int id, @RequestBody Student user) {

	    Optional<Student> existingUser = userService.find(id);

	    if (existingUser.isPresent()) {
	        user.setId(id);
	        userService.save(user);
	        return "User Updated Successfully";
	    }

	    return "User Not Found";
	}
	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable int id) {

	    if (userService.find(id).isPresent()) {
	        userService.delete(id);
	        return "User Deleted Successfully";
	    }

	    return "User Not Found";
	}
	
	
}
