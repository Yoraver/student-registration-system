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
    if (!/^\d+$/.test(studentID) || !/^\d{10}$/.test(contactNo)) {
        alert("Student ID and Contact No. should contain only numbers.");
        return;
    }
    
    let studentTable = document.getElementById("studentInfoTable").getElementsByTagName('tbody')[0];
    let newRow = studentTable.insertRow();

    newRow.innerHTML = `<td>${studentName}</td>
                        <td>${studentID}</td> 
                        <td>${emailID}</td>
                        <td>${contactNo}</td>
                        <td>
                            <button onclick="editStudent(this)">Edit</button>
                            <button onclick="deleteStudent(this)">Delete</button>
                        </td>`;
    
    saveToLocalStorage();
    document.getElementById("registrationForm").reset();                    
}

//Edit Student



