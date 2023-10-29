import React, { useState } from "react";
import "./styles.module.css";
import "./style.module.css";
function Invoice() {
  const [rows, setRows] = useState([
    {
      id: 1,
      qty: 0,
      rate: 0,
      amt: 0,
    },
  ]);
  const [total, setTotal] = useState(0);
  const [gst, setGST] = useState(0);
  const [net, setNet] = useState(0);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      qty: 0,
      rate: 0,
      amt: 0,
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    recalculateTotal(updatedRows);
  };

  const handleCalc = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          [field]: value,
          amt: value * row.rate,
        };
      }
      return row;
    });
    setRows(updatedRows);
    recalculateTotal(updatedRows);
  };

  const recalculateTotal = (rows) => {
    let sum = 0;
    rows.forEach((row) => {
      sum += row.amt;
    });
    setTotal(sum);
    setNet(sum + parseFloat(gst));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header text-center">
          <h4>INVOICE</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <div className="input-group mb-3">
                <span className="input-group-text">Customer</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Customer"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Address</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">City</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="input-group mb-3">
                <span className="input-group-text">Inv. No</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Inv. No"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Inv. Date</span>
                <input type="date" className="form-control" />
              </div>
            </div>
          </div>

          <table className="table table-bordered">
            <thead className="table-success">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Particular</th>
                <th scope="col" className="text-end">
                  Qty
                </th>
                <th scope="col" className="text-end">
                  Rate
                </th>
                <th scope="col" className="text-end">
                  Amount
                </th>
                <th scope="col" className="NoPrint">
                  <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={handleAddRow}
                  >
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody id="TBody">
              {rows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.id}</th>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control text-end"
                      onChange={(e) =>
                        handleCalc(row.id, "qty", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control text-end"
                      onChange={(e) =>
                        handleCalc(row.id, "rate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control text-end"
                      value={row.amt}
                      disabled
                    />
                  </td>
                  <td className="NoPrint">
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteRow(row.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <div className="col-8">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
            <div className="col-4">
              <div className="input-group mb-3">
                <span className="input-group-text">Total</span>
                <input
                  type="number"
                  className="form-control text-end"
                  id="FTotal"
                  name="FTotal"
                  value={total}
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">GST</span>
                <input
                  type="number"
                  className="form-control text-end"
                  id="FGST"
                  name="FGST"
                  onChange={(e) => setGST(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Net Amt</span>
                <input
                  type="number"
                  className="form-control text-end"
                  id="FNet"
                  name="FNet"
                  value={net}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
