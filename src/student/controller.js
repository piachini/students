const pool = require("../../db");
const queries = require("./queries");

// const getStudents = (req, res) => {
//     pool.query( queries.getStudents, (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     })
// };

const getStudents = (req, res) => {
    
    const { email } = req.query; // eventuale parametro di ricerca per email

    if (!email) {
        pool.query( queries.getStudents, (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    } else {
        pool.query( queries.getStudentByEmail, [email], (error, results) => {
            if (error) throw error;
            if (!results.rows.length) {
                res.status(404).send("Student not found");
            } else
            res.status(200).json(results.rows);
        })
    }
};

const addStudent = (req, res) => {
    const { name, email, year, dob } = req.body;

    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {// already exists
            res.send("Email already exists");
        } else {
            // add student to db
            pool.query( queries.addStudent, [name, email, year, dob], (error, results) => {
                if (error) throw error;
                res.status(201).json(results.rows);
                console.log("Student created");
            })
        }
    });
};

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query( queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            res.status(404).send("Student not found");
        } else
        res.status(200).json(results.rows);
    })
};

const updateStudentName = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query( queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) {
            res.status(404).send("Student not found");
        } else {
            pool.query(queries.updateStudentName, [name, id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Student updated successfully");
            })

        }
    })
};


const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query( queries.removeStudent, [id], (error, results) => {
        if (error) throw error;
        // if (!results.rows.length) {
        //     res.status(404).send("Student id not found")
        // } else
        res.status(200).send("Student deleted");
    })
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudentName,
}