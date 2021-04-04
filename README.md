# Threejs Discord Bot

<br />
<p align="center">
  <a href="https://threejs.org">
    <img src="https://github.com/mrdoob/three.js/blob/master/icon.png?raw=true" alt="three.js Logo" width="80" height="80">
  </a>

  <h3 align="center">Three.js Helper</h3>

  <p align="center">
    Discord bot for the <a href="https://discord.gg/HF4UdyF">three.js Discord server</a>.
    <br />
    <a href="https://github.com/threejs/discord-bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/threejs/discord-bot/issues">Request Feature</a>
    <br />
    <br />
    <a href="https://discord.gg/HF4UdyF">
      <img src="https://img.shields.io/discord/740090768164651008?style=flat&colorA=FFFFFF&colorB=FFFFFF&label=Discord&logo=discord" alt="Discord" />
    </a>
  </p>
</p>

## Install & run

Make sure you have nodejs and yarn installed. Install dependencies with:

```bash
yarn
```

Once it's done start up the bot with:

```bash
yarn start
```

To run tests:

```bash
yarn test
```

## Configure Credentials

Discord requires authentication in order to use bot/interaction features.

To setup a bot for local/production use, you will need to specify credentials in a file.

**Note**: you will have to add the bot to a server with the `applications.commands` scope to invoke slash commands.

**.env** (do not commit)

```yaml
# Used for authentication with Discord
TOKEN="bot token"

# Used for local testing of slash commands
GUILD="guild ID"
```
