const emailController = require('./emailController');

module.exports.save_products = async (req, res) => {
    const {products} = req.body;
    let cookie_name = "products";
    res.cookie(cookie_name, products, {httpOnly: true, overwrite: true, secure: true});
    res.status(200).json({ msg: "success" });
}

module.exports.send_email_order = async (req, res) => {
    try{
        const cookies = req.cookies;
        const products = cookies.products;
        const fullname = cookies.username;
        console.log(products);
        const result = await emailController.sendOrderEmail(fullname, products);
        res.status(200).json({ msg: "successful" });
    }catch(err){
        console.log(err);
        const errors = {error: "Error placing order"};
        res.status(500).json({ errors });
    }
}

module.exports.updateCart = async (req, res) => {
    const{id, quantity} = req.body;
    const cookies = req.cookies;
    let products = cookies.products;
    for(let index = 0; index < products.length; index++){
        if(index == id){
            products[index].quantity = quantity;
        }  
    }
    let cookie_name = "products";
    res.cookie(cookie_name, products, {httpOnly: true, overwrite: true, secure: true});
    res.status(200).json({ msg: "success" });
}