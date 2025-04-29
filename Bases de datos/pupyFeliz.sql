create database puppyFeliz;
use puppyFeliz;


CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(200),
    contraseña VARCHAR(100) NOT NULL,
    tipo_vivienda ENUM('casa', 'departamento', 'otro'),
    experiencia_mascotas ENUM('si', 'no')
);

CREATE TABLE administradores (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(100) NOT NULL
);

CREATE TABLE mascotas (
    id_mascota INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    especie ENUM('perro', 'gato') NOT NULL,
    raza VARCHAR(50),
    edad INT,
    tamaño ENUM('chico', 'mediano', 'grande'),
    sexo ENUM('macho', 'hembra'),
    descripcion TEXT,
    estado ENUM('Disponible', 'Adoptado') DEFAULT 'Disponible'
);

CREATE TABLE solicitudes_adopcion (
    id_solicitud INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_mascota INT NOT NULL,
    fecha_solicitud DATE NOT NULL,
    motivo_adopcion TEXT NOT NULL,
    estado_solicitud ENUM('Pendiente', 'Aprobada', 'Rechazada') DEFAULT 'Pendiente',
    terminos_aceptados BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota)
);

CREATE TABLE donaciones (
    id_donacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,  -- Puede ser NULL si quieres permitir donaciones anónimas
    monto DECIMAL(10,2) NOT NULL,
    fecha_donacion DATE NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    comentario TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

INSERT INTO administradores (nombre, correo, contraseña)
VALUES 
('Roberto Aparicio', 'aparicior272@gmail.com','adopcion12345'),
('Martin Corona', 'martin_2004@icloud.com', 'adopcion1234567');

select *from administradores;