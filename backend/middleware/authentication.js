import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Extract the token from cookies
        const token = req.cookies.token;
       

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
   

        // Store the user ID in the request object
        req.userId = decode.userId;
     

        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;