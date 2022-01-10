export interface errorReturn{
    status:string,
    message:string,
    code: number
    result?:string|any
}

export interface successReturn{
    status:string,
    message:string,
    code: number,
    result: Object|any 
}