import { Node2 } from "./Node2";

export class AudioContext2 extends Node2<AudioContext> {
    static count = 0;
    constructor(main = false) {
        super(
            `AudioContext${++AudioContext2.count}`,
            main ? Node2.context : new window.AudioContext()
        );
    }
}
