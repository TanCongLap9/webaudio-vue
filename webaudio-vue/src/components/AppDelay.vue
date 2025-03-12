<script setup lang="ts">
import { Delay } from '../models/Delay';
import { reactive } from 'vue';
import AppNode from './AppNode.vue';

defineProps<{
    index: number
}>();

const model = reactive(new Delay());

</script>

<template>
    <AppNode :model="model" :index="index" :is-removable="true">
        <div class="mb-3">
            <label :for="`delay-delaytime-${index}`" class="form-label">delayTime [0, 1]</label>
            <input type="number" name="delaytime" :id="`delay-delaytime-${index}`" class="form-control form-control-sm"
                min="0" max="1" step="0.1" v-model="model.node.delayTime.value">
        </div>
    </AppNode>
</template>
