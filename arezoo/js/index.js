function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function removeAnimationFromAllContainers() {
  const imageContainers = document.querySelectorAll('.image-container.animacion');
  imageContainers.forEach(container => {
    container.classList.remove('animacion');
  });
}

function toggleAnimationClass(event) {
  const container = event.currentTarget;
  const hasAnimationClass = container.classList.contains('animacion');

  removeAnimationFromAllContainers(); // Quita la clase de cualquier elemento que la tenga antes

  if (!hasAnimationClass) {
    container.classList.add('animacion'); // Agrega la clase al elemento si no la tenía
  }
}

// Función para evitar que se propague el evento de clic desde los botones .rows a los contenedores .image-container con la clase .animacion
function stopPropagation(event) {
  const containerWithAnimation = event.target.closest('.image-container.animacion');
  if (containerWithAnimation) {
    event.stopPropagation();
  }
}

// Ejecutar el código después de que el DOM haya cargado
document.addEventListener('DOMContentLoaded', function() {
  if (isTouchDevice()) {
    // Agregar el evento click a todos los elementos con la clase .image-container
    const imageContainers = document.querySelectorAll('.image-container');

    const elementsToRemoveAnimation = document.querySelectorAll('.animacion');

    elementsToRemoveAnimation.forEach(element => {
      element.classList.remove('animacion');
    });

    imageContainers.forEach(container => {
      container.addEventListener('click', toggleAnimationClass);
    });

    // Agregar el evento click a los botones .prev-btn y .next-btn y evitar que se propague el evento
    const prevButtons = document.querySelectorAll('.prev-btn');
    const nextButtons = document.querySelectorAll('.next-btn');
    
    prevButtons.forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        const thisButtons = document.querySelector('#this-buttons');
        if (thisButtons) {
          thisButtons.classList.add('animacion');
        }
      });
    });

    nextButtons.forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        const thisButtons = document.querySelector('#this-buttons');
        if (thisButtons) {
          thisButtons.classList.add('animacion');
        }
      });
    });

    // Agregar el evento click al documento para quitar la clase .animacion fuera de los .image-container
    document.addEventListener('click', event => {
      const isButtonClicked = event.target.closest('.rows');
      if (!event.target.closest('.image-container') && !isButtonClicked) {
        removeAnimationFromAllContainers();
      }
    });
  }
});




function toggleMenu() {
  const navbarContainer = document.getElementById("navbar");
  const menuIcon = document.getElementById("menu-icon");
  const menuExpand = document.querySelector(".menu-burguer-expand-container");

  navbarContainer.classList.toggle("expanded");
  menuExpand.classList.toggle("visible");

  if (navbarContainer.classList.contains("expanded")) {
    menuIcon.src = "img/cross.png";
    document.body.classList.add("no-scroll");
    navbarContainer.classList.add("white-bg");
  } else {
    menuIcon.src = "img/menu-burguer.png";
    document.body.classList.remove("no-scroll");
    navbarContainer.classList.remove("white-bg");
  }
}

const menuLinks = document.querySelectorAll("a.nav-link");
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    const navbarContainer = document.getElementById("navbar");
    if (navbarContainer.classList.contains("expanded")) {
      toggleMenu(); // Llama a la función para cerrar el menú
    }
  });
});

function toggleText(buttonId) {
  const textHiddenParagraphs = document.querySelectorAll('.text-hidden-js');
  const moreButton = document.getElementById('more');
  const lessButton = document.getElementById('less');


  const paragraphsHidden = textHiddenParagraphs[0].classList.contains('text-hidden');


  textHiddenParagraphs.forEach(paragraph => {

    if (paragraphsHidden) {
      paragraph.classList.remove('text-hidden');
    } else {
      paragraph.classList.add('text-hidden');
    }
  });


  if (paragraphsHidden) {
    moreButton.style.display = (buttonId === 'more') ? 'block' : 'none';
    lessButton.style.display = (buttonId === 'more') ? 'none' : 'block';
  } else {
    moreButton.style.display = (buttonId === 'more') ? 'none' : 'block';
    lessButton.style.display = (buttonId === 'more') ? 'block' : 'none';
  }
}
