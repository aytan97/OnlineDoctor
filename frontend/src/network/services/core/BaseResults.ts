import { Result } from "../../models/core/Result";
import ResultTypes from "../../models/core/ResultTypes";

class BaseResults<T> {
    handleResponse(response: T | T[]): Result<T | T[]> {
        return {
            data: response,
            message: "Succeded",
            status: ResultTypes.Success,
            statusCode: 200,
        };
    }

    handleError(error: any): Result<T | T[]> {
        const errorMessage = error.response ? error.response.data.message : "An error occured";
        const statusCode = error.response ? error.response.status : 500;

        return {
            data: null,
            message: errorMessage,
            status: ResultTypes.Error,
            statusCode: statusCode,
        };
    }
}

export default BaseResults;
