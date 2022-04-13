import React, { useState, useEffect } from 'react';
import './CostumerData.css';
import { Rdb } from '../../services/firebase';
import { ref, onValue} from "firebase/database";
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  CategoryScale, LinearScale, BarElement, Title, } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement,);


const CostumerData = () => {

  const [isLoadingCostumerData, setIsLoadingCostumerData] = useState(true);

  const [generalCESData, setGeneralCESData] = useState();
  const [generalNPSData, setGeneralNPSData] = useState();
  const [generalCSATData, setGeneralCSATData] = useState();


  const csCountRef = ref(Rdb, 'costumer-score/');

  
  useEffect(() => {
    onValue(csCountRef, (snapshot) => {
      const cesValues = [];
      const npsValues = [];
      const csatValues = [];
      const data = snapshot.val();
      
      Object.keys(data.CES).forEach(key => {
        cesValues.push(data.CES[key].valueCES);
      })
      Object.keys(data.NPS).forEach(key => {
        npsValues.push(data.NPS[key].valueNPS);
      })
  
      Object.keys(data.CSAT).forEach(key => {
        csatValues.push(data.CSAT[key].valueCSAT);
      })


      //CES variables
      const oneCountCES = cesValues.filter(value => value === 1)
      const twoCountCES = cesValues.filter(value => value === 2)
      const threeCountCES = cesValues.filter(value => value === 3)
      const fourCountCES = cesValues.filter(value => value === 4)
      const fiveCountCES = cesValues.filter(value => value === 5)
      const sixCountCES = cesValues.filter(value => value === 6)
      const sevenCountCES = cesValues.filter(value => value === 7)

      // NPS 
      let detrat = 0;
      let neutr = 0;
      let promot = 0;
      

      npsValues.forEach((val) => {
        if(val >= 0 && val <= 6) {
          detrat++;
        } else if(val >= 7 && val <= 8) {
          neutr++;
        }
        else if(val >= 9 && val <= 10){
          promot++;
        }
      })

       const porcentagemDetrat = (detrat / npsValues.length) * 100;
       const porcentagemPromot = (promot / npsValues.length) * 100;
       const NPSScore = porcentagemPromot - porcentagemDetrat;

      // Sum values CES - CSAT
      let somaCES = 0;
      let somaCSAT = 0;

  for(var i = 0; i < cesValues.length; i++) {
    somaCES += cesValues[i];
    somaCSAT += cesValues[i];
}
  const mediaCES = somaCES / cesValues.length;

  // CSAT Variables
   const oneCountCSAT = cesValues.filter(value => value === 1);
   const twoCountCSAT = cesValues.filter(value => value === 2);
   const threeCountCSAT = cesValues.filter(value => value === 3);
   const fourCountCSAT = cesValues.filter(value => value === 4);
   const fiveCountCSAT = cesValues.filter(value => value === 5);

   const mediaCSAT = somaCSAT / csatValues.length;
  
      
      setGeneralCESData({
        oneCountCES,
        twoCountCES,
        threeCountCES,
        fourCountCES,
        fiveCountCES,
        sixCountCES,
        sevenCountCES,
        mediaCES,
        cesValues
      })

      setGeneralCSATData({
        oneCountCSAT,
        twoCountCSAT,
        threeCountCSAT,
        fourCountCSAT,
        fiveCountCSAT,
        mediaCSAT,
        csatValues
      })

      setGeneralNPSData({
        promot,
        neutr,
        detrat,
        porcentagemDetrat,
        porcentagemPromot,
        NPSScore,
        npsValues
      })


      setIsLoadingCostumerData(false);

      

  
  
    });

    
  
  },[])

  if(isLoadingCostumerData === true) {
    return (
      <div>Loading...</div>
      )
  }

  else if(isLoadingCostumerData === false && (generalCESData && generalCSATData && generalNPSData)) {
    const NPSdata = {
      labels: ['Promotores (9 - 10) ', 'Neutros (7 - 8) ', 'Detratores (0 - 6) ' ],
      datasets: [
        {
          label: 'NPS - Clientes',
          data: [generalNPSData.promot, generalNPSData.neutr, generalNPSData.detrat],
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
        data: [generalCESData.oneCountCES.length, generalCESData.twoCountCES.length, generalCESData.threeCountCES.length, generalCESData.fourCountCES.length, generalCESData.fiveCountCES.length, generalCESData.sixCountCES.length, generalCESData.sevenCountCES.length],
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
          data: [generalCSATData.oneCountCSAT.length, generalCSATData.twoCountCSAT.length, generalCSATData.threeCountCSAT.length, generalCSATData.fourCountCSAT.length, generalCSATData.fiveCountCSAT.length],
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
    return (
      <div className="costumer-data-container">
        <div className="cd-title" ><h3>Dados dos clientes em relação ao produto</h3></div>
  
        <div className="charts">
          
        <div className="pie-chart">
          <h3>NPS - Clientes</h3>
          <Pie data={NPSdata} />
          <div className="nps-info">
            <h3>Total de avaliações: {generalNPSData.npsValues.length}</h3>
            <h3>Seu NPS Score é: {generalNPSData.NPSScore.toFixed(2)}%</h3>
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
          <h3>A média CES é: {generalCESData.mediaCES.toFixed(2)} </h3>
        </div>
  
        <div className="doug-chart">
          <h3>CSAT - Clientes</h3>
          <Doughnut data={CSATdata}/>
          <h3>A média CSAT é: {generalCSATData.mediaCSAT.toFixed(2)} </h3>
        </div>
  
        </div>
  
        
      </div>
    )
  }
  
  
}

export default CostumerData