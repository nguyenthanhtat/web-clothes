const Cart =require('../Model/cartModel')
const cartCtrl ={
    AddCart:async (req, res)=>{
        const newCart = new Cart(req.body);
        try {
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
            
        } catch (err) {
            res.status(500).json(err)
        }
    },
    UpdateCart:async(req, res)=>{
        try {
            const updatedCart = await Cart.findByIdAndUpdate(
                req.params.id,{
                    $set:req.body ////yeu cau moi thu trong body vaf thiet lap lai
                    //cho nguoi dung de ngan chan dung new:true
                },{
                    new:true
                }
           
            )
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    DeleteCart:async(req, res)=>{
        try {
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json("Cart has been deleted");
        } catch (error) {
            res.status(500).json(error);
            
        }
    },
    GetAllCart:async(req, res)=>{
        try {
            const carts = await Cart.find();
            res.status(200).json(carts)
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
module.exports = cartCtrl;
