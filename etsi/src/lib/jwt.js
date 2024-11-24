import jwt from 'jsonwebtoken';

// const JWT_SECRET = "your_secret_here"; 
const JWT_SECRET = process.env.JWT_SECRET; 

if (!JWT_SECRET) {
	console.error("JWT_SECRET not set");
	process.exit(1);
}

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); 
};

export const verifyToken = (token) => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		console.error("Error verifying token:", error.message);
		throw new Error("Invalid or malformed token.");
	}
};
