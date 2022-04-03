const Category = require('../Model/categoryModel')
const productCtrl={
    NewCategory: async (req, res)=>{
        const newCategory = new Category(req.body);
        try {
            const savedCategory = await newCategory.save();
            res.status(200).json(savedCategory);
        } catch (error) {
            res.status(500).json(error.message);
            
        }
    },
    UpdateCategory: async (req, res)=>{
        try {
            const updateCategory = await Category.findByIdAndUpdate(
                req.params.id,{
                    $set:req.body
                },
                {new:true}
            );
            res.status(200).json(updateCategory)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    DeleteCategory:async(req, res)=>{
        try{
            await Category.findByIdAndDelete(req.params.id)
            res.status(200).json("product has been deleted")

        }catch(err){
            res.status(500).json(err.message)
        }
    },
    GetCategory:async(req,res)=>{
        try {
            const category = await Category.findById(req.params.id)
            const {password,...others}=category._doc;
            res.status(200).json({others});
        } catch (error) {
            res.status(500).json(err) 
        }
    },
    GetAllCategory:async(req, res)=>{
        try {
            const categories = await Category.find();
            res.status(200).json(categories)
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = productCtrl;