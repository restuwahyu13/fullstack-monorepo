"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawParser = rawParser;
function rawParser(body) {
    if (Object.keys(body)
        .join("")
        .match(/\.*[({}:.\s)]|([]).*/g) !== null)
        return JSON.parse(Object.keys(body).join(""));
    else
        return body;
}
