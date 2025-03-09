import { Node2 } from "./Node2";

export class Analyser extends Node2<AnalyserNode> {
    static count = 0;
    constructor() {
        super(
            `Analyser${++Analyser.count}`,
            Node2.context.createAnalyser()
        );
    }
}