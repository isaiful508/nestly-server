import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TReturnErrorResponse } from "../types/error";

const handleZodError = (err: ZodError): TReturnErrorResponse => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message
        }
    })

    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorSources
    }
}

export default handleZodError;