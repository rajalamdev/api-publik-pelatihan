const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        
        const { username, password } = req.body;
        const isExist = await User.findOne({
            where : {
                username
            }
        })

        if (isExist) return res.status(400).json({message : "username already exist"});
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            password : hashedPassword
        })
        res.status(201).json({message : "user created successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Something went wrong"});
    }
}

exports.login =  async (req, res) => {
    if (req.cookies.token) 
        return res.status(200).json({message : "You are already logged in"});

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({
        where: {
            username: username,
        }
    })
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(401).json({
            message: 'Invalid username or password'
        })
    }

    const token = jwt.sign({
        id : user.id,
        username : user.username,
        birthDate : user.birthDate,  
    }, process.env.JWT_SECRETKEY, {
        expiresIn: '24h'
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        message: 'Logged in successfully',
    })
}


exports.me = async (req, res) => {
    try {
        const {id} = req.user;
        const user = await User.findOne({
            where: {id: id},
            attributes: ['id', 'username'],            
        });
        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
    }
}

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                message: 'Please login to access this resource'
            })
        }
    
        
        res.clearCookie('token');
        return res.status(200).json({
            message: 'Logout successful'
        })
    
    } catch (error) {
        console.log(error)
    }
}

