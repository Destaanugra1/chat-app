
import { ErrorRequestHandler, RequestHandler } from "express";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    // validasi error
    if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map((e: any) => e.message);
        return res.status(422).json({
            error: messages,
            stack: err.stack
        });
    }

    // error 500

    res.status(500).json({
        error: err.message || "Internal Server Error",
        stack: err.stack
    })

    next(err);
}

export const NotFound: RequestHandler = (req, res) => {
    res.status(404).json({
        message: ("router tidak di temukan")
    });
}