<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Oscillator } from '../models/Oscillator';
import AppNode from './AppNode.vue';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new Oscillator());

const _isTypeCustom = ref(false);
const isTypeCustom = computed({
    get() {
        return _isTypeCustom.value;
    },
    set(value: boolean) {
        _isTypeCustom.value = value;
        if (value)
            model.node.setPeriodicWave(model.periodicWave);
        else
            model.node.type = "sine";
    }
});

function setArray(array: Array<number>, i: number, e: Event) {
    const elem = e.target as HTMLInputElement;
    if (!elem.checkValidity()) return;
    array[i] = Number(elem.value);
    model.reloadPeriodicWave();
}

const _periodicWaveLength = ref(5);
const periodicWaveLength = computed({
    get() {
        return _periodicWaveLength.value;
    },
    set(value) {
        _periodicWaveLength.value = value;
        const delta = value - model.real.length;
        if (delta < 0) {
            model.real.splice(model.real.length + delta, -delta);
            model.imag.splice(model.imag.length + delta, -delta);
        }
        else {
            const a = new Array<number>(delta).fill(0);
            model.real.splice(model.real.length, 0, ...a);
            model.imag.splice(model.imag.length, 0, ...a);
        }
    }
});

</script>

<template>
    <AppNode :index="index" :model="model" :is-removable="true">
        <div class="mb-3">
            <label :for="`oscillator-detune-${index}`" class="form-label">detune</label>
            <input type="number" name="detune" :id="`oscillator-detune-${index}`" class="form-control form-control-sm"
                step="10" v-model="model.node.detune.value">
        </div>
        <div class="mb-3">
            <label :for="`oscillator-frequency-${index}`" class="form-label">frequency [-24000, 24000]</label>
            <input type="number" name="frequency" :id="`oscillator-frequency-${index}`"
                class="form-control form-control-sm" min="-24000" max="24000" step="100"
                v-model="model.node.frequency.value">
        </div>
        <div>
            <label :for="`oscillator-type-${index}`" class="form-label">type</label>
            <input type="text" name="type" :id="`oscillator-type-${index}`" class="form-control form-control-sm"
                v-model="model.node.type" :list="`oscillator-type-list-${index}`" :disabled="isTypeCustom">
            <datalist :id="`oscillator-type-list-${index}`">
                <option>sawtooth</option>
                <option>sine</option>
                <option>square</option>
                <option>triangle</option>
            </datalist>
        </div>
        <div class="form-check mb-3">
            <input type="checkbox" name="type-custom" :id="`oscillator-type-custom-${index}`" class="form-check-input"
                v-model="isTypeCustom">
            <label :for="`oscillator-type-custom-${index}`" class="form-check-label">Custom</label>
        </div>
        <template v-if="isTypeCustom">
            <div class="mb-3">
                <label :for="`periodicwave-length-${index}`" class="form-label">real.length, imag.length</label>
                <input type="number" name="length" :id="`periodicwave-length-${index}`"
                    class="form-control form-control-sm" min="0" v-model="periodicWaveLength">
            </div>

            <div class="mb-3">
                <label class="form-label">real [-1, 1]</label>
                <div class="overflow-auto d-flex flex-row">
                    <input v-for="(v, i) of model.real" :key="i" type="range" :name="`real-${i}`"
                        :id="`periodicwave-real-${i}-${index}`" class="a-periodic-wave" :list="`periodic-wave-list-${index}`" min="-1" max="1"
                        step="0.01" :value="model.real[i]" @input="setArray(model.real, i, $event!)">
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label">imag [-1, 1]</label>
                <div class="overflow-auto d-flex flex-row">
                    <input v-for="(v, i) of model.imag" :key="i" type="range" :name="`imag-${i}`"
                        :id="`periodicwave-imag-${i}-${index}`" class="a-periodic-wave" :list="`periodic-wave-list-${index}`" min="-1" max="1"
                        step="0.01" :value="model.imag[i]" @input="setArray(model.imag, i, $event!)">
                </div>
            </div>

            <datalist :id="`periodic-wave-list-${index}`">
                <option>0</option>
            </datalist>
        </template>
    </AppNode>
</template>

<style>
.a-periodic-wave {
    direction: rtl;
    writing-mode: vertical-lr;
    height: 100px;
    width: 1.5rem;
    appearance: slider-vertical;
}
</style>
