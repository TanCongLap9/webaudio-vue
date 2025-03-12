<script setup lang="ts">
import { BiquadFilter } from '../models/BiquadFilter';
import { reactive } from 'vue';
import AppNode from './AppNode.vue';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new BiquadFilter());

</script>

<template>
    <AppNode :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`biquadfilter-q-${index}`" class="form-label">Q</label>
            <input type="number" name="q" :id="`biquadfilter-q-${index}`" class="form-control form-control-sm"
                step="0.05" v-model="model.node.Q.value">
        </div>
        <div class="mb-3">
            <label :for="`biquadfilter-detune-${index}`" class="form-label">detune</label>
            <input type="number" name="detune" :id="`biquadfilter-detune-${index}`" class="form-control form-control-sm"
                step="10" v-model="model.node.detune.value">
        </div>
        <div class="mb-3">
            <label :for="`biquadfilter-frequency-${index}`" class="form-label">frequency [-24000, 24000]</label>
            <input type="number" name="frequency" :id="`biquadfilter-frequency-${index}`"
                class="form-control form-control-sm" min="-24000" max="24000" step="100"
                v-model="model.node.frequency.value">
        </div>
        <div class="mb-3">
            <label :for="`biquadfilter-gain-${index}`" class="form-label">gain</label>
            <input type="number" name="gain" :id="`biquadfilter-gain-${index}`" class="form-control form-control-sm"
                v-model="model.node.gain.value">
        </div>
        <div class="mb-3">
            <label :for="`biquadfilter-type-${index}`" class="form-label">type</label>
            <input type="text" name="type" :id="`biquadfilter-type-${index}`" class="form-control form-control-sm"
                v-model="model.node.type" :list="`biquadfilter-type-list-${index}`">
            <datalist :id="`biquadfilter-type-list-${index}`">
                <option>peaking</option>
                <option>notch</option>
                <option>lowshelf</option>
                <option>lowpass</option>
                <option>highshelf</option>
                <option>highpass</option>
                <option>bandpass</option>
                <option>allpass</option>
            </datalist>
        </div>
    </AppNode>
</template>
