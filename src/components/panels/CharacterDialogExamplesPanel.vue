<!-- src/components/panels/CharacterDialogExamplesPanel.vue -->
<template>
  <panel-wrapper title="Dialog Examples" subtitle="Up to 4 few-shot examples of voice/style/tone (2–4 recommended). Empty slots are skipped on export." :max-width="1200">

    <!-- Fixed 4 Example Cards -->
    <v-row density="compact">
      <v-col v-for="slotIdx in 4" :key="slotIdx" cols="12" md="6" lg="4">
        <v-card
          variant="outlined"
          :color="hasContent(slotIdx - 1) ? 'primary' : 'grey-darken-3'"
          class="mb-4 h-100 d-flex flex-column"
        >
          <v-card-title class="text-subtitle-1 d-flex align-center">
            Example {{ slotIdx }}
            <override-badges
              :path="`${charPrefix}.dialog_examples.example_${slotIdx - 1}`"
              class="ml-2"
            />
            <v-spacer />
            <v-btn
              v-if="hasContent(slotIdx - 1)"
              icon="mdi-delete"
              size="small"
              variant="text"
              color="error"
              @click="clearExample(slotIdx - 1)"
            />
          </v-card-title>

          <v-card-text class="flex-grow-1">
            <div v-if="!editingSlot || editingSlot !== slotIdx - 1">
              <div
                v-if="exampleLines(slotIdx - 1).length === 0"
                class="text-caption text-medium-emphasis text-center py-6"
              >
                Empty — click Edit to add lines
              </div>

              <div v-else class="example-preview">
                <div
                  v-for="(line, i) in exampleLines(slotIdx - 1)"
                  :key="`${slotIdx}-${i}`"
                  class="mb-2"
                >
                  <strong>{{ line.speaker || "??" }}:</strong>
                  {{ line.line }}
                </div>
              </div>
            </div>

            <!-- Edit button when not editing -->
            <div
              class="text-center mt-4"
              v-if="!editingSlot || editingSlot !== slotIdx - 1"
            >
              <v-btn
                color="primary"
                variant="tonal"
                @click="startEditing(slotIdx - 1)"
              >
                Edit Example
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ── Line Editor Dialog ─────────────────────────────────────── -->
    <v-dialog v-model="editorDialog" max-width="900" persistent scrollable>
      <v-card>
        <v-card-title class="d-flex align-center">
          <span
            >Editing Example
            {{ editingSlot !== null ? editingSlot + 1 : "?" }}</span
          >
          <v-spacer />
          <override-badges
            v-if="editingSlot !== null"
            :path="`${charPrefix}.dialog_examples.example_${editingSlot}`"
          />
        </v-card-title>

        <v-card-text>
          <table class="line-editor-table">
            <thead>
              <tr>
                <th class="line-editor-table__col--speaker">Speaker</th>
                <th class="line-editor-table__col--line">Line</th>
                <th class="line-editor-table__col--actions"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in editingLines" :key="index">
                <td>
                  <v-text-field
                    v-model="item.speaker"
                    variant="outlined"
                    density="compact"
                    hide-details
                    placeholder="Character / User"
                  />
                </td>
                <td>
                  <v-textarea
                    v-model="item.line"
                    variant="outlined"
                    density="compact"
                    auto-grow
                    rows="2"
                    hide-details
                    placeholder="Dialogue line..."
                  />
                </td>
                <td class="text-end">
                  <v-btn
                    icon="mdi-delete"
                    size="small"
                    variant="text"
                    color="error"
                    @click="removeLine(index)"
                  />
                </td>
              </tr>
              <tr v-if="editingLines.length === 0">
                <td colspan="3" class="text-center text-medium-emphasis pa-4">
                  No lines yet — click Add Line below
                </td>
              </tr>
            </tbody>
          </table>

          <v-btn
            color="primary"
            variant="outlined"
            prepend-icon="mdi-plus"
            class="mt-4"
            @click="addLine"
          >
            Add Line
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeEditor">Cancel</v-btn>
          <v-btn
            color="primary"
            variant="tonal"
            :disabled="editingLines.length === 0"
            @click="saveAndClose"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </panel-wrapper>
</template>

<script setup lang="ts">
import PanelWrapper from "@/components/PanelWrapper.vue";
import { computed, ref } from "vue";
import { useBotStore } from "@/stores/botStore";
import { fieldPath } from "@/types/fieldPath";
import OverrideBadges from "@/components/OverrideBadges.vue";
import type { DialogLineBlock } from "@/types/botSchema";
import { useVariantAnyField } from "@/composables/useVariantAnyField.ts";

// ── Props ────────────────────────────────────────────────────────
const props = defineProps<{
  charPrefix: string; // e.g. "character.abc123"
}>();

const botStore = useBotStore();

// ── Reactive state for editor ───────────────────────────────────
const editorDialog = ref(false);
const editingSlot = ref<number | null>(null);
const editingLines = ref<DialogLineBlock[]>([]);

// ── Rated fields for each of the 4 fixed slots ──────────────────
const example0 = useVariantAnyField<DialogLineBlock[]>(
  fieldPath(`${props.charPrefix}.dialog_examples.example_0`),
  [],
);
const example1 = useVariantAnyField<DialogLineBlock[]>(
  fieldPath(`${props.charPrefix}.dialog_examples.example_1`),
  [],
);
const example2 = useVariantAnyField<DialogLineBlock[]>(
  fieldPath(`${props.charPrefix}.dialog_examples.example_2`),
  [],
);
const example3 = useVariantAnyField<DialogLineBlock[]>(
  fieldPath(`${props.charPrefix}.dialog_examples.example_3`),
  [],
);

const examples = computed(() => [example0, example1, example2, example3]);

// ── Helpers ─────────────────────────────────────────────────────
const hasContent = (slotIdx: number) => {
  return examples.value[slotIdx]?.value?.length > 0;
};

const exampleLines = (slotIdx: number) => {
  return examples.value[slotIdx]?.value ?? [];
};

// ── Editor logic ────────────────────────────────────────────────
function startEditing(slotIdx: number) {
  editingSlot.value = slotIdx;
  editingLines.value = JSON.parse(
    JSON.stringify(examples.value[slotIdx].value || []),
  );
  editorDialog.value = true;
}

function addLine() {
  editingLines.value.push({ speaker: "", line: "" });
}

function removeLine(index: number) {
  editingLines.value.splice(index, 1);
}

function saveAndClose() {
  if (editingSlot.value === null) return;

  examples.value[editingSlot.value].value = editingLines.value.filter(
    (l) => l.speaker?.trim() || l.line?.trim(),
  );
  botStore.setDirty();
  closeEditor();
}

function closeEditor() {
  editorDialog.value = false;
  editingSlot.value = null;
  editingLines.value = [];
}

function clearExample(slotIdx: number) {
  if (confirm(`Clear Example ${slotIdx + 1}?`)) {
    examples.value[slotIdx].value = [];
    botStore.setDirty();
  }
}
</script>

<style scoped>
.example-preview {
  font-size: 0.95rem;
  line-height: 1.45;
}

.line-editor-table {
  width: 100%;
  border-collapse: collapse;
}

.line-editor-table th {
  text-align: left;
  padding: 0.5rem 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.line-editor-table td {
  padding: 0.25rem 0.5rem;
  vertical-align: top;
}

.line-editor-table__col--speaker { width: 25%; }
.line-editor-table__col--line { width: 65%; }
.line-editor-table__col--actions { width: 10%; }
</style>
