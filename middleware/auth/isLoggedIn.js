import User from '../../models/User/User.js';
import { decodeTokenFromCookie } from '../../services/token_service.js';

const isLoggedIn = async (req, res, next) => {
  try {
    const decodedToken = decodeTokenFromCookie(req.headers.cookie);
    if (!decodedToken) {
      return res.status(500).json({ message: `failed authorization` });
    }

    const { id, email, role } = decodedToken;
    const user = await User.findById(id);

    if (!user) {
      return res.status(500).json({ message: `user not found` });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'User not found', error });
  }
};

export default isLoggedIn;
