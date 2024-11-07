const { response } = require('express');
const Items = require('../models/itemModel');

const createItem = async (req, res = response) => {

    try {
        const { titulo, img, descripcion } = req.body

        await Items.create({
            titulo,
            img,
            descripcion
        })

        return res.status(201).json({
            msg: "Se ha creado el Item correctamente."
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })   
    }
}

const editItem = async (req, res = response) => {

    try {

        const { item_id, titulo, img, descripcion } = req.body
        
        let item = await Items.findOne({ where : { item_id }, raw: true })
        if(!item){
            return res.status(404).json({
                msg: "No se ha encontrado el Item."
            })
        }
        item = await Items.findByPk(item_id)
        item.titulo = titulo
        item.img = img
        item.descripcion = descripcion
        item.save()

        return res.status(200).json({
            msg: "Se ha editado el Item correctamente."
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })   
    }
}

const deleteItem = async (req, res = response) => {

    try {
        const { item_id } = req.params
        let item = await Items.findOne({ where: { item_id } })
        console.log(item)
        if(!item){
            return res.status(404).json({
                msg: "No se ha encontrado el Item."
            })
        }
        item = await Items.findByPk(item_id)
        item.destroy()
    
        return res.status(200).json({
            msg: "Se ha eliminado el Item correctamente."
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })   
    }
}

const getItem = async (req, res = response) => {

    try {

        const { item_id } = req.params
        const item = await Items.findOne({ where: {  item_id } })
        if(!item){
            return res.status(404).json({
                msg: "No se ha encontrado el Item"
            })
        }
        return res.status(200).json({
            item
        })

        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })   
    }
}

const getItems = async (req, res = response) => {

    try {

        const items = await Items.findAll({ order: [['item_id', 'DESC']] })
        if(items.length < 1){
            return res.status(404).json({
                msg: "No se han encontrado Items."
            })
        }
        return res.status(200).json({
            items
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })   
    }
}

const getItems3 = async (req, res = response) => {

    try {

        const items = await Items.findAll({ order: [['item_id', 'DESC']], limit: 3})
        if(items.length < 1){
            return res.status(404).json({
                msg: "No se han encontrado Items."
            })
        }
        return res.status(200).json({
            items
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })   
    }
}

module.exports = {
    createItem,
    editItem,
    deleteItem,
    getItem,
    getItems,
    getItems3
}