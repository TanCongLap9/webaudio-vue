<script setup lang="ts">
import { reactive } from 'vue';
import NodeComponent from './NodeComponent.vue';
import { ChannelSplitter } from '@/models/ChannelSplitter';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new ChannelSplitter());

</script>

<template>
    <NodeComponent :index="index" :model="model" :is-removable="true">
        
    </NodeComponent>
</template>
