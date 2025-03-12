import { Node2 } from "./Node2";

export class Gain extends Node2<GainNode> {
    static count = 0;
    constructor() {
        super(
            `Gain${++Gain.count}`,
            Node2.context.createGain()
        );
    }
}
