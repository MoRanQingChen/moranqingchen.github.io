<template>
    <div class="instruction_panel" v-bind:style="instructionPanelBg">
        <span class="instruction-txt">{{ uiText(adjustState) }}</span>
        <div class="mouth_check" v-if="showMouth">
            <div class="checkbox" v-on:click="toggleMouth">
                <img src="../assets/img/icon_checkmark.svg" v-if="mouthOpened">
            </div>
            <span class="mouth">{{ uiText(mouthText) }}</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { COMPONENT_ADJUST_PANEL_INSTR, EVENT_MOUTH_CHECKBOX, ADJUST_LIPS, ADJUST_MOUTH_OPEN,
            UI_OPTION_ADJUST_PANEL_GRADIENT_FROM_COLOR, UI_OPTION_ADJUST_PANEL_GRADIENT_TO_COLOR } from '../utils/constants.js';

    export default {
        name: COMPONENT_ADJUST_PANEL_INSTR,
        props: [
            'mouthOpened'
        ],
        computed: {
            ...mapGetters({
                uiText: 'uiText',
                uiOption: 'uiOption',
                adjustState : 'adjustState'
            }),
            showMouth() {
                return this.adjustState===ADJUST_LIPS;
            },
            mouthText() {
                return ADJUST_MOUTH_OPEN;
            },
            instructionPanelBg() {
                return {
                    '--grad-from': this.uiOption(UI_OPTION_ADJUST_PANEL_GRADIENT_FROM_COLOR),
                    '--grad-to': this.uiOption(UI_OPTION_ADJUST_PANEL_GRADIENT_TO_COLOR),
                };
            },
        },
        methods: {
            toggleMouth() {
                this.$emit(EVENT_MOUTH_CHECKBOX);
            }
        }
    };
</script>

<style scoped>
    .instruction_panel {
        --grad-from: rgba(0,0,0,0.3);   /* default */
        --grad-to: rgba(0,0,0,0);   /* default */

        display: flex;
        flex-direction: column;
        /* justify-content: space-around; */
        /* justify-content: space-evenly; */
        /* justify-content: space-between; */
        justify-content: start;
        align-items: center;
        box-sizing: border-box;
        padding: 6.5% 0;
        text-align: center;
        font-size: 0.7em;
        letter-spacing: 0.03em;
        color: white;
        background: linear-gradient(var(--grad-from), var(--grad-to));
    }
    .instruction-txt {
        width: 80%;
    }
    .mouth_check {
        margin-top: 1.2em;
    }
    .checkbox {
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 1px solid white;
        margin-right: 0.3em;
        vertical-align: middle;
        cursor: pointer;
    }
    .checkbox > img {
        width: 100%;
        height: 100%;
        user-select: none;
    }
    .mouth {
        vertical-align: middle;
    }
</style>



// WEBPACK FOOTER //
// src/components/AdjustPanelInstruction.vue