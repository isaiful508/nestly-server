import { INewsletter } from "./newsletter.interface";
import { Newsletter } from "./newsletter.model";

export const createNewsletter = async(payload: INewsletter): Promise<INewsletter> => {
    const isExist  = await Newsletter.findOne({email: payload.email});
    if(isExist){
        throw new Error("You are already subscribed to the newsletter");
    }
    const result = await Newsletter.create({
        email: payload.email,
    });
    return result;
};
export const getAllSubscribers = async(): Promise<INewsletter[]> => {
    return Newsletter.find();
}