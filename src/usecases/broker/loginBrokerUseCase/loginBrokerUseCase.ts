import { IJwtService, IJwtServicePayload } from "src/domain/adapters/jwt.interface";
import { JWTConfig } from "src/domain/config/jwt.interface";
import { BrokerRepository } from "src/domain/repositories/brokerRepository.interface";
import { CryptoService } from "src/infrastructure/commom/utils/crypto/crypto.service";

export class LoginBrokerUseCase {
    constructor(
        private readonly brokerRepository: BrokerRepository,
        private readonly jwtTokenService: IJwtService,
        private readonly jwtConfig: JWTConfig,
        private readonly cryptoService: CryptoService
    ) { }

    async execute(email: string, password: string) {

        try {
            const user = await this.brokerRepository.getUserByEmail(email);

            if (!user) {
                throw new Error()
            }

            const decrypted_password = await this.cryptoService.decrypt(password, user.iv, user.password);
            if (decrypted_password === password) {
                const { password, ...result } = user;

                const payload: IJwtServicePayload = { identifier: user.identifier, email };
                const secret = this.jwtConfig.getJwtSecret();
                const expiresIn = this.jwtConfig.getJwtExpirationTime() + 'd';

                const token = await this.jwtTokenService.createToken(payload, secret, expiresIn);
                const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;

                const return_object = {
                    user: {
                        ...result
                    },
                    cookie,
                    token
                }

                return return_object;
            }
        } catch (error) {
            throw new Error('User credentials Invalid');
        }


        throw new Error('User credentials Invalid')
    }
}