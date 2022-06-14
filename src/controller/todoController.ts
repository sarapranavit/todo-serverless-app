import {Request, Response } from "express"

export class TodoController {

    async getTodoList(req: Request, res:Response) {
        console.log("req", req);
        res.json({
            "Msg": "todo- list"
        })
    }
}