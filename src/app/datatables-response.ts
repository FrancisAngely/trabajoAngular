type NewType = any;

export class DataTablesResponse {
    data: NewType[] | undefined;
    draw: number | undefined;
    recordsFiltered: number | undefined;
    recordsTotal: number | undefined;
}