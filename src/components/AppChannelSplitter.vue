<script setup lang="ts">
import { reactive } from 'vue';
import AppNode from './AppNode.vue';
import { ChannelSplitter } from '@/models/ChannelSplitter';

const { index } = defineProps<{
    index: number
}>();

const model = reactive(new ChannelSplitter());

</script>

<template>
    <AppNode :index="index" :model="model" :is-removable="true">
    </AppNode>
</template>
