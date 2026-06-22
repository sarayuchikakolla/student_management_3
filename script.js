// ================= REGISTER USER =================
async function registerUser(event) {
    event.preventDefault();

    let uname = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let pwd = document.getElementById("password").value;
    let cpwd = document.getElementById("confirm_password").value;

    // Password validation
    if (pwd !== cpwd) {
        alert("Password and Confirm Password do not match");
        return;
    }

    try {

        // Fetch existing users
        const response = await fetch("http://localhost:8081/users");
        const users = await response.json();

        // Check if user already exists
        let existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert("User already exists");
            return;
        }

        // Create new user object
        const user = {
            name: uname,
            email: email,
            password: pwd
        };

        // Add user to db.json
        const result = await fetch("http://localhost:8081/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (result.ok) {
            alert("Registration Successful");

            // Redirect to login page
            window.location.href = "login.html";
        } else {
            alert("Failed to register user");
        }

    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
}


// ================= LOGIN USER =================
async function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8081/users");
        const users = await response.json();

        // DEBUGGING
        console.log("Users from DB:", users);
        console.log("Entered Email:", email);
        console.log("Entered Password:", password);

        let validUser = users.find(
            user => user.email === email &&
                    user.password === password
        );

        console.log("Matched User:", validUser);

        if (validUser) {

            localStorage.setItem("loggedInUser", JSON.stringify(validUser));

            alert("Login Successful");
            window.location.href = "dashboard.html";

        } else {
            alert("Invalid email or password");
        }

    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
}
// ================= LOGOUT =================
async function logoutUser() {

    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully");

    window.location.href = "login.html";
}


// ================= ADD STUDENT =================
async function addStudent(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let cgpa = document.getElementById("cgpa").value;

    try {

        const result = await fetch("http://localhost:8081/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                age,
                email,
                cgpa
            })
        });

        if(result.ok){

            window.location.href = "view.html";

        }

    } catch(error) {

        console.log(error);

    }
}

// ================= DISPLAY STUDENTS =================

async function loadStudents() {

    const tableBody = document.getElementById("studentTableBody");

    const response = await fetch("http://localhost:8081/students");

    const students = await response.json();

    tableBody.innerHTML = "";

    students.forEach((student) => {

        tableBody.innerHTML += `
            <tr>

                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.email}</td>
                <td>${student.cgpa}</td>

                <td>

                    <button onclick="editStudent('${student.id}')">
                        Edit
                    </button>

                    <button onclick="deleteStudent('${student.id}')">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}

// ================= EDIT STUDENT =================
function editStudent(id) {

    localStorage.setItem("editStudentId", id);

    window.location.href = "./edit.html";
}

// ================= UPDATE STUDENT =================
async function updateStudent(event) {

    event.preventDefault();

    const id = localStorage.getItem("editStudentId");

    const updatedStudent = {

        id: id,

        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        cgpa: document.getElementById("cgpa").value
    };

    await fetch(`http://localhost:8081/students/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedStudent)
    });

    alert("Updated Successfully");

    window.location.replace("view.html");
}

// ================= DELETE STUDENT =================
async function deleteStudent(id) {

    await fetch(`http://localhost:8081/students/${id}`, {
        method: "DELETE"
    });

    loadStudents();
}