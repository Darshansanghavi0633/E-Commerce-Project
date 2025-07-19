import jwt from 'jsonwebtoken';

const generateToken =(res,userId)=>{
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // Set the token as an HTTP-only cookie
    // This prevents the cookie from being accessed via JavaScript, mitigating XSS attacks
    // The secure flag ensures that the cookie is only sent over HTTPS connections
    // The sameSite attribute helps prevent CSRF attacks by not sending the cookie with cross-site requests
    // The expiresIn option sets the cookie to expire in 30 days
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',          // Use secure cookies in production
        sameSite: 'strict',                                     // Helps prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000,                       // Cookie expires in 30 days
    });

    return token;                                               // Return the token for further use if needed
}

export default generateToken;   