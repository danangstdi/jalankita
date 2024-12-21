import { useState, useEffect } from "react";

const RegenciesSelector = ({ provinceCode, onChange }) => {
  const [regencies, setRegencies] = useState([]);

  useEffect(() => {
    if (!provinceCode) return;
    fetch(`https://api.cahyadsn.com/regencies/${provinceCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setRegencies(data.data);
        }
      })
      .catch(err => console.log(err));
  }, [provinceCode]);

  return (
    <select
      required 
      onChange={e => onChange(e.target.value)}
      className='p-3 border border-gray-400 bg-transparent'
    >
      <option value="">== Kota/Kabupaten ==</option>
      {regencies.map(regency => (
        <option key={regency.kode} value={regency.kode}>
          {regency.nama}
        </option>
      ))}
    </select>
  );
};

export default RegenciesSelector;
