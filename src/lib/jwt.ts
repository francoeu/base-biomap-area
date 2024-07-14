import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1d",
};

export  function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
  const secret_key =  process.env.NEXTAUTH_SECRET;
  const token =  jwt.sign(payload, secret_key!, options);
  // console.log('/LIB/JWT - signJwtAccessToken/Token', token )
  return token;
}

export function verifyJwt(token: string): JwtPayload | null {
  try {

    const secretKey = process.env.NEXTAUTH_SECRET;
    // console.log('verifyJwt/Secret', secretKey )
    const decoded = jwt.verify(token, secretKey!);
    const acessToken = jwt.sign(token, secretKey!);
    // console.log('JWT VERIFY', decoded)
    // console.log('JWT SIGN', acessToken)

    
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
