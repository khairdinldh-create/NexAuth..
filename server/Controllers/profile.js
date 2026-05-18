

const Profile=require('../Models/Profile');

const addprofileRoute = async (req, res) => {
    try {
        const isthereprofile = await Profile.findOne({ userId: req.user._id });

        // profile doesn't exist → create it
        if (!isthereprofile) {
            const newProfile = new Profile({
                telephone: req.body.telephone,
                country: req.body.country,
                city: req.body.city,
                userId: req.user._id,
            });

            await newProfile.save();
            return res.status(201).json({ message: "Profile added successfully" });
        }

        // profile exists → update it
        const profile = await Profile.findOneAndUpdate(
            { userId: req.user._id },
            { 
                telephone: req.body.telephone, 
                country: req.body.country, 
                city: req.body.city 
            },
            { new: true }
        );

        return res.status(200).json({ message: "Profile updated successfully", profile });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};









const showprofileRoute= async (req,res)=>{

    try {
        const profile = await Profile.findOne({ userId: req.user._id });
        if (!profile) {
          return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }


    
}


const showallprofilesRoute= async(req,res)=>{
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
}



const deleteprofileRoute = async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({ userId: req.user._id }); // 👈 one line does both

        if (!profile) {
          return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile deleted successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};



const updateprofileRoute = async (req, res) => {


    





    try {
        // ✅ only take allowed fields from body
        const { telephone, country, city } = req.body;

        const profile = await Profile.findOneAndUpdate(
          { userId: req.user._id },
          { telephone, country, city }, // 👈 only these 3 fields
          { new: true }
        );

        if (!profile) {
          return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", profile });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

















const deletespeceficprofilebyadminRoute = async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({ userId: req.params.id }); // 👈 one line does both

        if (!profile) {
          return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile deleted successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }


};

const showspeceficprofilebyadminRoute = async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.params.id });// 👈 one line does both

        if (!profile) {
          return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }


};



module.exports = { 
  addprofileRoute, 
  showprofileRoute, 
  showallprofilesRoute, 
  deleteprofileRoute,
  deletespeceficprofilebyadminRoute,
  showspeceficprofilebyadminRoute,
  updateprofileRoute
};