import React, { useState } from 'react';
import axios from 'axios';

function Testing() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john.doe@example.com');
    formData.append('file', file);
    axios.post('/fileUpload', formData,{
    headers: {
        'Content-Type': 'multipart/form-data'
      }}).then((response) => {
      console.log(response.data);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        console.log("finished");
    });
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={handleFileChange} />
            <input value={name} name='name' onChange={(e) => setName(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default Testing;
