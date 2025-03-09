<script setup lang="ts">
import { computed, onMounted, onRenderTriggered, onUnmounted, reactive, ref, useTemplateRef } from 'vue';
import { Analyser } from '../models/Analyser';
import NodeComponent from './NodeComponent.vue';

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
const updateToggle = ref(false);
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
    const anim = () => {
        if (!timeCanvas.value || !freqCanvas.value) return;

        model.node.getByteTimeDomainData(timeData);
        model.node.getByteFrequencyData(freqData);
        
        timeCtx.reset();
        freqCtx.reset();
        timeCtx.fillStyle = freqCtx.fillStyle = "#333";
        timeCtx.strokeStyle = freqCtx.strokeStyle = "#fff";
        timeCtx.fillRect(0, 0, timeCanvas.value!.clientWidth, timeCanvas.value!.clientHeight);
        freqCtx.fillRect(0, 0, freqCanvas.value!.clientWidth, freqCanvas.value!.clientHeight);
        
        freqCtx.moveTo(0, freqCanvas.value!.clientHeight);
        timeCtx.moveTo(0, timeCanvas.value!.clientHeight / 2);
        
        const timeInc = Math.min(timeData.length / timeCanvas.value!.clientWidth, 1);
        const freqInc = Math.min(freqData.length / freqCanvas.value!.clientWidth, 1);
        
        for (let i = 0; i < timeData.length; i += timeInc) {
            const ir = Math.floor(i)
            timeCtx.lineTo(
                ir / timeData.length * timeCanvas.value!.clientWidth,
                (toTimeRatio(timeData[ir]) * 0.5 + 0.5) * timeCanvas.value!.clientHeight
            );
        }
        
        for (let i = 0; i < freqData.length; i += freqInc) {
            const ir = Math.floor(i);
            freqCtx.lineTo(
                ir / freqData.length * freqCanvas.value!.clientWidth,
                toFreqRatio(freqData[ir]) * freqCanvas.value!.clientHeight
            );
        }
        
        freqCtx.stroke();
        timeCtx.stroke();
        
        updateToggle.value = !updateToggle.value;
        requestAnimationFrame(anim);
    }

    anim();
    
    // int = setInterval(() => {
        
    // }, 100);
    _fftSize.value = model.node.fftSize;
})
const timeCanvas = useTemplateRef("time");
const freqCanvas = useTemplateRef("freq");

onRenderTriggered(() => {
    console.log("render");
})

onUnmounted(() => {
    // clearInterval(int);
})

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
            <label class="form-label">Waveform (getByteTimeDomainData())</label>
            <div>
                <canvas ref="time"></canvas>
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Spectrum (getByteFrequencyData())</label>
            <div>
                <canvas ref="freq"></canvas>
            </div>
            <!-- <div :class="`d-flex align-items-end justify-content-stretch ${updateToggle ? 'a' : 'b'}`"
                style="height: 200px">
                <div v-for="(v, i) of freqData" :key="i" class="bg-danger w-100"
                    :style="{ height: `${isFinite(v) ? v + 100 : 0}%` }"></div>
            </div> -->
        </div>
    </NodeComponent>
</template>
