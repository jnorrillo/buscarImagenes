import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //state del app
  const [busqueda, guardarBusqueda] = useState('');

  //guardar imagenes.
  const [imagenes, guardarImagenes] = useState([]);
  //useState para paginar
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  const str = 'MjM4NDQwMTQtMmFiNTc2ZDZhNmUxMmVhMzk3ZDVmOGUzNg==';
  const key = atob(str);

  useEffect(() => {

    const consutlarAPi = async () => {
      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      //guardar imagenes
      guardarImagenes(resultado.hits);

      //calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }

    consutlarAPi();

  }, [busqueda, key, paginaactual]);

  //definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  //definir la pagina sigiente
  const paginaSigiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>

        <Formulario guardarBusqueda={guardarBusqueda}></Formulario>
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes}></ListadoImagenes>
        {(paginaactual === 1) ? null : (<button type="button" className="bbtn btn-info mr-1" onClick={paginaAnterior}>&laquo; Anterior</button>)}
        {(paginaactual === totalpaginas) ? null : (<button type="button" className="bbtn btn-info" onClick={paginaSigiente}>Siguiente &raquo;</button>)}
      </div>
    </div>
  );
}

export default App;
