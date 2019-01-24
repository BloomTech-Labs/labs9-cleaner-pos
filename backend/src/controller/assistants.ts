import { findAssistants } from '../models/assistants';

import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

declare global {
    interface Token {
        ext_it: string;
        role: string;
    }

    namespace Express {
        interface Request {
            token: Token;
        }
    }

    interface StatusError extends Error {
        statusCode: number;
    }
}


