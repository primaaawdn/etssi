import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
    if (!password || typeof password !== "string") {
        throw new Error("Invalid password");
    }
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const verifyPassword = async (password:string, hashedPassword:string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
