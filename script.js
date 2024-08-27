let editRowIndex = null;

//Adding a Student
function addStudent() {
    let studentName = document.getElementById("studentName").value;
    let studentID = document.getElementById("studentID").value;
    let emailID = document.getElementById("emailID").value;
    let contactNo = document.getElementById("contactNo").value;

    if (!studentName || !studentID || !emailID || !contactNo) {
        alert("Please fill all the required fields.");
        return;
    }

// Check Input
    if (!/^[a-zA-Z\s]+$/.test(studentName)) {
        alert("Student Name should contain only letters.");
        return;
    }
    if (!/^\d+$/.test(studentID)) {
        alert("Student ID should only contain numbers.");
        return;
    }
    if (!/^\d{10}$/.test(contactNo)) {
        alert("Contact No. should contain 10 digits.");
        return;  
    }
    
    let studentInfoTable = document.getElementById("studentInfoTable").getElementsByTagName('tbody')[0];
    
    if (editRowIndex !== null) {
        let row = studentInfoTable.rows[editRowIndex - 1];
        row.cells[0].innerHTML = studentName;
        row.cells[1].innerHTML = studentID;
        row.cells[2].innerHTML = emailID;
        row.cells[3].innerHTML = contactNo;

        editRowIndex = null;
    } else {

    let newRow = studentInfoTable.insertRow();

    newRow.innerHTML = `<td>${studentName}</td>
                        <td>${studentID}</td> 
                        <td>${emailID}</td>
                        <td>${contactNo}</td>
                        <td>
                            <button onclick="editStudent(this)">Edit</button>
                            <button onclick="deleteStudent(this)">Delete</button>
                        </td>`;

    }
    saveToLocalStorage();
    document.getElementById("registrationForm").reset();                    
}

//Edit Student

function editStudent(button) {
    let row = button.parentElement.parentElement;
    editRowIndex = row.rowIndex;

    document.getElementById("studentName").value = row.cells[0].innerHTML;
    document.getElementById("studentID").value = row.cells[1].innerHTML;
    document.getElementById("emailID").value = row.cells[2].innerHTML;
    document.getElementById("contactNo").value = row.cells[3].innerHTML;
}

//Delete Student
function deleteStudent(button) {
    if (confirm("Are you sure you want to delete this student record?")) {
    let row = button.parentElement.parentElement;
    row.parentNode.removeChild(row);
    saveToLocalStorage();
    }
}

// Delete Student  confirmation
function deleteStudent(button) {
    if (confirm("Are you sure you want to delete this student record?")) {
        let row = button.parentElement.parentElement; 
        row.parentNode.removeChild(row); 
        saveToLocalStorage();
    }
}


//Save data in Local Storage
function saveToLocalStorage() {
    let students = [];
    let studentInfoTable = document.getElementById("studentInfoTable").getElementsByTagName('tbody')[0];
    for (let i = 0; i < studentInfoTable.rows.length; i++) {
        let student = {
            name: studentInfoTable.rows[i].cells[0].innerHTML,
            id: studentInfoTable.rows[i].cells[1].innerHTML,
            email: studentInfoTable.rows[i].cells[2].innerHTML,
            contact: studentInfoTable.rows[i].cells[3].innerHTML
        };
        students.push(student);
    }
    localStorage.setItem("students",JSON.stringify(students));
}

//Load data from Local Storage
function loadFromLocalStorage() {
    let students = JSON.parse(localStorage.getItem("students") || "[]");
    let studentInfoTable = document.getElementById("studentInfoTable").getElementsByTagName('tbody')[0];
    studentInfoTable.innerHTML = "";
    students.forEach(student => {
        let newRow = studentInfoTable.insertRow();
        newRow.innerHTML = `<td>${student.name}</td>
                            <td>${student.id}</td>
                            <td>${student.email}</td>
                            <td>${student.contact}</td>
                            <td>
                                <button onclick="editStudent(this)">Edit</button>
                                <button onclick="deleteStudent(this)">Delete</button>
                            </td>`;
    });
}



//on page load
window.onload = loadFromLocalStorage;

