<!-- src/components/panels/BackgroundSettingPanel.vue -->
<template>
  <panel-wrapper title="Setting" subtitle="Physical and atmospheric world details.">

    <v-row>
      <v-col cols="12" md="6">
        <generic-textarea-panel
          path="background.setting.location"
          title="Location"
          helper-text="The canonical where-and-when anchor — put era, city, and broad setting all together. Example: 'Small snowy town in Vermont, present day' or 'Victorian England, 1880s London'."
          rows="3"
        />
      </v-col>
      <v-col cols="12" md="6">
        <generic-textarea-panel
          path="background.setting.specific_location"
          title="Specific Location"
          helper-text="Optional. Scene-level starting place within the broader location, when the opening spot matters to establish early."
          rows="3"
        />
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <generic-textarea-panel
          path="background.setting.environment_tone"
          title="Environment Tone"
          helper-text="Overall mood/atmosphere."
          rows="4"
        />
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <generic-textarea-panel
          path="background.setting.realism"
          title="Realism"
          helper-text="Level of realism and any custom rules."
          rows="4"
        />
      </v-col>
      <v-col cols="12" md="6">
        <generic-textarea-panel
          path="background.setting.lifestyle"
          title="Lifestyle"
          helper-text="Socioeconomic context, daily rhythms, or cultural backdrop."
          rows="4"
        />
      </v-col>
    </v-row>
  </panel-wrapper>
</template>

<script setup lang="ts">
import PanelWrapper from "@/components/PanelWrapper.vue";
import GenericTextareaPanel from "@/components/panels/GenericTextareaPanel.vue";
// No props needed — paths are fixed at bot root level
</script>
