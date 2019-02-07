var passwordHash = require('password-hash');

var User = require('../models/user')
var fileHandler = require('../buzhelper/file-handler')

module.exports = {
    // var user = {};
    // fileHandler.uploadFile()

       signup : (req, res) => {
            console.log(req.body);
            console.log('req.body.file', req.body.file)
            var file = {
                "fieldname": "file",
                "originalname": "download (3).jpg",
                "encoding": "7bit",
                "mimetype": "image/jpeg",
                "destination": "./public/attachment1/",
                "filename": "download (3)-1548413207222.jpg",
                "path": "public\\attachment1\\download (3)-1548413207222.jpg",
                "size": 4850
            }
            fileHandler.uploadFile(file)
            User.findOne({ email: req.body.email }, (err, userInfo) => {
                if (userInfo == null) {
                    if (req.body.password === req.body.comfirm_password) {
                        var passwordencoded = passwordHash.generate(req.body.password);
                        console.log('passwordencoded', passwordencoded)
                        var userobject = {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            mobile_number: req.body.mobile_number,
                            email: req.body.email,
                            password: passwordencoded
                        }
                        var userSignup = new User(userobject);
                        userSignup.save((err, result) => {
                            console.log('result', result)
                            if (err) {
                                res.json({ success: false, message: "Error in saving data" })
                            } else {
                                res.json({
                                    success: true, message: "User created successfully"
                                })
                            }
                        })
                    } else {
                        res.json({ success: false, message: "Password didn't match" })
                    }
                }
                else {
                    res.json({ success: false, message: "Email ID allready exists." })
                }
            })
        },

        login : (req, res) => {
            console.log(req.body);
            User.findOne({ email: req.body.email }, (err, userInfo) => {
                console.log('userInfo', userInfo)
                if (err) {
                    res.status(500).send({ error: err, message: 'Login failed' });
                } else if (userInfo != null) {
                    var isLogin = passwordHash.verify(req.body.password, userInfo.password)
                    console.log('isLogin', isLogin)
                    if (isLogin) {
                        res.status(200).send({
                            message: 'Login success'
                        })
                    } else {
                        res.status(400).send({
                            message: 'Incorrect password'
                        })
                    }
                } else {
                    res.status(404).send({ message: 'User not found in database' })
                }
            })
        }

}