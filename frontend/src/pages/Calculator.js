import { useState } from "react";
import { Chart as chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./styles/Calculator.css";
import Navbar from "../components/Navbar";

chart.register(ArcElement, Tooltip, Legend);

const Calculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [rateOfInterest, setRateOfInterest] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [emi, setEmi] = useState(0);

  function calculateEMI(principal, rateOfInterest, tenure) {
    let r = rateOfInterest / (12 * 100);
    let n = 12 * tenure;
    let emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi;
  }

  let emiVal = calculateEMI(principal, rateOfInterest, tenure);

  const data = {
    labels: ["Principal Amount", "Interest Amount"],
    datasets: [
      {
        data: [principal, emiVal * 12 * tenure - principal],
        backgroundColor: ["#905E96", "#FF8FB1"],
        borderColor: ["#905E96", "#FF8FB1"],
      },
    ],
  };

  function handleSubmit(event) {
    event.preventDefault();
    setEmi(calculateEMI(principal, rateOfInterest, tenure));
  }

  return (
    <>
      <Navbar />
      <div className="calculatorHead">
        <center className="animate__animated animate__fadeInDown animate__slow">
          Home Loan EMI Calculator
        </center>
      </div>

      <div className="parent">
        <div className="child">
          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td>
                  <label htmlFor="principal">Principal Amount:</label>
                </td>
                <td>
                  <input
                    type="range"
                    min="100000"
                    max="100000000"
                    className="slider"
                    value={principal}
                    onChange={(event) => setPrincipal(event.target.value)}
                  />
                </td>
                <td>&#8377; {principal}</td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="rateOfInterest">
                    Rate of Interest (per annum):
                  </label>
                </td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.01"
                    className="slider"
                    value={rateOfInterest}
                    onChange={(event) => setRateOfInterest(event.target.value)}
                  />
                </td>
                <td>{rateOfInterest} %</td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="tenure">Tenure (in years):</label>
                </td>
                <td>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    className="slider"
                    value={tenure}
                    onChange={(event) => setTenure(event.target.value)}
                  />
                </td>
                <td>{tenure} yrs</td>
              </tr>
              <tr>
                <td>
                  <button type="submit" className="res-btn">
                    Calculate EMI
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <hr />
                  <h2 className="emival">
                    EMI is: <span>&#8377;&nbsp;{parseInt(emi)}</span>
                  </h2>
                </td>
              </tr>
            </table>
          </form>
        </div>
        <div className="child">
          <div className="chart">
            <Doughnut data={data}></Doughnut>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
