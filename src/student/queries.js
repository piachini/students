
const getStudents = "SELECT * FROM students";

const addStudent = "INSERT INTO students (name, email, year, dob) VALUES ($1, $2, $3, $4)";

const getStudentById = "SELECT * FROM students WHERE ID = $1";

const updateStudentName = "UPDATE students SET name = $1 WHERE id = $2";

const removeStudent = "DELETE FROM students WHERE id = $1"

const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";


module.exports = {
    getStudents,
    addStudent,
    getStudentById,
    updateStudentName,
    removeStudent,
    checkEmailExists,
};
