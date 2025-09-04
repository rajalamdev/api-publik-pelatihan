const { Task, User } = require('../models')

exports.getTask = async (req, res) => {
    try {
        const {id} = req.user;
        const data = await Task.findAll({
            where : {
                userId: id
            },
            include : [
                {
                    model : User,
                    as : 'user',
                    attributes : ['id', 'username']
                }
            ]
        });
        return res.status(200).json({message : "sukses mengambil task", data : data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });  
    }
}

exports.createTask = async (req, res) => {
    try {
        const {id} = req.user;
        const { title, description, status } = req.body;
        
        const data = await Task.create({
            title,
            description,
            status,
            userId: id
        })

    
        return res.status(201).json({ message: 'Task created successfully', data });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const {id : userId} = req.user;
        const { id } = req.params;
        const { title, description, status } = req.body;
        const search = await Task.findOne({
            where : {
                id : id,
                userId: userId
            }
        })

        if (!search) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.update({
                title, 
                description, 
                status
            },
            { where: {
                id: id,
                userId: userId
            }}
        )

        return res.status(200).json({ message: 'Task updated successfully'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const {id : userId} = req.user;
        const { id } = req.params;

        const search = await Task.findOne({
            where: {
                id: id,
                userId: userId
            }
        });

        if (!search) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.destroy({
            where: {
                id: id,
                userId: userId
            }
        });

        return res.status(200).json({ message: 'Task deleted successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



