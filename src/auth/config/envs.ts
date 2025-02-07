import * as join from 'joi'
import { EnvsSchema } from '../interfaces/envs.interface'
import 'dotenv/config'

const envsSchemas = join.object({
    PORT: join.number().required(),
    MAILER_SERVICE: join.string().required(),
    MAILER_KEY: join.string().required(),
    MAILER_EMAIL: join.string().required(),
    MAILER_NAME: join.string().required(),
}).unknown(true);

const { error, value } = envsSchemas.validate({
    ...process.env
});

if (error)  throw new Error(`Config validation error: ${error.message}`);

export const envs: EnvsSchema = {
    PORT: value.PORT,
    MAILER_SERVICE: value.MAILER_SERVICE,
    MAILER_KEY: value.MAILER_KEY,
    MAILER_EMAIL: value.MAILER_EMAIL,
    MAILER_NAME: value.MAILER_NAME,
};

export const jwtConstants = {
    secret: 'secretKey',
}