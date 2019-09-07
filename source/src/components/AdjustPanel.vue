<template>
    <div class="adjust_panel">
        <component v-bind:is="COMPONENT_ADJUST_PANEL_INSTR"
                    class="instruction"
                    v-bind:mouthOpened="mouthOpened"
                    v-on="instrCustomEvents"
                    v-if="userSelectMouthOpenedMode"></component>
        <component v-bind:is="COMPONENT_ADJUST_PANEL_PTS" class="points" v-bind:mouthOpened="mouthOpened"></component>
        <component v-bind:is="COMPONENT_ADJUST_PANEL_CTA" class="cta" v-bind:mouthOpened="mouthOpened"></component>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AdjustPanelPoints from './AdjustPanelPoints.vue';
    import AdjustPanelInstruction from './AdjustPanelInstruction.vue';
    import AdjustPanelCta from './AdjustPanelCta.vue';
    import { COMPONENT_ADJUST_PANEL, COMPONENT_ADJUST_PANEL_INSTR, COMPONENT_ADJUST_PANEL_PTS, COMPONENT_ADJUST_PANEL_CTA,
        EVENT_MOUTH_CHECKBOX, COORDS_MOUTH_OPEN, 
        UI_OPTION_FORCE_OPEN_MOUTH } from '../utils/constants.js';

    export default {
        name: COMPONENT_ADJUST_PANEL,
        data() {
            return {
                COMPONENT_ADJUST_PANEL_INSTR,
                COMPONENT_ADJUST_PANEL_PTS,
                COMPONENT_ADJUST_PANEL_CTA,
                instrCustomEvents: {
                    [EVENT_MOUTH_CHECKBOX]: this.toggleMouth,
                },
            };
        },
        computed: {
            ...mapGetters({
                photoModuleCoords: 'photoModuleCoords',
                uiOption: 'uiOption',
            }),
            mouthOpened() {
                return this.photoModuleCoords[COORDS_MOUTH_OPEN];
            },
            userSelectMouthOpenedMode() {
                return !this.uiOption(UI_OPTION_FORCE_OPEN_MOUTH);
            }
        },
        components: {
            AdjustPanelPoints,
            AdjustPanelInstruction,
            AdjustPanelCta
        },
        methods: {
            ...mapActions({
                adjustPhotoCoords: 'adjustPhotoCoords'
            }),
            toggleMouth() {
                this.adjustPhotoCoords({
                    feature: COORDS_MOUTH_OPEN,
                    coord: !this.mouthOpened
                });
            }
        }
    };
</script>

<style scoped>
    .adjust_panel {
        --instr-height: 20%;
        --cta-height: 22%;
        --pts-height: calc(100% - var(--instr-height) - var(--cta-height));
    }
    .adjust_panel > .instruction {
        width: 100%;
        height: var(--instr-height);
    }
    .adjust_panel > .points {
        position:absolute;
        bottom: var(--cta-height);
        width: 100%;
        height: var(--pts-height);
    }
    .adjust_panel > .cta {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: var(--cta-height);
    }
</style>


// WEBPACK FOOTER //
// src/components/AdjustPanel.vue