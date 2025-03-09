<script setup lang="ts">
import { reactive } from 'vue';
import { DynamicsCompressor } from '../models/DynamicsCompressor';
import NodeComponent from './NodeComponent.vue';

defineProps<{
    index: number;
}>();

const model = reactive(new DynamicsCompressor());

</script>

<template>
    <NodeComponent :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`dynamicscompressor-attack-${index}`" class="form-label">attack [0, 1]</label>
            <input type="number" name="attack" :id="`dynamicscompressor-attack-${index}`"
                class="form-control form-control-sm" min="0" max="1" step="0.1" v-model="model.node.attack.value">
        </div>
        <div class="mb-3">
            <label :for="`dynamicscompressor-knee-${index}`" class="form-label">knee [0, 40]</label>
            <input type="number" name="knee" :id="`dynamicscompressor-knee-${index}`"
                class="form-control form-control-sm" min="0" max="40" v-model="model.node.knee.value">
        </div>
        <div class="mb-3">
            <label :for="`dynamicscompressor-ratio-${index}`" class="form-label">ratio [1, 20]</label>
            <input type="number" name="ratio" :id="`dynamicscompressor-ratio-${index}`"
                class="form-control form-control-sm" min="1" max="20" v-model="model.node.ratio.value">
        </div>
        <div class="mb-3">
            <label :for="`dynamicscompressor-reduction-${index}`" class="form-label">reduction</label>
            <input type="number" name="reduction" :id="`dynamicscompressor-reduction-${index}`"
                class="form-control form-control-sm" v-model="model.node.reduction" disabled>
        </div>
        <div class="mb-3">
            <label :for="`dynamicscompressor-release-${index}`" class="form-label">release [0, 1]</label>
            <input type="number" name="release" :id="`dynamicscompressor-release-${index}`"
                class="form-control form-control-sm" min="0" max="1" step="0.1" v-model="model.node.release.value">
        </div>
        <div class="mb-3">
            <label :for="`dynamicscompressor-threshold-${index}`" class="form-label">threshold [-100, 0]</label>
            <input type="number" name="threshold" :id="`dynamicscompressor-threshold-${index}`"
                class="form-control form-control-sm" min="-100" max="0" v-model="model.node.threshold.value">
        </div>
    </NodeComponent>
</template>