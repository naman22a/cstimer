export class FieldError {
    field: string;
    message: string;
}

export class OkResponse {
    ok: boolean;
    errors?: FieldError[];
}
