import React, {useState} from "react";
import Error from './Error';

const Formulario = ({ guardarBusqueda }) => {
  //state para el termino a buscar
  const [buscar, guardarBuscar] = useState("");
  //state para el error
  const [error, guardarError] = useState(false);

  const buscarImagenes = (e) => {
    e.preventDefault();

    //validar
    if (buscar.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    //enviar el termino de búsqueda al componente principal
    guardarBusqueda(buscar);
  };

  return (
    <form onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, emjemplo: futbol o café"
            onChange={(e) => guardarBuscar(e.target.value)}
          />
        </div>

        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error mensaje="Agrega un termino de busqueda"></Error> : null}
    </form>
  );
};

export default Formulario;
