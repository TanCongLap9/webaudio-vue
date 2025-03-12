import { Node2 } from "./Node2";

export class Convolver extends Node2<ConvolverNode> {
    static count = 0;
    constructor() {
        super(
            `Convolver${++Convolver.count}`,
            Node2.context.createConvolver()
        );
    }
}
