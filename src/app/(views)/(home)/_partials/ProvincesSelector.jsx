import { useState, useEffect } from "react";

const ProvincesSelector = ({ onChange }) => {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetch('https://api.cahyadsn.com/provinces', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setProvinces(data.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <select
      required 
      onChange={e => onChange(e.target.value)}
      className='p-3 border border-gray-400 bg-transparent'
    >
      <option value="">== Provinsi ==</option>
      {provinces.map(province => (
        <option key={province.kode} value={province.kode}>
          {province.nama}
        </option>
      ))}
    </select>
  );
};

export default ProvincesSelector;
