const express = require("express");
const { matchedData } = require("express-validator");
const router = express.Router();
const mysql = require("mysql");
const conection = require("../connection");
const { handleHttpError } = require('../utils/handleError')
const { Logs} = require("../models/models");
const { Op } = require("sequelize");

require("dotenv").config();
db = conection;



const getLogs = async (req, res) => {
    try {
        var data = "";
        //encuentra todos los esquipos
        data = await Logs.findAll();

        res.send(data);
    } catch (err) {
        console.log(err); //Opcional
        //handleHttpError(res, 'ERROR_GET_ITEMS', 404)
        handleHttpError(res, "ERROR_GET_LOGS"); 
    }
}

module.exports = {
    getLogs
  };