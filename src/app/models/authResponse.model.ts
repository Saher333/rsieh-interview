export class AuthResponse {
    public success: boolean;
    public errors: string[];

    constructor(success: boolean, errors: string[]) {
        this.success = success;
        this.errors = errors;
      }
}