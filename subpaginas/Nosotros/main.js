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
  
  document.addEventListener("DOMContentLoaded", function () {
	const contador = document.querySelector(".contador");
	let numero = 0;
	const maximo = 8500;
	const velocidad = 15;
  
	const intervalo = setInterval(() => {
	  if (numero < maximo) {
		numero += 50;
		contador.textContent = numero.toLocaleString();
	  } else {
		contador.textContent = maximo.toLocaleString();
		clearInterval(intervalo);
	  }
	}, velocidad);
  });
  