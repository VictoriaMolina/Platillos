const { Platillos } = require('../models/platillos.model');

async function crearPlatillo(req, res){
    const body = req.body;

    if(body.nombre){
        try{
            const platillo = await new Platillos({
                nombre: body.nombre
            }).save();

            if(platillo) {
                res.status(200).send(platillo._id);
            }else {
                res.status(500).send("Error al guardar platillo.");
            }

        }catch(err){
            console.log(err);
            res.status(402).send("Error al guardar platillo.");
        }
        
    }else {
        res.status(402).send("No se envió el nombre del platillo.");
    }
};

async function sleccionarMenu(req, res){

    const query = req.query;
    const numPlatillos = query.np ? parseInt(query.np) : 7;

    try{
        const listaPlatillos = await Platillos.find({
            usadoEn: {
                $lte: Date.now() - 604800000
            }
        }).select("nombre").limit(numPlatillos);

        const resJson = {
            message: "Lista de menú obtenida con éxito",
            data: listaPlatillos ? listaPlatillos : {}
        };

        await listaPlatillos.forEach(function(platillo){
            platillo.usadoEn = Date.now();
            platillo.save();
        })

        res.status(200).json(resJson);

    }catch(err){
        console.log(err);
        res.status(500).send("Error al cargar platillo.");
    }
};

/**
 * Function that updates the information of the products.
 * @param {*} req 
 * @param {*} res 
 */
async function platilloUpdate(req, res){
    const updateId = req.body.id;

        try{

            if(updateId){
                await Platillos.updateOne({
                    _id: updateId
                }, {

                    $set: {
                        nombre: 'Flautas'
                    }
                });

                res.status(200).send("SUCCESS")
            } else {
                res.status(402).send("BAD PARAMETERS")
                };

        }catch(err){
            res.status(500).send("ERROR")
            console.log(err);
        }       
};

/**
 * Function to delete products.
 * @param {*} req 
 * @param {*} res 
 */
async function platilloDelete(req, res){
    const deleteId = req.body.id;

    if(deleteId) {
        try{
            const results = await Platillos.deleteOne();

            if(results) {
                res.json({'data': results});
            } else {
                res.status(500).send("ERROR STORING NEW SERVICES");
            }

        }catch(err){
            res.status(500).send("ERROR DELETING");
        }

    } else {
        res.status(402.).send("BAD PARAMETERS")
    }
    
};
module.exports = {
    crearPlatillo,
    sleccionarMenu,
    platilloUpdate,
    platilloDelete
}