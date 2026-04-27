import { useState } from "react";
import axios from "axios";

const Overtime = () => {
  const [tanggal, setTanggal] = useState("");
  const [jamLembur, setJamLembur] = useState("");
  const [alasan, setAlasan] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // basic frontend validation
    if (!tanggal || !jamLembur || !alasan) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/overtime", {
        tanggal,
        jam_lembur: Number(jamLembur),
        alasan,
        id_pegawai: "test-user"
      });

      setSuccess(res.data.msg);

      // reset form
      setTanggal("");
      setJamLembur("");
      setAlasan("");

    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Overtime Entry</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>

        <div>
          <label>Overtime Hours:</label>
          <input
            type="number"
            value={jamLembur}
            onChange={(e) => setJamLembur(e.target.value)}
          />
        </div>

        <div>
          <label>Reason:</label>
          <textarea
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Overtime;