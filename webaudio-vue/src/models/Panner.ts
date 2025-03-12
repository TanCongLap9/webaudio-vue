import { Node2 } from "./Node2";

export class Panner extends Node2<PannerNode> {
    static count = 0;
    constructor() {
        super(
            `Panner${++Panner.count}`,
            Node2.context.createPanner()
        );
    }
}
