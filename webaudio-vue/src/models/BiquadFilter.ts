import { Node2 } from "./Node2";

export class BiquadFilter extends Node2<BiquadFilterNode> {
    static count = 0;
    constructor() {
        super(
            `BiquadFilter${++BiquadFilter.count}`,
            Node2.context.createBiquadFilter()
        );
    }
}
