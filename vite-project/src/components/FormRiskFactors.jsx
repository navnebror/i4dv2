import { useState } from "react";
import axios from 'axios';

const FormRiskFactors = () => {

    //const [values, setValues] = useState({patient_id_type:"", patient_id:""});
    const [sugarLevel, setSugarLevel] = useState('30');
    const [fatLevel, setFatLevel] = useState('30');
    const [oxygenLevel, setOxygenLevel] = useState('90');

    const [riskFactorData, setRiskFactorData] = useState([]);
    const tableRows = riskFactorData.map((info) => {
        return (
          <tr>
            <td>{info.illness_id}</td>
            <td>{info.description}</td>
            <td>{info.risk_factor}</td>
          </tr>
        );
      });
    

    //const uri = 'http://localhost/i4d/index.php/v1/risk_factors/';
    const uri = 'http://ec2-54-242-87-88.compute-1.amazonaws.com/i4d/index.php/v1/risk_factors/';

    const clearTables = () => {
        setRiskFactorData([]);
    }


    const getRiskFactorByValues = (e) => {
        e.preventDefault();
        var url = uri+"sugar/"+sugarLevel+"/fat/"+fatLevel+"/oxygen/"+oxygenLevel;

        delete axios.defaults.headers.common["Authorization"];

        axios.get(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                //'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': null,
                "Access-Control-Allow-Origin": "true"
            },
            withCredentials: false,
            //credentials: 'same-origin'
        })
        .then(function (response) {
          console.log(response.data);
          setRiskFactorData(response.data)
          //setPatientData(response.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });



    }

    return (
        <>
        <form id="risk_factors_form" onSubmit={getRiskFactorByValues}>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}><h2>Consultar factor de riesgo</h2></td>
                    </tr>

                    <tr>
                        <td><label>Azúcar </label></td>
                        <td><input
                            id="sugarLevel"
                            name="sugarLevel"
                            type={"number"}
                            min={0}
                            max={100}
                            //defaultValue={50}
                            onChange={event => setSugarLevel(event.target.value)}
                            value={sugarLevel}/></td>
                    </tr>
                    <tr>
                        <td><label>Grasa </label></td>
                        <td><input
                            id="fatLevel"
                            name="fatLevel"
                            type={"number"}
                            min={0}
                            max={100}
                            //defaultValue={50}
                            onChange={event => setFatLevel(event.target.value)}
                            value={fatLevel}/></td>
                    </tr>
                    <tr>
                        <td><label>Oxígeno </label></td>
                        <td><input
                            id="oxygenLevel"
                            name="oxygenLevel"
                            type={"number"}
                            min={0}
                            max={100}
                            //defaultValue={50}
                            onChange={event => setOxygenLevel(event.target.value)}
                            value={oxygenLevel}/></td>
                    </tr>

                    <tr>
                    <td><input type="submit" value="Consultar"/></td>
                    <td><input type="button" value="Limpiar" onClick={clearTables}></input></td>
                    </tr>
                </tbody>
            </table>

            {tableRows.length > 0 && 
                <div>
                  <table className="table table-stripped" border={1}>
                    <thead>
                      <tr>
                        <th>ID enfermedad</th>
                        <th>Nombre</th>
                        <th>Factor Riesgo</th>
                      </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                  </table>
                </div>
            }
        </form>
        </>
    )
}

export default FormRiskFactors;