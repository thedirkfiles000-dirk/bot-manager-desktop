import type { ExportTarget, ExportContext } from "@/types/exportTarget";
import { buildHotChatBotsExport } from "@/utils/exportObjectBuilder";
import YAML from "yaml";

function formatByMode(obj: any, markdown: string, ctx: ExportContext): string {
  if (ctx.format === "asMarkdown") return markdown;
  if (ctx.format === "asYAML") return YAML.stringify(obj, { lineWidth: 0 });
  return JSON.stringify(obj, null, 0);
}

export const hotchatbotsTarget: ExportTarget = {
  id: "hotchatbots",
  name: "HotChatBots",
  icon: "mdi-fire",
  defaultFormat: "asYAML",
  markdownStyle: {
    headingOffset: 1,
    includeTitle: true,
    bundleDialog: true,
    hoistBoundariesMeta: false,
  },
  buildExportObject: buildHotChatBotsExport,
  fields: [
    {
      id: "hotchatbots-name",
      label: "Bot Name",
      extract: (ctx) => ctx.bot.name || "",
    },
    {
      id: "hotchatbots-intro",
      label: "Short Description",
      extract: (ctx) => ctx.bot.intro || "",
    },
    {
      id: "hotchatbots-greeting",
      label: "Greeting Message",
      extract: (ctx) => ctx.bot.greeting || "",
    },
    {
      id: "hotchatbots-background",
      label: "Character Background",
      extract: (ctx) => formatByMode(ctx.maskedObject, ctx.markdown, ctx),
    },
  ],
};
