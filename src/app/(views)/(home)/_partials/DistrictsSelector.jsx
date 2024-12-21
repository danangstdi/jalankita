import { useState, useEffect } from "react";

const DistrictsSelector = ({ regencyCode, onChange }) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (!regencyCode) return;
    fetch(`https://api.cahyadsn.com/districts/${regencyCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setDistricts(data.data);
        }
      })
      .catch(err => console.log(err));
  }, [regencyCode]);

  return (
    <select
      required 
      onChange={e => onChange(e.target.value)}
      className='p-3 border border-gray-400 bg-transparent'
    >
      <option value="">== Kecamatan ==</option>
      {districts.map(district => (
        <option key={district.kode} value={district.kode}>
          {district.nama}
        </option>
      ))}
    </select>
  );
};

export default DistrictsSelector;
