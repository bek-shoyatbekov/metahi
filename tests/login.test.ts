import request from "supertest";
import { Express } from "express-serve-static-core";
import { describe, expect, test } from "@jest/globals";


import { login } from "../src/controllers/login";
import User from "../src/models/user-model";

let server: Express;

beforeAll(async () => {
    
});
