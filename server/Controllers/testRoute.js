



const testRoute = (req, res) => {    
    res.status(200).json({message:"iam in the test route"});
}

module.exports = testRoute;