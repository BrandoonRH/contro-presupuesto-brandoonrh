import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, eliminandoGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
       
        
        {
          filtro ? (
           <>
              <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay Gastos Aún'}</h2>
              {
              gastosFiltrados.map(gasto => (
                <Gasto
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminandoGasto={eliminandoGasto}
                />
                ))
              }
           </>
          ) : (
              <>
               <h2>{gastos.length ? 'Gastos' : 'No hay Gastos Aún'}</h2>
              {
                 gastos.map(gasto => (
                  <Gasto
                      key={gasto.id}
                      gasto={gasto}
                      setGastoEditar={setGastoEditar}
                      eliminandoGasto={eliminandoGasto}
                  />
              ))
              }
              </>
          )
        }

    </div>
  )
}

export default ListadoGastos