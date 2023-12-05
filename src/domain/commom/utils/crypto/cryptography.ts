export interface Cryptography {
    encrypt(password: string): Promise<string>;
    decrypt(password: string, iv: string, password_encrypted: string):  Promise<string>;
}