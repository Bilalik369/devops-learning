import User from "../models/User.js"


export const register = async(req , res)=>{
    try {
        const {nom , email , password} = req.body;
        if(!nom  || ! email || ! password){
            return res.status(400).json({msg : "toutes les champ obligatoire"});
        }

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({msg :"utilisateur deja existe"});
        }

        const newUser = new User({
            nom , 
            email, 
            password,
        });

        await newUser.save();

        const token = newUser.generateToken();

        res.status(201).json({
            msg : "register succes",
            nom : newUser.nom,
            email : newUser.email,
            token
        });
    } catch (error) {
        console.log("ERREUR:", error);
        res.status(500).json({ msg: "error de linscription" });
    }
}


export const login = async(req ,res)=>{
    try {
        const {email , password} =req.body;
        if(!email || !password){
            return res.status(400).json({msg : "tout les champs est obligatoirer"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg : "Email ou mot de passe incorrect"})
        }
        const isPasswordValide = await user.comparePassword(password)
        if(!isPasswordValide){
            return res.status(401).json({msg : "password in valide"})
        } 
        

        const token = user.generateToken()


        res.status(201).json({
            success : true, 
            message : "login success",
            token,
            user : {
                id : user._id,
                nom: user.nom,
                email: user.email,
              
            }
        })

    } catch (error) {
        res.status(500).json({msg : "Erreur serveur lors de la connexion"})
    }
}

