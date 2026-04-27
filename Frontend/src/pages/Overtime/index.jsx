import { useEffect, useState } from "react";
import axios from "axios";

const Overtime = () => {
  const [tanggal, setTanggal] = useState("");
  const [jamLembur, setJamLembur] = useState("");
  const [alasan, setAlasan] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [employees, setEmployees] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // fetch employee list
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/data_employee");
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load employees");
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // basic validation
    if (!tanggal || !jamLembur || !alasan || !selectedEmployee) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/overtime", {
        tanggal,
        jam_lembur: Number(jamLembur),
        alasan,
        id_pegawai: selectedEmployee,
      });

      setSuccess(res.data.msg);

      // reset form
      setTanggal("");
      setJamLembur("");
      setAlasan("");
      setSelectedEmployee("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "white",
          padding: "24px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Overtime Entry
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <div>
            <label htmlFor="employeeList">Employee</label>
            <select
              value={selectedEmployee}
              id="employeeList"
              onChange={(e) => setSelectedEmployee(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id_pegawai} value={emp.id_pegawai}>
                  {emp.nama_pegawai}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              value={tanggal}
              id="date"
              onChange={(e) => setTanggal(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </div>

          <div>
            <label htmlFor="overtimeHours">Overtime Hours</label>
            <input
              type="number"
              value={jamLembur}
              id="overtimeHours"
              onChange={(e) => setJamLembur(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </div>

          <div>
            <label htmlFor="reason">Reason</label>
            <textarea
              value={alasan}
              id="reason"
              onChange={(e) => setAlasan(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        </form>

        {error && (
          <p
            style={{
              marginTop: "10px",
              color: "#dc2626",
              background: "#fee2e2",
              padding: "8px",
              borderRadius: "6px",
            }}
          >
            {error}
          </p>
        )}

        {success && (
          <p
            style={{
              marginTop: "10px",
              color: "#16a34a",
              background: "#dcfce7",
              padding: "8px",
              borderRadius: "6px",
            }}
          >
            {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default Overtime;
