class ApiResponse {
    constructor(statusCode, data, massage = "Success") {
        this.statusCode = statusCode >= 200 && statusCode < 300 ? "success" : "error";
        this.data = data;
        this.message = massage;
        this.success = statusCode >= 200 && statusCode < 300 ? true : false;
    }
}

export { ApiResponse };
