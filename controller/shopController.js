const { Op } = require('sequelize');
const { shops } = require('../models');

// untuk menampilkan data shop
async function getShops(req, res) {
    try {
        const data = await shops.findAll();

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

// untuk mencari data shop berdasarkan nama, menggunakan Op.end with : nama terakhir
async function searchShops(req, res) {
    try {
        const data = await shops.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.name
                }
            }
        })

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

// untuk mencari data shop berdasarkan id
async function getShopById(req, res) {
    try {
        // Primary Key = PK
        const id = req.params.id;
        const data = await shops.findByPk(id);

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

// untuk mengedit name shop
async function editShop(req, res) {
    try {
        const { name } = req.body;
        const id = req.params.id;

        await shops.update({
            name
        }, {
            where: { id }
        })

        res.status(200).json({
            status: 'success',
            message: `data dari id ${id} nya berhasil berubah`
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

// untuk menghapus data shop
async function deleteShop(req, res) {
    try {
        const id = req.params.id
        await shops.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            'status': 'success',
            'message': `data ${id} ini berhasil di hapus`
        })
    } catch (err) {
        res.status(400).message(err.message)
    }
}

// membuat shop baru
async function createShop(req, res) {
    try {
        const { name, city } = req.body
        const newShop = await shops.create({
            name,
            city,
            userId: req.user.id,
        })
        
        res.status(201).json({
            status: 'success',
            data: {
                shop: newShop
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

module.exports = {
    getShops,
    getShopById,
    searchShops,
    deleteShop,
    editShop,
    createShop,
}