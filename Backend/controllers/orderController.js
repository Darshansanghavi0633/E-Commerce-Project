import Order from './../models/orderModel.js';
import Prduct from './../models/productModel.js';

const createOrder = async (req, res) => {
    try {
        res.send("Create Order Endpoint Hit");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createOrder };