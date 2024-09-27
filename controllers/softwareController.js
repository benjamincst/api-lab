const { response } = require("express");
const Software = require("../models/softwareModel");

const createSoftware = async (req, res = response) => {

    try {
        
        const { nombre, img, descripcion } = req.body

        const response = await Software.findOne({ where: { nombre }, raw: true })
        if(response){
            return res.status(409).json({
                msg: "Ya existe un software con ese nombre."
            })
        }
        await Software.create({
            nombre,
            img,
            descripcion
        })

        return res.status(201).json({
            msg: "Se ha creado el software exitosamente."
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })
        
    }
}

const editSoftware = async (req, res = response) => {

    try {

        const { software_id, nombre, img, descripcion } = req.body
        const response = await Software.findOne({ where: { software_id } })
        if(!response){
            return res.status(404).json({
                msg: "No se ha encontrado el software asociado a la ID."
            })
        }
        const software = await Software.findByPk(software_id)
        software.nombre = nombre
        software.img = img
        software.descripcion = descripcion
        software.save()

        return res.status(200).json({
            msg: "Se ha editado el software correctamente."
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })
        
    }
}

const deleteSoftware = async (req, res = response) => {

    try {

        const { software_id } = req.params
        const response = await Software.findOne({ where: { software_id }, raw: true })
        if(!response){
            return res.status(404).json({
                msg: "No se ha encontrado el software asociado a la ID."
            })
        }
        const software = await Software.findByPk(software_id)
        software.destroy()
        return res.status(200).json({
            msg: "Se ha eliminado el software correctamente."
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })
        
    }
}

const getSoftware = async (req, res = response) => {

    try {

        const { software_id } = req.params
        const software = await Software.findOne({ where: { software_id }, raw: true })
        if(!software){
            return res.status(404).json({
                msg: "No se ha encontrado el software asociado a la ID."
            })
        }

        return res.status(200).json({
            software
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })
        
    }
}

const getSoftwares = async (req, res = response) => {

    try {

        const softwares = await Software.findAll({ raw: true })
        if(softwares.length < 1){
            return res.status(404).json({
                msg: "No se han encontrado softwares."
            })
        }
        return res.status(200).json({
            softwares
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })
        
    }
}

module.exports = {
    createSoftware,
    editSoftware,
    deleteSoftware,
    getSoftware,
    getSoftwares
}