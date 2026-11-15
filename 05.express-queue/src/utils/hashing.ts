import bcrypt from "bcrypt";
const SALT_ROUNDS = 12;
export const createPasswordHash = (password: string) => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
}

export const verifyPassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}