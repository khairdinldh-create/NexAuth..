const addProfileValidator = (req, res, next) => {
    let { telephone, country, city } = req.body;

    const errors = [];

    // =========================
    // 1. Required fields
    // =========================
    if (!telephone) errors.push("Telephone is required");
    if (!country)   errors.push("Country is required");
    if (!city)      errors.push("City is required");

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // =========================
    // 2. Trim inputs
    // =========================
    telephone = telephone.trim();
    country   = country.trim().toLowerCase();
    city      = city.trim();

    // =========================
    // 3. Telephone validation
    // =========================
    const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
    if (!phoneRegex.test(telephone)) {
        return res.status(400).json({ message: "Invalid telephone number" });
    }

    // =========================
    // 4. Country validation
    // =========================
    if (country.length < 2) {
        return res.status(400).json({ message: "Country name is too short" });
    }
    if (country.length > 50) {
        return res.status(400).json({ message: "Country name is too long" });
    }
    if (!/^[a-zA-Z\s]+$/.test(country)) {
        return res.status(400).json({ message: "Country must contain letters only" });
    }

    // =========================
    // 5. City validation
    // =========================
    if (city.length < 2) {
        return res.status(400).json({ message: "City name is too short" });
    }
    if (city.length > 50) {
        return res.status(400).json({ message: "City name is too long" });
    }
    if (!/^[a-zA-Z\s]+$/.test(city)) {
        return res.status(400).json({ message: "City must contain letters only" });
    }

    // =========================
    // 6. Attach cleaned data
    // =========================
    req.body.telephone = telephone;
    req.body.country   = country;
    req.body.city      = city;

    next();
};

module.exports = addProfileValidator;