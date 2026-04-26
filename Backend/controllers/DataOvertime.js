// tanggal = date
// jam_lembur = overtime hours
// alasan = reason for overtime
// id_pegawai = employee ID (UUID from DataPegawai)

import DataOvertime from "../models/DataOvertimeModel.js";
import DataPegawai from "../models/DataPegawaiModel.js";
import { Op } from "sequelize";

// Create Overtime Entry
export const createOvertime = async (req, res) => {
  const { tanggal, jam_lembur, alasan, id_pegawai } = req.body;

  // 1. Required fields validation
  if (!tanggal || !jam_lembur || !alasan || !id_pegawai) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // 2. Overtime hours validation (1–6)
  if (jam_lembur < 1 || jam_lembur > 6) {
    return res
      .status(400)
      .json({ msg: "Overtime hours must be between 1 and 6" });
  }

  // 3. Date validation
  const inputDate = new Date(tanggal);
  const today = new Date();

  // remove time part for accurate comparison
  today.setHours(0, 0, 0, 0);

  const pastLimit = new Date();
  pastLimit.setDate(today.getDate() - 7);

  if (inputDate > today) {
    return res.status(400).json({ msg: "Date cannot be in the future" });
  }

  if (inputDate < pastLimit) {
    return res
      .status(400)
      .json({ msg: "Date cannot be more than 7 days in the past" });
  }

  // 4. Reason validation
  if (alasan.length < 10) {
    return res
      .status(400)
      .json({ msg: "Reason must be at least 10 characters" });
  }

  try {
    // 5. Check if employee exists
    const employee = await DataPegawai.findOne({
      where: { id_pegawai },
    });

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    // 6. Duplicate check (same employee + same date)
    const existing = await DataOvertime.findOne({
      where: {
        id_pegawai,
        tanggal: inputDate,
      },
    });

    if (existing) {
      return res
        .status(400)
        .json({ msg: "Overtime entry already exists for this date" });
    }

    // 7. Monthly total overtime check
    const startOfMonth = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth() + 1,
      0,
    );

    const monthlyOvertime = await DataOvertime.findAll({
      where: {
        id_pegawai,
        tanggal: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    const totalHours = monthlyOvertime.reduce((sum, entry) => {
      return sum + entry.jam_lembur;
    }, 0);

    if (totalHours + Number(jam_lembur) > 60) {
      return res
        .status(400)
        .json({ msg: "Monthly overtime cannot exceed 60 hours" });
    }

    // 8. Create overtime record
    await DataOvertime.create({
      tanggal: inputDate,
      jam_lembur,
      alasan,
      id_pegawai,
    });

    // 9. Success response
    res.status(201).json({ msg: "Overtime entry created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getOvertime = async (req, res) => {
  try {
    const data = await DataOvertime.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
