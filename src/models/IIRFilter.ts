import { Node2 } from "./Node2";

export class IIRFilter extends Node2<IIRFilterNode> {
    static count = 0;
    constructor(feedforward: Iterable<number>, feedback: Iterable<number>) {
        super(
            `IIRFilter${++IIRFilter.count}`,
            Node2.context.createIIRFilter(feedforward, feedback)
        );
    }
}
