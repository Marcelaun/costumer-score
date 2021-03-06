import React, { useEffect } from 'react';
import { useState } from 'react';
import './CsForm.css';
import MuitoSatisfeito from '../../assets/Muito satisfeito.svg';
import PoucoSatisfeito from '../../assets/Pouco satisfeito.svg';
import Neutro from '../../assets/Neutro.svg';
import PoucoInsatisfeito from '../../assets/Pouco insatisfeito.svg';
import MuitoInsatisfeito from '../../assets/Muito insatisfeito.svg';

import { db, Rdb } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { set, ref, push } from "firebase/database";



const CsForm = () => {



  const [valueNPS, setValueNPS] = useState();
  const [valueCES, setValueCES] = useState();
  const [valueCSAT, setValueCSAT] = useState();
  const [npsClientStatus, setNpsClientStatus] = useState();

  const costumerDataCollectionRef = collection(db, "costumer_score_data");

  const costumerScoreRefNPS = ref(Rdb, 'costumer-score/NPS');
  const costumerScoreRefCES = ref(Rdb, 'costumer-score/CES');
  const costumerScoreRefCSAT = ref(Rdb, 'costumer-score/CSAT');


  const createCostumerData = async () => {

   
    const newNPSRef = push(costumerScoreRefNPS);
    const newCESRef = push(costumerScoreRefCES);
    const newCSATRef = push(costumerScoreRefCSAT);
    set(newNPSRef, {
      valueNPS
    })

    set(newCESRef, {
      valueCES
    })

    set(newCSATRef, {
      valueCSAT
    })
    

    await addDoc(costumerDataCollectionRef, { nps: valueNPS, nps_client_status: npsClientStatus, ces: valueCES, csat: valueCSAT });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    window.alert(`VALORES INSERIDOS: NPS(1° questão): ${valueNPS}, CES(2° questão): ${valueCES}, CSAT(3° questão):${valueCSAT}`);
    createCostumerData();
  }

  useEffect(() => {
    if(valueNPS >= 0 && valueNPS <= 6) {
      setNpsClientStatus('cliente_detrator');
      console.log('cliente detrator')
    } else if(valueNPS >= 7 && valueNPS <= 8) {
      setNpsClientStatus('cliente_neutro');
      console.log('cliente neutro')
    }
    else if(valueNPS >= 9 && valueNPS <= 10){
      setNpsClientStatus('cliente_promotor');
      console.log('cliente promotor')
    }
  },[valueNPS])
  
  

  return (

  <div className="main-container">
    <form className="cs-form" onSubmit={handleSubmit}>
    <section className="nps-score">
        <h1>1.Em uma escala de 0 a 10 quanto você indicaria nosso produto para outras pessoas?</h1>
        <div className="row-fluid-nps">
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="1" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>1</span>
            </label>
          </div>
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="2" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>2</span>
            </label>
          </div>
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="3" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>3</span>
            </label>
          </div>
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="4" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>4</span>
            </label>
          </div>
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="5" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>5</span>
            </label>
          </div>
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="6" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>6</span>
            </label>
          </div>
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="7" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>7</span>
            </label>
          </div>
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="8" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>8</span>
            </label>
          </div>
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="9" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>9</span>
            </label>
          </div>
          <div className="radio-nps">
            <label>
              <input type="radio" name="option-nps" value="10" onChange={(e) => { setValueNPS(Number(e.target.value)) }}/>
              <span>10</span>
            </label>
          </div>
        </div>
      </section>
  
      <section className="ces-score">
        <h1>2.De 1&#40;Nenhum esforço&#41; a 7&#40;Muito esforço&#41; o quanto você se esforçou para conseguir o produto?</h1>
        <div className="row-fluid-ces">
          <div className="radio">
            <label id="option-1">
              <input type="radio" name="option-ces" value="1" onChange={(e) => {setValueCES(Number(e.target.value))}}/>
              <span>1</span>
            </label>
          </div>
          
          <div className="radio">
            <label id="option-2">
              <input type="radio" name="option-ces" value="2" onChange={(e) => {setValueCES(Number(e.target.value))}}/>
              <span>2</span>
            </label>
          </div>
          <div className="radio">
            <label id="option-3">
              <input type="radio" name="option-ces" value="3" onChange={(e) => {setValueCES(Number(e.target.value))}}/>
              <span>3</span>
            </label>
          </div>
          <div className="radio">
            <label id="option-4">
              <input type="radio" name="option-ces" value="4" onChange={(e) => {setValueCES(Number(e.target.value))}}/>
              <span>4</span>
            </label>
          </div>
          <div className="radio">
            <label id="option-5">
              <input type="radio" name="option-ces" value="5" onChange={(e) => {setValueCES(Number(e.target.value))}}/>
              <span>5</span>
            </label>
          </div>
          <div className="radio">
            <label id="option-6">
              <input type="radio" name="option-ces" value="6" onChange={(e) => {setValueCES(Number(e.target.value))}}/>
              <span>6</span>
            </label>
          </div>
          <div className="radio">
            <label id="option-7">
              <input type="radio" name="option-ces" value="7" onChange={(e) => {setValueCES(Number(e.target.value))}}/>
              <span>7</span>
            </label>
          </div>
        </div>
      </section>
  
      <section className="csat-score">
        <h1>3.Qual o seu nível de satisfação em relação ao nosso produto?</h1>
        <div className="row-fluid-csat">
          <div className="radio-csat">
            <label>
              <input type="radio" name="option-csat" value="5" onChange={(e) => {setValueCSAT(Number(e.target.value))}}/>
              <img src={MuitoSatisfeito} alt="Muito satisfeito"/>
              <span> Muito satisfeito</span>
            </label>
          </div>
          <div className="radio-csat">
            <label>
              <input type="radio" name="option-csat" value="4" onChange={(e) => {setValueCSAT(Number(e.target.value))}}/>
              <img src={PoucoSatisfeito} alt="Pouco satisfeito"/>
              <span> Pouco satisfeito</span>
            </label>
          </div>
          <div className="radio-csat">
            <label>
              <input type="radio" name="option-csat" value="3" onChange={(e) => {setValueCSAT(Number(e.target.value))}}/>
              <img src={Neutro} alt="Neutro"/>
              <span> Neutro</span>
            </label>
          </div>
          <div className="radio-csat">
            <label>
              <input type="radio" name="option-csat" value="2" onChange={(e) => {setValueCSAT(Number(e.target.value))}}/>
              <img src={PoucoInsatisfeito} alt="Pouco insatisfeito"/>
              <span> Pouco insatisfeito</span>
            </label>
          </div>
          <div className="radio-csat">
            <label>
              <input type="radio" name="option-csat" value="1" onChange={(e) => {setValueCSAT(Number(e.target.value))}}/>
              <img src={MuitoInsatisfeito} alt="Muito Insatisfeito"/>
              <span>Muito insatisfeito</span>
             </label>
           </div>
         </div>
       </section>
      <input className="submit-btn" id="clickSubmitButton" type="submit" value="Enviar"/>  
    </form>
   
  </div>
  
  )
}

export default CsForm;