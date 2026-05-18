const updateProfileValidator = (req, res, next) => {
    let { telephone, country, city } = req.body;

    const errors = [];

    // =========================
    // 1. Check at least one field
    // =========================
    if (!telephone && !country && !city) {
        return res.status(400).json({ 
            message: "At least one field is required to update" 
        });
    }

    // =========================
    // 2. Telephone validation
    // =========================
    if (telephone) {
        telephone = telephone.trim();
        const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
        if (!phoneRegex.test(telephone)) {
            return res.status(400).json({ message: "Invalid telephone number" });
        }
        req.body.telephone = telephone;
    }

    // =========================
    // 3. Country validation
    // =========================
    if (country) {
        country = country.trim().toLowerCase();
        if (country.length < 2) {
            return res.status(400).json({ message: "Country name is too short" });
        }
        if (country.length > 50) {
            return res.status(400).json({ message: "Country name is too long" });
        }
        if (!/^[a-zA-Z\s]+$/.test(country)) {
            return res.status(400).json({ message: "Country must contain letters only" });
        }
        req.body.country = country;
    }

    // =========================
    // 4. City validation
    // =========================
    if (city) {
        city = city.trim();
        if (city.length < 2) {
            return res.status(400).json({ message: "City name is too short" });
        }
        if (city.length > 50) {
            return res.status(400).json({ message: "City name is too long" });
        }
        if (!/^[a-zA-Z\s]+$/.test(city)) {
            return res.status(400).json({ message: "City must contain letters only" });
        }
        req.body.city = city;
    }

    next();
};

module.exports = updateProfileValidator;