// Function to toggle the visibility of the registration form
function toggleForm() {
  var form = document.getElementById("newStudentForm");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

// Function to validate the registration form
function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var phone = document.getElementById("phone").value;
  var address = document.getElementById("address").value;
}

// Fetch API stats from the MongoDB database
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb+srv://yaronkarki12:r4hulk4rki@cluster0.5cntnm6.mongodb.net/",
  (err, client) => {
    if (err) {
      console.log(err);
    } else {
      const db = client.db("studentportal");
      const collection = db.collection("studentdetails");

      collection.find().toArray((err, studentdetails) => {
        if (err) {
          console.log(err);
        } else {
          displayApiStats(studentdetails);
        }
      });
    }
  }
);

// Display API stats in the table
function displayApiStats(studentdetails) {
  studentdetails.forEach((studentdetail) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${studentdetail.name}</td>
      <td>${studentdetail.age}</td>
      <td>${studentdetail.gender}</td>
      <td>${studentdetail.email}</td>
      <td>${studentdetail.phone}</td>
      <td>${studentdetail.address}</td>
      <td>${studentdetail.courses}</td>
      <td>${studentdetail.gpa}</td>
      <td><img src="${studentdetail.image}" alt="Student Image"></td>
    `;
    document.getElementById("api-stats").appendChild(row);
  });
}