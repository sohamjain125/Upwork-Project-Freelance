import React, { useState } from 'react';

function YourComponent() {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows([...rows, { qty: '', rate: '', amt: 0 }]);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const calculate = (index) => {
    const updatedRows = [...rows];
    const qty = updatedRows[index].qty;
    const rate = updatedRows[index].rate;
    const amt = qty * rate;
    updatedRows[index].amt = amt;
    setRows(updatedRows);
  };

  const calculateTotal = () => {
    let total = 0;
    let gst = 0;

    rows.forEach((row) => {
      total += row.amt;
    });

    const net = total + gst;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>
                  <input
                    type="number"
                    name="qty"
                    value={row.qty}
                    onChange={(e) => calculate(index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="rate"
                    value={row.rate}
                    onChange={(e) => calculate(index)}
                  />
                </td>
                <td>{row.amt}</td>
                <td>
                  <button onClick={() => deleteRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow}>Add</button>
        <div>
          <p>Total: {total}</p>
          <p>GST: {gst}</p>
          <p>Net: {net}</p>
        </div>
      </div>
    );
  };

  return <div>{calculateTotal()}</div>;
}

export default YourComponent;
