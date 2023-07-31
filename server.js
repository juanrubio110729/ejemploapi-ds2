const express = require('express');
const fs = require('fs').promises; // Importa la versión promisificada de fs
const path = require('path'); // Para construir rutas de archivo

let studentData = {}; // Almacena los datos de los estudiantes

async function loadStudentData() {
    const studentDirs = await fs.readdir('./students'); // Lista todos los directorios en la carpeta 'students'

    // Carga el archivo JSON para cada estudiante
    for (const dir of studentDirs) {
        const filePath = path.join('./students', dir, 'info.json'); // Ruta del archivo JSON para este estudiante
        const fileContents = await fs.readFile(filePath, 'utf-8'); // Lee el archivo
        studentData[dir] = JSON.parse(fileContents); // Almacena los datos del estudiante
    }
}

loadStudentData(); // Carga los datos de los estudiantes al iniciar

const app = express();

app.get('/api/info/:code', (req, res) => {
    const { code } = req.params;
    const studencode = studentData[code];
    let infostudent = (studencode !== undefined && studencode !== '') ? studencode : 'No info';
    res.send(infostudent);
});

app.listen(3000, () => {
    console.log('La aplicación está corriendo en http://localhost:3000');
});
