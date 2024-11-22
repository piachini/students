const API_URL = "http://localhost:3000/api/v1/students/";

// Funzione per formattare la data in gg/mm/aaaa
function formatDate(dateString) {
    const date = new Date(dateString); // Converte la stringa in oggetto Date
    const day = String(date.getDate()).padStart(2, "0"); // Ottieni il giorno con zero iniziale
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mesi da 0 a 11, quindi aggiungi 1
    const year = date.getFullYear(); // Ottieni l'anno
    return `${day}/${month}/${year}`;
  }

// Fetch lista studenti
async function fetchStudents() {
    const response = await fetch("http://localhost:3000/api/v1/students");
    const students = await response.json();
  
    const studentsTableBody = document.querySelector("#studentsTable tbody");
    studentsTableBody.innerHTML = ""; // Svuota la tabella
  
    students.forEach((student) => {
      // Creiamo una nuova riga
      const row = document.createElement("tr");
  
      // Creiamo le celle
      const idCell = document.createElement("td");
      idCell.textContent = student.id;
  
      const nameCell = document.createElement("td");
      nameCell.textContent = student.name;
  
      const emailCell = document.createElement("td");
      emailCell.textContent = student.email;
  
      const yearCell = document.createElement("td");
      yearCell.textContent = student.year;
  
      const dobCell = document.createElement("td");
      dobCell.textContent = formatDate(student.dob); // Usa la funzione di formattazione della data
  
      // Aggiungiamo le celle alla riga
      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(yearCell);
      row.appendChild(dobCell);
  
      // Aggiungiamo la riga alla tabella
      studentsTableBody.appendChild(row);
    });
  }
  

// Aggiungi studente
document.getElementById("addStudentForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const name = document.getElementById("newStudentName").value;
    const email = document.getElementById("newStudentEmail").value;
    const year = document.getElementById("newStudentYear").value;
    const dob = document.getElementById("newStudentDOB").value;
  
    // Invia i dati al backend
    const response = await fetch("http://localhost:3000/api/v1/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, year, dob }),
    });
  
    if (response.ok) {
      alert("Studente aggiunto con successo!");
      document.getElementById("addStudentForm").reset(); // Resetta il modulo
      fetchStudents(); // Aggiorna la lista
    } else {
      alert("Errore durante l'aggiunta dello studente.");
    }
  });
  

// Aggiorna nome studente
document.getElementById("updateStudentForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = document.getElementById("updateStudentId").value;
  const name = document.getElementById("updateStudentName").value;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  document.getElementById("updateStudentId").value = "";
  document.getElementById("updateStudentName").value = "";
  fetchStudents(); // Aggiorna la lista
});

// Elimina studente
document.getElementById("deleteStudentForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = document.getElementById("deleteStudentId").value;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  document.getElementById("deleteStudentId").value = "";
  fetchStudents(); // Aggiorna la lista
});
