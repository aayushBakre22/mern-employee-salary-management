// DataOvertime = overtime records for employees
// tanggal = date
// jam_lembur = overtime hours
// alasan = reason for overtime
// id_pegawai = employee ID (UUID from DataPegawai)

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import DataPegawai from "./DataPegawaiModel.js";

const { DataTypes } = Sequelize;

const DataOvertime = db.define(
  "data_overtime",
  {
    id_overtime: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jam_lembur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 6,
      },
    },
    alasan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 255],
      },
    },
    id_pegawai: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true },
);

export default DataOvertime;
