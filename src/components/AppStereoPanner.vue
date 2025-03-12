<script setup lang="ts">
import { reactive } from 'vue';
import { StereoPanner } from '../models/StereoPanner';
import AppNode from './AppNode.vue';

defineProps<{
    index: number
}>();

const model = reactive(new StereoPanner());

</script>

<template>
    <AppNode :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`stereopanner-pan-${index}`" class="form-label">pan</label>
            <input type="number" name="pan" :id="`stereopanner-pan-${index}`" class="form-control form-control-sm"
                min="-1" max="1" step="0.1" v-model="model.node.pan.value">
        </div>
    </AppNode>
</template>
