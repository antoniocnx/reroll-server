import multer from 'multer';

// Configuración de almacenamiento
export const storage = multer.diskStorage({
    // destination: 'uploads/gallery',
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Especifica el nombre del archivo subido
    }
});

// Configuración de Multer
export const upload = multer({ storage: storage });
