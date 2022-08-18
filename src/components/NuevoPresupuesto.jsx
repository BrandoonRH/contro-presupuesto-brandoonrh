import {useState} from 'react'
import Mensaje from './Mensaje';

export const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('');

    const handleSumit = (e) => {
        e.preventDefault(); 
        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un Presupuesto Valido'); 
            return
        }
        setMensaje(''); 
        setIsValidPresupuesto(true);
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
       <form onSubmit={handleSumit} className='formulario'>
            <div className='campo'>
                <label htmlFor="">Definir Presupuesto</label>
                <input onChange={ e => setPresupuesto(Number(e.target.value))} type="number" name="" id="" placeholder='Añade tu Presupuesto' className='nuevo-presupuesto' value={presupuesto}/>
            </div>
            <input type="submit" value="Añadir"  />
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
       </form>
      
    </div>
  )
}
export default NuevoPresupuesto; 