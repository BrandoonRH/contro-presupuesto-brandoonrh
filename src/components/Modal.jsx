import { useState, useEffect } from 'react'
import CerrarBTN from '../img/cerrar.svg'
import Mensaje from './Mensaje';

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

  const [message, setMessage ] = useState(''); 
  
  const [nameGasto, setNameGasto] = useState('')
  const [cantidadGasto, setCantidadGasto] = useState('')
  const [categoria, setCategoria] = useState('')
  const [id, setId] = useState('')
  const [fecha, setFecha] =useState('')

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0 ){
      setNameGasto(gastoEditar.nameGasto)
      setCantidadGasto(gastoEditar.cantidadGasto)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  },[])

  const ocultarModal = () => {
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
      setModal(false)
    }, 800);
  }

  const handleSubmit = (e) => {

    e.preventDefault(); 
    if([nameGasto, cantidadGasto, categoria].includes('')){
      setMessage('Todos los Campos son Obligatorios')
      setTimeout(() => {
        setMessage('')
      }, 2000);
      return
    }
    guardarGasto({nameGasto, cantidadGasto, categoria, id, fecha})
  }

  return (
    <div className="modal">

        <div className='cerrar-modal'>
          <img src={CerrarBTN} alt="Cerrar Modal" onClick={ocultarModal}/>
        </div>

        <form onSubmit={handleSubmit} action="" className={`formulario ${animarModal ? "animar" : "cerrar" }`}>
              <legend>{gastoEditar.nameGasto ? 'Editar Gasto': 'Nuevo Gasto'}</legend>
              {message && <Mensaje tipo="error">{message}</Mensaje>}
              <div className="campo">
                  <label htmlFor="nameGasto">Nombre Gasto: </label>
                  <input type="text" value={nameGasto} onChange={ e => setNameGasto(e.target.value)} id="nameGasto" placeholder='Añade un nombre al gasto: eje. Comida'/>
              </div>
              <div className="campo">
                  <label htmlFor="cantidadGasto">Cantidad del Gasto: </label>
                  <input type="text" value={cantidadGasto} onChange={ e => setCantidadGasto(Number(e.target.value))} id="cantidadGasto" placeholder='Añade una cantidad: eje. $300'/>
              </div>
              <div className="campo">
                <label htmlFor="categoriaGasto">Categoría</label>
                  <select name="" id="categoriaGasto" value={categoria} onChange={ e => setCategoria(e.target.value)}>
                    <option value="">--Seleccione--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                  </select>
              </div>

              <input type="submit" value={gastoEditar.nameGasto ? 'Actualizar' : 'Añadir'} />
              
        </form>
        

    </div>
  )
}

export default Modal;