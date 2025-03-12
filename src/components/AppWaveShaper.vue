<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import AppNode from './AppNode.vue';
import { WaveShaper } from '@/models/WaveShaper';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new WaveShaper());

function setArray(array: Float32Array, i: number, e: Event) {
    const elem = e.target as HTMLInputElement;
    if (!elem.checkValidity()) return;
    const newArray = array.slice(); // curve elements are read-only
    newArray[i] = Number(elem.value);
    model.node.curve = newArray;
}

const _curveLength = ref(5);
const curveLength = computed({
    get() {
        return _curveLength.value;
    },
    set(value) {
        _curveLength.value = value;
        const delta = value - model.node.curve!.length;
        if (delta < 0) {
            model.spliceCurve(model.node.curve!.length + delta, -delta);
        }
        else {
            const a = new Array<number>(delta).fill(0);
            model.spliceCurve(model.node.curve!.length, 0, ...a);
        }
    }
});

</script>

<template>
    <AppNode :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`waveshaper-oversample-${index}`" class="form-label">oversample</label>
            <input type="text" name="oversample" :id="`waveshaper-oversample-${index}`"
                class="form-control form-control-sm" :list="`waveshaper-oversample-list-${index}`"
                v-model="model.node.oversample">
            <datalist :id="`waveshaper-oversample-list-${index}`">
                <option>2x</option>
                <option>4x</option>
                <option>none</option>
            </datalist>
        </div>
        <div class="mb-3">
            <label :for="`waveshaper-length-${index}`" class="form-label">curve.length</label>
            <input type="number" name="length" :id="`waveshaper-length-${index}`" class="form-control form-control-sm"
                min="0" v-model="curveLength">
        </div>
        <div class="mb-3">
            <label class="form-label">curve [-1, 1]</label>
            <div class="overflow-auto d-flex flex-row">
                <input v-for="(v, i) of model.node.curve!" :key="i" type="range" :name="`waveshaper-curve-point-${i}`"
                    :id="`waveshaper-curve-point-${i}-${index}`" class="a-waveshaper"
                    :list="`waveshaper-curve-list-${index}`" min="-1" max="1" step="0.01" :value="model.node.curve![i]"
                    @input="setArray(model.node.curve!, i, $event!)">
            </div>
        </div>

        <datalist :id="`waveshaper-curve-list-${index}`">
            <option>0</option>
        </datalist>
    </AppNode>
</template>

<style>
.a-waveshaper {
    direction: rtl;
    writing-mode: vertical-lr;
    height: 100px;
    width: 1.5rem;
    appearance: slider-vertical;
}
</style>
