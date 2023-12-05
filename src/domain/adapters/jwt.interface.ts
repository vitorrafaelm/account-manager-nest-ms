export interface IJwtServicePayload {
    identifier: string;
    email: string;
  }
  
  export interface IJwtService {
    checkToken(token: string): Promise<any>;
    createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): Promise<string>;
  }
  