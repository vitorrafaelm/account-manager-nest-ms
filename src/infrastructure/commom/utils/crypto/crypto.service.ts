import { createCipheriv, randomBytes, createDecipheriv, scrypt } from 'crypto';

import { Injectable } from '@nestjs/common';
import { Cryptography } from 'src/domain/commom/utils/crypto/cryptography';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';

@Injectable()
export class CryptoService implements Cryptography {

    constructor(
        private readonly config: ConfigService
    ) {}

    private readonly algorithm = "aes-256-cbc"; 
    
    async encrypt(password: string): Promise<any> {
        const Securitykey = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const initVector = randomBytes(16);
        const cipher = createCipheriv(this.algorithm, Securitykey, initVector);

        const encryptedText = Buffer.concat([
            cipher.update(password),
            cipher.final(),
          ]);

        return { encryptedData: encryptedText.toString('binary'), initVector: initVector.toString('binary') };
    }

    async decrypt(password: string, iv: string, password_encrypted: string): Promise<string> {
        const Securitykey = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv(this.algorithm, Securitykey, Buffer.from(iv, 'binary'));

        const decryptedText = Buffer.concat([
            decipher.update(Buffer.from(password_encrypted, 'binary')),
            decipher.final(),
          ]);
          

        return decryptedText.toString('binary');
    }
}
