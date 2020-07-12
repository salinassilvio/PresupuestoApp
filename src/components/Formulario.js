import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';


const Formulario = ({guardarGasto,guardarCrearGasto}) => {

    //state
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] =  useState(0);
    const [error,guardarError] =  useState(false);

    //cuando el usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();
        
        //validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //construir el gasto
        const gasto ={
            nombre: nombre,
            cantidad: cantidad,
            id:shortid.generate()
        }

        console.log(gasto);

        //pasar al componente principal que es el app.js
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //resetear el form
        guardarNombre('');
        guardarCantidad(0);
    }

    return ( 
        <form 
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aqui</h2>

            {error ? 
                <Error mensaje="Ambos campos son obligatorios o Presupuesto incorrecto"></Error>
                :null
            }

            <div className="campo">
                <label>Nombre del Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                ></input>
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value ={cantidad}
                    onChange ={e => guardarCantidad(parseInt(e.target.value))}
                ></input>
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value ="Agregar Gasto"
            ></input>
            
        </form>

     );
}
Formulario.prototype = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired,
}
 
export default Formulario;