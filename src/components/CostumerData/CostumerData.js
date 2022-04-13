import React, { useState, useEffect } from 'react';
import './CostumerData.css';
import { Rdb } from '../../services/firebase';
import { ref, onValue} from "firebase/database";
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  CategoryScale, LinearScale, BarElement, Title, } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement,);


const CostumerData = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [generalCESData, setGeneralCESData] = useState();
  const [generalNPSData, setGeneralNPSData] = useState();
  const [generalCSATData, setGeneralCSATData] = useState();

  let cesValues = [];
  let npsValues = [];
  let csatValues = [];


  const csCountRef = ref(Rdb, 'costumer-score/');
  let oneCountCES = 0
  let twoCountCES = 0
  let threeCountCES = 0
  let fourCountCES = 0
  let fiveCountCES = 0
  let sixCountCES = 0
  let sevenCountCES = 0
  
  useEffect(() => {
    onValue(csCountRef, (snapshot) => {
      const data = snapshot.val();
      
      Object.keys(data.CES).forEach(key => {
        console.log(`key: ${key}, value: ${data.CES[key].valueCES}`)
        cesValues.push(data.CES[key].valueCES);
        console.log('rodou 1')
      })
      Object.keys(data.NPS).forEach(key => {
        console.log(`key: ${key}, value: ${data.NPS[key].valueNPS}`)
        npsValues.push(data.NPS[key].valueNPS);
        console.log('rodou 2')
      })
  
      Object.keys(data.CSAT).forEach(key => {
        console.log(`key: ${key}, value: ${data.CSAT[key].valueCSAT}`)
        csatValues.push(data.CSAT[key].valueCSAT);
        console.log('rodou 3')
      })
  
      setIsLoading(false);

      

  
  
    });

      oneCountCSAT = CSATValue.filter(value => value === 1);
      twoCountCSAT = CSATValue.filter(value => value === 2);
      threeCountCSAT = CSATValue.filter(value => value === 3);
      fourCountCSAT = CSATValue.filter(value => value === 4);
      fiveCountCSAT = CSATValue.filter(value => value === 5);

    console.log( cesValues,
      npsValues,
     csatValues)
  
  },[csCountRef])

  
  

  const NPSValue = [8, 4, 7, 8, 9, 8, 10, 8, 9, 10, 8, 9, 10 , 8 , 9, 10, 10 ,9, 7, 8, 9];
  const CESValue = [6, 7, 5, 6, 4, 3, 2, 5, 6, 7, 7, 6, 7, 6, 7, 5, 3, 1, 5, 6, 7];
  const CSATValue = [4, 5, 3, 4, 5, 3, 4, 4, 4, 5, 5, 2, 2, 1, 4, 4, 5, 4, 3, 3, 4];
  
  // NPS variables
  let promot = 0;
  let detrat = 0;
  let neutr = 0;

  //CES variables
 

  // Sum values CES - CSAT
  let somaCES = 0;
  let somaCSAT = 0;

  for(var i = 0; i < CESValue.length; i++) {
    somaCES += CESValue[i];
    somaCSAT += CSATValue[i];
}

let mediaCES = somaCES / CESValue.length;

// CSAT Variables
  let oneCountCSAT = CSATValue.filter(value => value === 1);
  let twoCountCSAT = CSATValue.filter(value => value === 2);
  let threeCountCSAT = CSATValue.filter(value => value === 3);
  let fourCountCSAT = CSATValue.filter(value => value === 4);
  let fiveCountCSAT = CSATValue.filter(value => value === 5);
  

