const Order = require('../Model/orderModel')

const orderCtrl ={
    AddOrder: async (req, res)=>{
        const newOrder = new Order(req.body);

        try {
            const saveOrder =await newOrder.save();
            res.status(200).json(saveOrder);    
        } catch (error) {
            res.status(500).json(error)
        }
    },
    UpdateOrder:async(req, res)=>{
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,{
                    $set:req.body
                },
                {new:true}
            );
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    DeleteOrder :async (req, res)=>{
        try {
            await Order.findByIdAndDelete(req.params.id)
            res.status(200).json("Order has been deleted....." );

        } catch (error) {
            res.status(500).json(err)
        }
    },
    GetAllOrder : async (req,res)=>{
        try {
            const orders = await Order.find();
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}
module.exports = orderCtrl