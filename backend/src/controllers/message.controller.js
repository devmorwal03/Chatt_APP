import User from "../models/user.model.js";
import Message from "../models/message.model.js";


export const getUserForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.error("Error in getUserForSidebar controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }

};

export const getMessages = async (req, res) => {
    try{
        const {id:userTochatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userTochatId},         // find the message of the sender
                {senderId: userTochatId, receiverId: myId}          // find the message of the receiver
            ]
        })

        res.status(200).json(messages);
    }
    catch(error){
        console.error("Error in getMessages controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const sendMessage = async (req, res) => {
    try{
        const{text, image} = res.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);     // upload image to cloudinary
            imageUrl = uploadResponse.secure_url;       // get the image url
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });


        await newMessage.save();        // save the message to the database

        // todo : real time message sending

        res.status(200).json(newMessage);
    }
    catch(error){
        console.error("Error in sendMessage controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};