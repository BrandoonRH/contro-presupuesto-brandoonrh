import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

 const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {
    const [procentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidadGasto + total, 0); 
        const totalDisponible = presupuesto - totalGastado;
        const nuevoProcentaje = (((presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
        
        setDisponible(totalDisponible);
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(nuevoProcentaje)
        }, 1500);
    },[gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        Swal.fire({
            title: '¿Esta Seguro de Restablecer?',
            text: "Esta acción eliminara el presupuesto y los gastos ingresados!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
              Swal.fire(
                'App Restablecida!',
                'Se elimino el presupuesto y los gastos.',
                'success'
              )
            }
          })
        
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
           <CircularProgressbar
                    styles={buildStyles({
                        pathColor: procentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F3F3F3',
                        textColor: procentaje > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    value={procentaje}
                    text={`${procentaje}% Gastado`}
           />
        </div>
        <div className='contenido-presupuesto'>
            <button className="reset-app" type="buton" onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ' ' }`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto;