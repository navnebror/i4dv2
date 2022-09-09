import { useState, useEffect } from "react";
import axios from 'axios';
//import axios from 'axios';



const FormPatients = () => {
    const [patientId, setPatientId] = useState('12345');
    const [patientIdType, setPatientIdType] = useState('');
    const [posts, setPosts] = useState([]);

    
    const [patientData, setPatientData] = useState([]);
    const [patientDataHistory, setPatientDataHistory] = useState([]);

    const tableRows = patientData.map((info) => {
        return (
          <tr>
            <td>{info.id_type}</td>
            <td>{info.id}</td>
            <td>{info.first_name}</td>
            <td>{info.last_name}</td>
            <td>{info.birth_date}</td>
          </tr>
        );
      });
    
    const tableRowsHistory = patientDataHistory.map((info) => {
        return (
          <tr>
            <td>{info.topic_id}</td>
            <td>{info.level_date}</td>
            <td>{info.level_value}</td>
          </tr>
        );
      });

    //const uri = 'http://localhost/i4d/index.php/v1/patients/id/';
    const uri = 'http://ec2-54-242-87-88.compute-1.amazonaws.com/i4d/index.php/v1/patients/id/';

    const uri2 = 'http://ec2-54-242-87-88.compute-1.amazonaws.com/i4d/index.php/v1/patients/id/';
    
    const clearTables = () => {
        setPatientData([]);
        setPatientDataHistory([]);
    }

    const getPatientInfoById = async (e) => {
        e.preventDefault();
        //var url = uri+patientId+'/type/'+patientIdType;
        var url = uri+patientId;
        var url2 = uri2+patientId+'/history'

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
            setPatientData(response.data)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });

          axios.get(url2, {
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
            setPatientDataHistory(response.data)
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
        <form id="patients_form" onSubmit={getPatientInfoById}>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}><h2>Consultar información por paciente</h2></td>
                    </tr>

                    <tr>
{/*                         <td><label>Tipo de identicación </label></td>
                        <td>
                            <select id="patientIdType" name="patientIdType">
                                <option value={"CC"}>Cédula de ciudadania</option>
                                <option value={"CE"}>Cédula de extranjería</option>
                                <option value={"PP"}>Pasaporte</option>
                                <option value={"TI"}>Tarjeta de identidad</option>
                            </select>
                        </td> */}
                    </tr>
                    <tr>
                        <td><label>Número de identicación </label></td>
                        <td><input
                            id="patientId"
                            name="patientId"
                            type={"number"}
                            //defaultValue={12345}
                            onChange={event => setPatientId(event.target.value)}
                            value={patientId}/></td>
                    </tr>

                    <tr>
                        <td><input type="submit" value="Consultar"/></td>
                        <td><input type="button" value="Limpiar" onClick={clearTables}></input></td>
                    </tr>
                </tbody>
            </table>

            <br />


            {tableRows.length > 0 && 
                <div>
                  <p><h3>Información del paciente</h3></p>
                  <table className="table table-stripped" border={1}>
                    <thead>
                      <tr>
                        <th>Tipo ID</th>
                        <th>ID</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha de nacimiento</th>
                      </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                  </table>
                </div>
            }

            {tableRowsHistory.length > 0 && 
                <div>
                  <p><h3>Historia de hemogramas</h3></p>
                  <table className="table table-stripped" border={1}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>{tableRowsHistory}</tbody>
                  </table>
                </div>
            }
        </form>
        </>
    )
}

export default FormPatients;