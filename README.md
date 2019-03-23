# Toiko
A multi-purpose Discord bot that helps you manage your server 

<img src="https://forthebadge.com/images/badges/built-with-love.svg" align="center">

![avatar](https://media.discordapp.net/attachments/482888162008629251/557909358910898187/98c77dffae4d4f41e84082100535fc57.jpg)


## Development

### 1. Clone the repository
```bash
git glone git@github.com:Aiden01/toiko.git
```

### 2. Install the dependencies
```bash
# npm
npm install
# yarn
yarn install
```

### 3. Rename ``config.example.json`` to ``config.json`` and replace the values with your actual credentials

### 4. Start the bot
```
yarn dev
```

### Formatting
Run ``yarn format`` to make prettier format your code.

## Building for production

- Run the build script
```bash
# npm
npm run build
# yarn
yarn build
```
- Docker
> WIP

## Adding custom commands (Macro)

Toiko allows you to add custom commands, aka macro. It can be done with ``$addmacro``.
```
$addmacro <category> <name> <response>
```

For example, this will add a macro named ``hello`` in the category ``fun`` and the bot will respond with ``Hello, world!``.

```
$addmacro fun hello Hello, world!
$hello 
> Hello, world!
```

You can get a list of all available macros in your server using ``$listmacros``.

They can also be edited and removed with ``$editmacro`` and ``$removemacro``.

## Relevant links
* [Discord.js documentation](http://discord.js.org)
* [Discord-akairo (command framework)](https://github.com/1Computer1/discord-akairo)

Feel free to submit PRs if you see any issues or you want to improve the bot!



