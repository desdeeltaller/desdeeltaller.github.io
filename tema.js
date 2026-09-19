// Desde el taller — cambio de tema claro/oscuro.
// Se carga en el <head> para aplicar el tema guardado antes de pintar la página.
(function () {
  var raiz = document.documentElement;
  var guardado = null;
  try { guardado = localStorage.getItem('tema'); } catch (e) {}
  if (guardado === 'light' || guardado === 'dark') raiz.setAttribute('data-theme', guardado);

  function temaActual() {
    var fijo = raiz.getAttribute('data-theme');
    if (fijo) return fijo;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function pintarBoton(boton) {
    var oscuro = temaActual() === 'dark';
    boton.textContent = oscuro ? 'Modo claro' : 'Modo oscuro';
    boton.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var boton = document.querySelector('.tema');
    if (!boton) return;
    pintarBoton(boton);
    boton.addEventListener('click', function () {
      var nuevo = temaActual() === 'dark' ? 'light' : 'dark';
      raiz.setAttribute('data-theme', nuevo);
      try { localStorage.setItem('tema', nuevo); } catch (e) {}
      pintarBoton(boton);
    });
  });
})();
