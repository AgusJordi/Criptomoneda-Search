import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;

`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;


function App() {


  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    //evitamos la ejeicion la primera vez
    const cotizarCriptomoneda = async () => {
      if(moneda === '') return;

      //consultar la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
      
      const resultado = await axios.get(url);

      //mostrar el spinner
      setCargando(true);

      //ocultar spinner y mostrar el resultado
      setTimeout(() => {

        //cambiar el estado de cargando
        setCargando(false);

        //guardar cotizacion
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000)
  
     
    }
    cotizarCriptomoneda()

  }, [moneda, criptomoneda])

  //mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> :  <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="Imagen Crypto"
        />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario
        setMoneda={setMoneda}
        setCriptomoneda={setCriptomoneda}
        />
      {componente}
       
      </div>
    </Contenedor>
  );
}

export default App;
