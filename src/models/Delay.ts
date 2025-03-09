import { Node2 } from "./Node2";

export class Delay extends Node2<DelayNode> {
    static count = 0;
    constructor() {
        super(
            `Delay${++Delay.count}`,
            Node2.context.createDelay()
        );
    }
}