class GuildsModule {
  constructor(api) {
    this.api = api;
  }

  async getGuild(guildId) {
    return this.api.request('GET', `/guilds/${guildId}`);
  }

  async createGuild(name, region) {
    const body = { name, region };
    return this.api.request('POST', '/guilds', body);
  }
}

module.exports = GuildsModule;
