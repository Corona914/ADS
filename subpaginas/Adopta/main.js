class TextoAnimado {
	constructor(id, objetivo){
		this.texto = document.getElementById(id);
		this.objetivo = document.getElementById(objetivo);
		this.letras = this.texto.innerText.split("");
		
		this.texto.innerText = '';

		this.letras.forEach((letra) => {
			let caracter = letra === ' ' ? '&nbsp;' : letra;

			this.texto.innerHTML = this.texto.innerHTML + `
				<div>
					<span>${caracter}</span>
					<span class="segunda-linea">${caracter}</span>
				</div>
			`;
		});

		this.objetivo.addEventListener('mouseenter', () => {
			let cuenta = 0;

			const intervalo = setInterval(() => {
				if(cuenta < this.texto.children.length){
					this.texto.children[cuenta].classList.add('animacion');
					cuenta += 1;
				} else {
					clearInterval(intervalo);
				}
			}, 30);
		});

		this.objetivo.addEventListener('mouseleave', () => {
			let cuenta = 0;

			const intervalo = setInterval(() => {
				if(cuenta < this.texto.children.length){
					this.texto.children[cuenta].classList.remove('animacion');
					cuenta += 1;
				} else {
					clearInterval(intervalo);
				}
			}, 30);
		});
		
	}
}

new TextoAnimado('logo', 'logotipo');


document.addEventListener("DOMContentLoaded", function () {
	const faqItems = document.querySelectorAll(".faq-item");
  
	faqItems.forEach(item => {
	  const question = item.querySelector(".faq-question");
	  const answer = item.querySelector(".faq-answer");
	  const icon = item.querySelector(".faq-icon");
  
	  question.addEventListener("click", () => {
		const isOpen = answer.style.display === "block";
  
		// Cerrar todos
		document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");
		document.querySelectorAll(".faq-icon").forEach(i => i.textContent = "+");
  
		// Abrir si no estaba abierto
		if (!isOpen) {
		  answer.style.display = "block";
		  icon.textContent = "−";
		}
	  });
	});
  });
  
  // Adopciones
  const mascotas = [
	{ nombre: "Toto", edad: "9 años", tipo: "perro", tamano: "mediano", sexo: "macho", imagen: "imagenes/perro1.jpg" },
	{ nombre: "Hana", edad: "7 años", tipo: "perro", tamano: "mediano", sexo: "hembra", imagen: "imagenes/perro2.jpg" },
	{ nombre: "Lily", edad: "6 años", tipo: "perro", tamano: "mediano", sexo: "hembra", imagen: "imagenes/perro3.jpg" },
	{ nombre: "Drako", edad: "6 años 6 meses", tipo: "perro", tamano: "grande", sexo: "macho", imagen: "imagenes/perro4.jpg" },
	{ nombre: "Dolly", edad: "6 años 6 meses", tipo: "perro", tamano: "mediano", sexo: "hembra", imagen: "imagenes/perro5.jpg" },
	{ nombre: "Leo", edad: "6 años", tipo: "perro", tamano: "mediano", sexo: "macho", imagen: "imagenes/perro6.jpg" },
	{ nombre: "Percy", edad: "6 años", tipo: "perro", tamano: "mediano", sexo: "macho", imagen: "imagenes/perro7.jpg" },
	{ nombre: "Silena", edad: "6 años", tipo: "perro", tamano: "mediano", sexo: "hembra", imagen: "imagenes/perro8.jpg" },
	{ nombre: "Canela", edad: "5 años", tipo: "perro", tamano: "mediano", sexo: "hembra", imagen: "imagenes/perro9.jpg" },
	{ nombre: "Michi", edad: "2 años", tipo: "gato", tamano: "chico", sexo: "hembra", imagen: "imagenes/gato1.jpg" }
  ];
  
  const galeria = document.getElementById('galeria-mascotas');
  const filtroTipo = document.getElementById('filtro-tipo');
  const filtroTamano = document.getElementById('filtro-tamano');
  const filtroHembra = document.getElementById('hembra');
  const filtroMacho = document.getElementById('macho');
  const eliminarFiltros = document.getElementById('eliminar-filtros');
  
  function mostrarMascotas() {
	galeria.innerHTML = '';
  
	const tipo = filtroTipo.value;
	const tamano = filtroTamano.value;
	const hembra = filtroHembra.checked;
	const macho = filtroMacho.checked;
  
	const filtradas = mascotas.filter(m => {
	  return (
		(tipo === '' || m.tipo === tipo) &&
		(tamano === '' || m.tamano === tamano) &&
		(!hembra || m.sexo === 'hembra') &&
		(!macho || m.sexo === 'macho')
	  );
	});
  
	if (filtradas.length === 0) {
	  galeria.innerHTML = "<p>No hay mascotas que coincidan con los filtros.</p>";
	  return;
	}
  
	filtradas.forEach(m => {
	  const div = document.createElement('div');
	  div.className = 'mascota';
	  div.innerHTML = `
		<img src="${m.imagen}" alt="${m.nombre}">
		<div class="mascota-info">
		  <h3>${m.nombre}</h3>
		  <p>${m.edad}</p>
		</div>
	  `;
	  galeria.appendChild(div);
	});
  }
  
  filtroTipo.addEventListener('change', mostrarMascotas);
  filtroTamano.addEventListener('change', mostrarMascotas);
  filtroHembra.addEventListener('change', mostrarMascotas);
  filtroMacho.addEventListener('change', mostrarMascotas);
  eliminarFiltros.addEventListener('click', () => {
	filtroTipo.value = '';
	filtroTamano.value = '';
	filtroHembra.checked = false;
	filtroMacho.checked = false;
	mostrarMascotas();
  });
  
  // Inicial
  mostrarMascotas();
  
  // Manejo del formulario de adopción
  document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('telefono', document.getElementById('telefono').value);
    formData.append('direccion', document.getElementById('direccion').value);
    formData.append('tipoVivienda', document.getElementById('tipo-vivienda').value);
    formData.append('experiencia', document.getElementById('experiencia').value);
    formData.append('motivo', document.getElementById('motivo').value);

    // Enviar datos al backend
    fetch('../../registrar_adopcion.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('¡Gracias por tu interés en adoptar! Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.');
        this.reset();
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Ocurrió un error al enviar la solicitud. Por favor, intenta de nuevo.');
    });
  });
  