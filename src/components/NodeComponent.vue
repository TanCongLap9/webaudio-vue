<script setup lang="ts">
import { onMounted, reactive, ref, type Reactive } from 'vue';
import { Node2 } from '../models/Node2';
import type { Pos } from '@/ts/Pos';

const { isRemovable, index, model } = defineProps<{
    isRemovable: boolean,
    index: number,
    model: Node2<AudioNode | AudioContext>
}>();

const isSettings = ref(false);

const pos = reactive<Pos>({
    left: 200,
    top: 200
});

onMounted(() => {
    window.nodes[model.name] = model.node;
});

const emit = defineEmits<{
    (type: "down", e: MouseEvent | Touch, model: Node2<AudioNode | AudioContext>, pos: Reactive<Pos>): void,
    (type: "up", e: MouseEvent | Touch, model: Node2<AudioNode | AudioContext>, pos: Reactive<Pos>): void,
    (type: "dispose", model: Node2<AudioNode | AudioContext>, index: number): void
}>();

function handleMouseDown(e: MouseEvent) {
    emit("down", e, model, pos);
}

function handleTouchStart(e: TouchEvent) {
    emit("down", e.touches[0], model, pos);
}

function handleMouseUp(e: MouseEvent) {
    emit("up", e, model, pos);
}

function handleTouchEnd(e: TouchEvent) {
    emit("up", e.touches[0], model, pos);
}

</script>

<template>
    <div :class="'card position-absolute user-select-none ' + (isSettings ? 'a-displaying-settings' : '')"
        :style="{ left: `${pos.left}px`, top: `${pos.top}px` }" @mousedown="handleMouseDown" @mouseup="handleMouseUp"
        @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <div class="card-header d-flex flex-row justify-content-between align-content-center">
            <h5 class="mb-0 align-self-center me-3">{{ model.name }}</h5>
            <div class="btn-group">
                <button class="btn btn-outline-secondary btn-sm" @click="isSettings = !isSettings;">
                    <i class="fa fa-sliders" aria-hidden="true"></i>
                </button>
                <button v-if="model.runnable" class="btn btn-outline-dark btn-sm"
                    @click="!model.running ? model.start() : model.stop()">
                    <i :class="'fa ' + (model.running ? 'fa-stop' : 'fa-play')" aria-hidden="true"></i>
                </button>
                <button v-if="isRemovable" class="btn btn-outline-danger btn-sm"
                    @click="emit('dispose', model, index)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div v-show="isSettings" class="card-body overflow-auto">
            <slot></slot>
        </div>
        <div v-if="model.connectionsFrom.length" class="card-footer pb-0">
            <p v-for="(connection, i) of model.connectionsFrom" :key="i" class="lh-1">&#x2192; {{ connection }}</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    min-width: 200px;
}

.a-displaying-settings {
    min-width: 350px;
}

.card-body {
    max-height: 300px;
}
</style>