var Address = require('../models/address')

module.exports = {

    addAddress: (req, res) => {
        console.log(req.body);
        var newAddress = new Address(req.body);
        newAddress.save((err, address) => {
            console.log('address', address)
            if (err) {
                res.status(500).send({
                    message: "Error occured",
                    error: err
                })
            } else {
                res.status(200).send({
                    message: 'Address added successfully',
                    data: address
                })
            }
        })
    },

    // we can give this result by using token 
    getAddressByUserId: (req, res) => {
        console.log('req', req.params)
        Address.find({ user_id: req.params.id }, (err, addresses) => {
            console.log('addresses', addresses)
            if (err) {
                res.status(500).send({
                    message: 'Error occured',
                    error: err
                })
            } else {
                res.status(200).send({
                    message: "Success",
                    data: addresses
                })
            }
        })
    },

    updateAddress: (req, res) => {
        Address.findById({ _id: req.body.address_id, user_id: req.body.user_id }, (err, addrs) => {
            console.log('addrs', addrs)
            if (err) {
                res.status(500).send({
                    message: 'Error occured',
                    error: err
                })
            } else {
                if (addrs) {
                    if (req.body.address_line_1) {
                        addrs.address_line_1 = req.body.address_line_1;
                    }
                    if (req.body.address_line_2) {
                        addrs.address_line_2 = req.body.address_line_2;
                    }
                    if (req.body.first_name) {
                        addrs.first_name = req.body.first_name;
                    }
                    if (req.body.last_name) {
                        addrs.last_name = req.body.last_name;
                    }
                    if (req.body.zip_code) {
                        addrs.zip_code = req.body.zip_code;
                    }
                    if (req.body.city) {
                        addrs.city = req.body.city;
                    }
                    if (req.body.country) {
                        addrs.country = req.body.country;
                    }
                    if (req.body.state) {
                        addrs.state = req.body.state;
                    }
                    if (req.body.mobile_number) {
                        addrs.mobile_number = req.body.mobile_number;
                    }
                    if (req.body.alternate_phone) {
                        addrs.alternate_phone = req.body.alternate_phone;
                    }
                    addrs.save((err, updatedAddr) => {
                        if (err) {
                            res.status(500).send({
                                message: 'Error occured',
                                error: err
                            })
                        } else {
                            res.status(200).send({
                                message: 'Success',
                                data: updatedAddr
                            })
                        }
                    })
                }
            }
        })
    },

    removeAddress: (req, res) => {
        Address.findById({ _id: req.params.id }, (err, addrs) => {
            if (err) {
                res.status(500).send({
                    message: 'Error occured',
                    error: err
                })
            } else if (addrs) {
                Address.remove({ _id: req.params.id }, (err, result) => {
                    console.log('result', result)
                    if (err) {
                        res.status(500).send({
                            message: 'Error occured',
                            error: err
                        })
                    } else {
                        res.status(200).send({
                            message: 'Address deleted successfully'
                        })
                    }
                })
            } else {
                res.status(404).send({
                    message: 'Address not found in database'
                })
            }
        })
    }

}