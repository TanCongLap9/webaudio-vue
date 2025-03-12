import { Node2 } from "./Node2";

export class WaveShaper extends Node2<WaveShaperNode> {
    static count = 0;
    constructor() {
        super(
            `WaveShaper${++WaveShaper.count}`,
            Node2.context.createWaveShaper()
        )
        this.node.curve = new Float32Array(5);
    }

    spliceCurve(start: number, length: number, ...elems: number[]) {
        start = start >= 0 ? start : this.node.curve!.length + start;
        const newLength = this.node.curve!.length - length + elems.length;
        const newArray = new Float32Array(newLength);
        for (let i = 0; i < start; i++)
            newArray[i] = this.node.curve![i];
        for (let i = start; i < start + elems.length; i++)
            newArray[i] = elems[i - start];
        for (let i = start + elems.length; i < newLength; i++)
            newArray[i] = this.node.curve![i + length - elems.length];
        this.node.curve = newArray;
    }
}
