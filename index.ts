import { BasePlugin, PluginMetadata } from "@nodepolus/framework/src/api/plugin";

const pluginMetadata: PluginMetadata = {
  name: "Polus.gg Template Plugin",
  version: [1, 0, 0],
  authors: [
    {
      name: "Polus.gg",
      email: "contact@polus.gg",
      website: "https://polus.gg",
    },
  ],
  description: "NodePolus plugin generated from the template repository",
  website: "https://polus.gg",
};

export default class extends BasePlugin {
  constructor() {
    super(pluginMetadata);
  }
}
