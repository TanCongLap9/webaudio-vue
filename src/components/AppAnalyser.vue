<script setup lang="ts">
import { computed, onMounted, reactive, ref, useTemplateRef } from 'vue';
import { Analyser } from '../models/Analyser';
import NodeComponent from './AppNode.vue';

defineProps<{
    index: number
}>();

const _fftSize = ref(0);
const fftSize = computed({
    get() {
        return _fftSize.value;
    },
    set(value: number) {
        _fftSize.value = value;
        model.node.fftSize = value;
        timeData = new Uint8Array(value);
        freqData = new Uint8Array(model.node.frequencyBinCount).fill(-Infinity);
    }
})
let timeData = new Uint8Array(2048);
let freqData = new Uint8Array(1024).fill(-Infinity);
function toTimeRatio(uint8: number) {
    return uint8 === 128 ? 0 : (uint8 - 128) / 128;
}
function toFreqRatio(uint8: number) {
    return (255 - uint8) / 255;
}
onMounted(() => {
    const timeCtx = timeCanvas.value!.getContext("2d")!;
    const freqCtx = freqCanvas.value!.getContext("2d")!;
    timeCtx.strokeStyle = "#fff";
    timeCtx.fillStyle = "#333";
    const anim = () => {
        if (!timeCanvas.value || !freqCanvas.value) return;

        model.node.getByteTimeDomainData(timeData);
        model.node.getByteFrequencyData(freqData);
        
        timeCtx.clearRect(0, 0, timeCanvas.value!.width, timeCanvas.value!.height);
        timeCtx.fillRect(0, 0, timeCanvas.value!.width, timeCanvas.value!.height);
        timeCtx.beginPath();
        timeCtx.moveTo(0, timeCanvas.value!.height / 2);
        for (let i = 0; i < timeData.length; i += 1) {
            timeCtx.lineTo(
                Math.floor(i / (timeData.length - 1) * timeCanvas.value!.width),
                Math.floor((toTimeRatio(timeData[i]) * 0.5 + 0.5) * timeCanvas.value!.height)
            );
        }
        timeCtx.stroke();
        
        freqCtx.clearRect(0, 0, freqCanvas.value!.width, freqCanvas.value!.height);
        freqCtx.fillStyle = "#333";
        freqCtx.fillRect(0, 0, freqCanvas.value!.width, freqCanvas.value!.height);
        freqCtx.fillStyle = "#fff";
        for (let i = 0; i < freqData.length; i += 1) {
            freqCtx.fillRect(
                Math.floor(i / freqData.length * freqCanvas.value!.width),
                Math.floor(toFreqRatio(freqData[i]) * freqCanvas.value!.height),
                Math.ceil(freqCanvas.value!.width / freqData.length),
                Math.ceil(freqCanvas.value.height - toFreqRatio(freqData[i]) * freqCanvas.value!.height)
            )
        }
        
        requestAnimationFrame(anim);
    }
    anim();
    _fftSize.value = model.node.fftSize;
});
const timeCanvas = useTemplateRef("time");
const freqCanvas = useTemplateRef("freq");

const model = reactive(new Analyser());

</script>

<template>
    <NodeComponent :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`analyser-fftsize-${index}`" class="form-label">fftSize [32, 32768]</label>
            <input type="number" name="fftsize" :id="`analyser-fftsize-${index}`" class="form-control form-control-sm"
                v-model="fftSize">
        </div>
        <div class="mb-3">
            <label :for="`analyser-frequencybincount-${index}`" class="form-label">frequencyBinCount</label>
            <input type="number" name="frequencybincount" :id="`analyser-frequencybincount-${index}`"
                class="form-control form-control-sm" v-model="model.node.frequencyBinCount" disabled>
        </div>
        <div class="mb-3">
            <label :for="`analyser-mindecibels-${index}`" class="form-label">minDecibels</label>
            <input type="number" name="mindecibels" :id="`analyser-mindecibels-${index}`"
                class="form-control form-control-sm" v-model="model.node.minDecibels">
        </div>
        <div class="mb-3">
            <label :for="`analyser-maxdecibels-${index}`" class="form-label">maxDecibels</label>
            <input type="number" name="maxdecibels" :id="`analyser-maxdecibels-${index}`"
                class="form-control form-control-sm" v-model="model.node.maxDecibels">
        </div>
        <div class="mb-3">
            <label :for="`analyser-smoothingtimeconstant-${index}`" class="form-label">smoothingTimeConstant [0,
                1]</label>
            <input type="number" name="smoothingtimeconstant" :id="`analyser-smoothingtimeconstant-${index}`"
                class="form-control form-control-sm" min="0" max="1" step="0.1"
                v-model="model.node.smoothingTimeConstant">
        </div>
        <div class="mb-3">
            <label :for="`analyser-waveform-${index}`" class="form-label">Waveform (getByteTimeDomainData())</label>
            <div>
                <canvas :id="`analyser-waveform-${index}`" ref="time"></canvas>
            </div>
        </div>
        <div class="mb-3">
            <label :id="`analyser-spectrum-${index}`" class="form-label">Spectrum (getByteFrequencyData())</label>
            <div>
                <canvas :id="`analyser-spectrum-${index}`" ref="freq"></canvas>
            </div>
        </div>
    </NodeComponent>
</template>
