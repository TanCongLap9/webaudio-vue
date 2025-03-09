import { Node2 } from "./Node2";

export class StereoPanner extends Node2<StereoPannerNode> {
    static count = 0;
    constructor() {
        super(
            `StereoPanner${++StereoPanner.count}`,
            Node2.context.createStereoPanner()
        );
    }
}