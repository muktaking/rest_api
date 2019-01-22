const Contact = require("../models/Contact");

const getAllContactControllers = (req,res,next) =>{

    Contact.find()
    .then(contacts=>{
        res.status(200).json({
            message: "All contacts are shown",
            contacts
        })
    })
    .catch()

}

const postNewContactControllers = (req,res,next) =>{
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })

    contact.save()
        .then(data =>{
            res.status(201).json({
                message: 'contact added',
                contact: data
            })
        })
        .catch(err=> console.log(err));
}

const getSingleContact = (req,res,next) =>{
    let id = req.params.id;
    console.log(id);
    Contact.findById(id)
        .then(contact=>{
            res.status(200).json(contact);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
    //next();
}

const deleteContact = (req,res,next)=>{
    let id = req.params.id;
    Contact.findByIdAndRemove(id)
        .then(result=>{
            res.json({
                message :"Contact removed", 
                result                
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                message: "Error Ocuured",
                error : err
            });
        })
}

module.exports = {
    getAllContactControllers,
    postNewContactControllers,
    getSingleContact,
    deleteContact
}