import { WS_HOST, WS_PORT } from "@100ff/shared";

export let ws = new WebSocket(`ws://${WS_HOST}:${WS_PORT}`);
//todo handle errors
