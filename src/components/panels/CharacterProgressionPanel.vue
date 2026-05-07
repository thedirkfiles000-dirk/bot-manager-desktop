<!-- src/components/panels/CharacterProgressionPanel.vue -->
<template>
  <panel-wrapper
    title="Progression Phases"
    subtitle="Soft behavioral shifts keyed to message-count windows. 'From' is when the LLM should start looking for a natural moment to initiate the shift. 'To' is the abandon point — if the shift hasn't happened by then, stop pushing for it. Once a shift lands, it persists until another shift overrides it."
    :max-width="1200"
  >

    <v-btn
      color="primary"
      size="small"
      class="mb-4"
      prepend-icon="mdi-plus"
      @click="openEditor(null)"
    >
      Add Phase
    </v-btn>

    <!-- Phases shown in ascending from_message order -->
    <v-row density="compact">
      <v-col
        v-for="entry in sortedEntries"
        :key="entry._key"
        cols="12"
        md="6"
        xl="4"
      >
        <v-card class="h-100 pa-4" variant="outlined" hover @click="openEditor(entry._originalIndex)">
          <v-card-title class="d-flex align-center pb-1">
            <v-chip size="small" color="primary" variant="tonal" class="mr-2">
              {{ rangeLabel(entry) }}
            </v-chip>
            <v-chip size="small" :color="shiftTypeColor(entry.shift_type)" variant="tonal">
              {{ entry.shift_type || "Phase" }} Shift
            </v-chip>
          </v-card-title>
          <v-card-text class="text-body-2 pt-2">{{ entry.description || "No description" }}</v-card-text>
          <v-card-actions class="justify-end pt-0">
            <v-btn icon="mdi-delete" size="x-small" color="error" variant="plain" @click.stop="removeEntry(entry._originalIndex)" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="localEntries.length === 0" class="text-center text-medium-emphasis py-12">
      No progression phases defined yet.
    </div>

    <v-dialog v-model="editorDialog" max-width="600">
      <v-card>
        <v-card-title>{{ editingIndex === null ? "Add" : "Edit" }} Phase</v-card-title>
        <v-card-text>
          <v-row density="compact">
            <v-col cols="12" sm="4">
              <v-select
                v-model="editingEntry.shift_type"
                :items="['Phase', 'Narrative', 'Tone']"
                label="Shift Type"
                variant="outlined"
                density="compact"
                hint="How to classify this shift"
                persistent-hint
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model.number="editingEntry.from_message"
                label="From Message #"
                type="number"
                variant="outlined"
                density="compact"
                :min="0"
                hint="Start looking for a natural moment to initiate this shift"
                persistent-hint
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model.number="editingEntry.to_message"
                label="Abandon After Message # (optional)"
                type="number"
                variant="outlined"
                density="compact"
                :min="1"
                hint="Stop pushing for it after this point if it hasn't happened"
                persistent-hint
                clearable
              />
            </v-col>
          </v-row>
          <v-textarea
            v-model="editingEntry.description"
            label="Description"
            variant="outlined"
            density="compact"
            auto-grow
            rows="5"
            class="mt-4"
            hint="What changes during this message range — tone, behavior, environment, etc."
            persistent-hint
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeEditor">Cancel</v-btn>
          <v-btn color="primary" variant="tonal" @click="saveEditor" :disabled="!editingEntry.description">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </panel-wrapper>
</template>

<script setup lang="ts">
import PanelWrapper from "@/components/PanelWrapper.vue";
import { computed, ref, watch } from "vue";
import { useVariantAnyField } from "@/composables/useVariantAnyField.ts";
import { fieldPath } from "@/types/fieldPath";
import type { ProgressionPhase } from "@/types/botSchema";

const props = defineProps<{
  charPrefix: string;
}>();

interface PhaseRow extends ProgressionPhase {
  _key: string;
  _originalIndex: number;
}

const phases = useVariantAnyField<ProgressionPhase[]>(
  fieldPath(`${props.charPrefix}.progression_phases`),
  [],
);

const localEntries = ref<PhaseRow[]>([]);

watch(
  phases,
  (newVal) => {
    localEntries.value = (newVal || []).map((row, i) => ({
      ...row,
      _key: `phase-${i}-${Date.now()}`,
      _originalIndex: i,
    }));
  },
  { immediate: true },
);

const sortedEntries = computed(() =>
  [...localEntries.value].sort((a, b) => a.from_message - b.from_message),
);

function rangeLabel(phase: ProgressionPhase): string {
  if (phase.to_message != null) {
    return `msg ${phase.from_message}–${phase.to_message}`;
  }
  return `msg ${phase.from_message}+`;
}

function shiftTypeColor(type?: string): string {
  if (type === "Narrative") return "secondary";
  if (type === "Tone") return "warning";
  return "primary";
}

const editorDialog = ref(false);
const editingIndex = ref<number | null>(null);
const editingEntry = ref<ProgressionPhase>({ shift_type: "Phase", from_message: 0, description: "" });

function openEditor(index: number | null) {
  editingIndex.value = index;
  if (index === null) {
    editingEntry.value = { shift_type: "Phase", from_message: 0, description: "" };
  } else {
    editingEntry.value = JSON.parse(JSON.stringify(localEntries.value[index]));
  }
  editorDialog.value = true;
}

function closeEditor() {
  editorDialog.value = false;
  editingEntry.value = { shift_type: "Phase", from_message: 0, description: "" };
  editingIndex.value = null;
}

function saveEditor() {
  const { _key: _k, _originalIndex: _oi, ...clean } = editingEntry.value as PhaseRow;
  // Normalize: if to_message is falsy (0, null, undefined, empty string), drop it
  if (!clean.to_message) delete clean.to_message;
  if (editingIndex.value === null) {
    const newKey = Date.now().toString();
    const newIdx = localEntries.value.length;
    localEntries.value.push({ ...clean, _key: newKey, _originalIndex: newIdx });
  } else {
    const existing = localEntries.value[editingIndex.value];
    localEntries.value[editingIndex.value] = { ...clean, _key: existing._key, _originalIndex: existing._originalIndex };
  }
  phases.value = localEntries.value.map(({ _key: _k, _originalIndex: _oi, ...rest }) => rest);
  closeEditor();
}

function removeEntry(index: number) {
  localEntries.value.splice(index, 1);
  phases.value = localEntries.value.map(({ _key: _k, _originalIndex: _oi, ...rest }) => rest);
}
</script>
