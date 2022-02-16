import Base from "./base";
import {EMIT_HOST} from "../config";

const rpc = new Base(EMIT_HOST)

export * from "./base";
export default rpc;