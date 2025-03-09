import { Node2 } from "./Node2";

export class DynamicsCompressor extends Node2<DynamicsCompressorNode> {
    static count = 0;
    constructor() {
        super(
            `DynamicsCompressor${++DynamicsCompressor.count}`,
            Node2.context.createDynamicsCompressor()
        );
    }
}