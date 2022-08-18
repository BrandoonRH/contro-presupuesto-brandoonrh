import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNUevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    );
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect( () => {
      if( Object.keys(gastoEditar).length > 0 ){
        setModal(true)
        setTimeout(() => {
          setAnimarModal(true)
        }, 800);
      }
  }, [ gastoEditar ])

  useEffect(()=> {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []); 
  }, [gastos])

  useEffect(() => {
    if(filtro){
      //Actualizar el listado 
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados); 

    }
  },[filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
       }
  }, [])


  const handleModal = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 800);
  }

const guardarGasto = gasto => {
  if(gasto.id){
    //Actualizar Gasto
    const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState ); 
    setGastos(gastosActualizados)
    setGastoEditar({})
  }else{
    //Guardar NUevo Gasto 
    gasto.id = generarId(); 
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Gasto Agregado',
      showConfirmButton: false,
      timer: 2000
    })
  }
  
  setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
  }, 800);
}

const eliminandoGasto = id => {
  const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
  setGastos(gastosActualizados)
}

  return (
      <div className={modal ? 'fijar' : ''}>
          <Header
           gastos={gastos}
           setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            isValidPresupuesto={isValidPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />

          {isValidPresupuesto && (
            <>
                <main>
                  <Filtros
                    filtro={filtro}
                    setFiltro={setFiltro}
                  />
                  <ListadoGastos
                    gastos={gastos}
                    setGastoEditar={setGastoEditar}
                    eliminandoGasto={eliminandoGasto}
                    filtro={filtro}
                    gastosFiltrados={gastosFiltrados}
                  />
                </main>
                <div className='nuevo-gasto'>
                  <img src={IconoNUevoGasto} alt="Icono NUevo Gasto" onClick={handleModal} />
                </div>
            </>
          )}

          {modal && (
            <Modal 
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
            />
          )}

      </div>
  )
}

export default App