const mediaCSAT = somaCSAT / CSATValue.length;

  

  NPSValue.forEach((val) => {
    if(val >= 0 && val <= 6) {
      detrat++;
    } else if(val >= 7 && val <= 8) {
      neutr++;
    }
    else if(val >= 9 && val <= 10){
      promot++;
    }
  })

  const porcentagemDetrat = (detrat / NPSValue.length) * 100;
  const porcentagemPromot = (promot / NPSValue.length) * 100;
  const NPSScore = porcentagemPromot - porcentagemDetrat;


  const NPSdata = {
    labels: ['Promotores (9 - 10) ', 'Neutros (7 - 8) ', 'Detratores (0 - 6) ' ],
    datasets: [
      {
        label: 'NPS - Clientes',
        data: [promot, neutr, detrat],
        backgroundColor: [
          '#8DE4A2',
          '#FEF6A7',
          '#E4968D',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
        
      },
      
    ],
    
  };

  const CESlabels = [ '1 (Pouco Esforço)', '2', '3', '4', '5', '6', '7 (Muito Esforço)' ]

  const CESdata = {
  labels: CESlabels,
  datasets: [
    {
      label: 'CES - Dados',
      data: [oneCountCES.length, twoCountCES.length, threeCountCES.length, fourCountCES.length, fiveCountCES.length, sixCountCES.length, sevenCountCES.length],
      backgroundColor: [
        '#84FF84',
        '#ADFF84',
        '#EEFF84',
        '#FFDF84',
        '#FFC084',
        '#FF8888',
        '#AB4343',
        
      ],
      borderColor: [

        'rgba(87, 254, 87, 1)',
        'rgba(140, 255, 82, 1)',
        'rgba(232, 255, 86, 1)',
        'rgba(255, 206, 67, 1)',
        'rgba(255, 148, 46, 1)',
        'rgba(255, 65, 65, 1)',
        'rgba(161, 34, 34, 1)',
      ],
      borderWidth: 1,
    }
  ],
  }

  const CESoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },

    
  };

  const CSATdata = {
    labels: ['1 (Muito Insatisfeito) ', '2 (Pouco Insatisfeito)', '3 (Neutro)', '4 (Pouco Satisfeito)', '5 (Muito Satisfeito)'],
    datasets: [
      {
        label: 'CSAT - Clientes',
        data: [oneCountCSAT.length, twoCountCSAT.length, threeCountCSAT.length, fourCountCSAT.length, fiveCountCSAT.length],
        backgroundColor: [
          '#AB4343',
          '#FF8888',
          '#FFC084',
          '#96D279',
          '#84FF84',
        ],
        borderColor: [
          'rgba(161, 34, 34, 1)',
          'rgba(255, 65, 65, 1)',
          'rgba(255, 148, 46, 1)',
          'rgba(108, 178, 74, 1)',
          'rgba(87, 254, 87, 1)',
        ],
        borderWidth: 1,
        
      },
      
    ],
  };

  if(isLoading === true) {
    return (
      <div>Loading...</div>
      )
  }
  
  return (
    <div className="costumer-data-container">
      <div className="cd-title" ><h3>Dados dos clientes em relação ao produto</h3></div>

      <div className="charts">
        
      <div className="pie-chart">
        <h3>NPS - Clientes</h3>
        <Pie data={NPSdata} />
        <div className="nps-info">
          <h3>Total de avaliações: {NPSValue.length}</h3>
          <h3>Seu NPS Score é: {NPSScore.toFixed(2)}%</h3>
          <div className="tabela-nps">
            <h3>Tabela NPS:</h3>
            <h3 className="porcentagens-nps" >
            NPS Excelente – entre 75% e 100%
            NPS Muito bom – entre 50% e 74%
            NPS Razoável – entre 0% e 49%
            NPS Ruim – entre -100% e -1%
            </h3>
          </div>
        </div>
      </div>

      <div className="bar-chart">
        <h3>CES - Clientes</h3>
        <Bar data={CESdata} options={CESoptions} />
        <h3>A média CES é: {mediaCES.toFixed(2)} </h3>
      </div>

      <div className="doug-chart">
        <h3>CSAT - Clientes</h3>
        <Doughnut data={CSATdata}/>
        <h3>A média CSAT é: {mediaCSAT.toFixed(2)} </h3>
      </div>

      </div>

      
    </div>
  )
}

export default CostumerData