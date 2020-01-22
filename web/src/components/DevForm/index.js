import React, { useState, useEffect } from "react";
import "./style.css";

function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github_user, setGithub_user] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 3000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_user,
      techs,
      latitude,
      longitude
    });
    setGithub_user("");
    setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_user">Usuário do Github</label>
        <input
          name="github_user"
          id="github_user"
          value={github_user}
          required
          onChange={e => setGithub_user(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          value={techs}
          required
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-block">
        <div className="input-group">
          <label htmlFor="">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            required
            onChange={e => setLatitude(e.target.value)}
          />

          <label htmlFor="">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            required
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
