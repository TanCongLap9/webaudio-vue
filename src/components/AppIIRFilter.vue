<script setup lang="ts">
import { reactive } from 'vue';
import AppNode from './AppNode.vue';
import { IIRFilter } from '@/models/IIRFilter';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new IIRFilter([1, 2], [3, 4]));

</script>

<template>
    <AppNode :index="index" :model="model" :is-removable="true">
    </AppNode>
</template>
