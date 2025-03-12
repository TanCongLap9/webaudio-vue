<script setup lang="ts">
import { reactive } from 'vue';
import { Panner } from '../models/Panner';
import AppNode from './AppNode.vue';

defineProps<{
    index: number
}>();

const model = reactive(new Panner());

</script>

<template>
    <AppNode :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`panner-coneinnerangle-${index}`" class="form-label">coneInnerAngle</label>
            <input type="number" name="coneinnerangle" :id="`panner-coneinnerangle-${index}`"
                class="form-control form-control-sm" v-model="model.node.coneInnerAngle">
        </div>
        <div class="mb-3">
            <label :for="`panner-coneouterangle-${index}`" class="form-label">coneOuterAngle</label>
            <input type="number" name="coneouterangle" :id="`panner-coneouterangle-${index}`"
                class="form-control form-control-sm" v-model="model.node.coneOuterAngle">
        </div>
        <div class="mb-3">
            <label :for="`panner-coneoutergain-${index}`" class="form-label">coneOuterGain</label>
            <input type="number" name="coneoutergain" :id="`panner-coneoutergain-${index}`"
                class="form-control form-control-sm" min="0" max="1" step="0.1" v-model="model.node.coneOuterGain">
        </div>
        <div class="mb-3">
            <label :for="`panner-distancemodel-${index}`" class="form-label">distanceModel</label>
            <input type="text" name="distancemodel" :id="`panner-distancemodel-${index}`"
                class="form-control form-control-sm" v-model="model.node.distanceModel"
                :list="`panner-distancemodel-list-${index}`">
            <datalist :id="`panner-distancemodel-list-${index}`">
                <option>exponential</option>
                <option>inverse</option>
                <option>linear</option>
            </datalist>
        </div>
        <div class="mb-3">
            <label :for="`panner-maxdistance-${index}`" class="form-label">maxDistance</label>
            <input type="number" name="maxdistance" :id="`panner-maxdistance-${index}`"
                class="form-control form-control-sm" min="1" v-model="model.node.maxDistance">
        </div>
        <div class="mb-3">
            <label :for="`panner-orientationx-${index}`" class="form-label">orientationX</label>
            <input type="number" name="orientationx" :id="`panner-orientationx-${index}`"
                class="form-control form-control-sm" v-model="model.node.orientationX.value">
        </div>
        <div class="mb-3">
            <label :for="`panner-orientationy-${index}`" class="form-label">orientationY</label>
            <input type="number" name="orientationy" :id="`panner-orientationy-${index}`"
                class="form-control form-control-sm" v-model="model.node.orientationY.value">
        </div>
        <div class="mb-3">
            <label :for="`panner-orientationz-${index}`" class="form-label">orientationZ</label>
            <input type="number" name="orientationz" :id="`panner-orientationz-${index}`"
                class="form-control form-control-sm" v-model="model.node.orientationZ.value">
        </div>
        <div class="mb-3">
            <label :for="`panner-panningmodel-${index}`" class="form-label">panningModel</label>
            <input type="text" name="panningmodel" :id="`panner-panningmodel-${index}`"
                class="form-control form-control-sm" v-model="model.node.panningModel"
                :list="`panner-panningmodel-list-${index}`">
            <datalist :id="`panner-panningmodel-list-${index}`">
                <option>equalpower</option>
                <option>HRTF</option>
            </datalist>
        </div>
        <div class="mb-3">
            <label :for="`panner-positionx-${index}`" class="form-label">positionX</label>
            <input type="number" name="positionx" :id="`panner-positionx-${index}`" class="form-control form-control-sm"
                v-model="model.node.positionX.value">
        </div>
        <div class="mb-3">
            <label :for="`panner-positiony-${index}`" class="form-label">positionY</label>
            <input type="number" name="positiony" :id="`panner-positiony-${index}`" class="form-control form-control-sm"
                v-model="model.node.positionY.value">
        </div>
        <div class="mb-3">
            <label :for="`panner-positionz-${index}`" class="form-label">positionZ</label>
            <input type="number" name="positionz" :id="`panner-positionz-${index}`" class="form-control form-control-sm"
                v-model="model.node.positionZ.value">
        </div>
        <div class="mb-3">
            <label :for="`panner-refdistance-${index}`" class="form-label">refDistance</label>
            <input type="number" name="refdistance" :id="`panner-refdistance-${index}`"
                class="form-control form-control-sm" min="0" v-model="model.node.refDistance">
        </div>
        <div class="mb-3">
            <label :for="`panner-rollofffactor-${index}`" class="form-label">rolloffFactor</label>
            <input type="number" name="rollofffactor" :id="`panner-rollofffactor-${index}`"
                class="form-control form-control-sm" min="0" v-model="model.node.rolloffFactor">
        </div>
    </AppNode>
</template>
