## template-cli

A CLI App to create a new project easily with some starter code

> Works best with UNIX based systems.

### Steps to install and use

- Step 1: Clone the repo with all the submodules:

```bash
git clone --recurse-submodules https://github.com/codeTIT4N/template-cli
```

- Step 2: Change directory: `cd template-cli`
- Step 3: Install `node_modules`: `npm install`
- Step 4: Run the setup script: `npm run setup`
- Step 5: Now, anywhere in your machine you can use the `template-cli` command to setup new projects.

### More commands

- Run application in dev mode: `npm run dev`

  > Using this you can directly run TypeScript in the `src` folder.

- Build application for prod use: `npm run build`

  > This will compile the TypeScript in the `src` folder and put the compiled JavaScript in the `dist` folder.

- Run the compiled JavaScript: `npm start`

  > This will run the compiled JavaScript from the previous command.

### Credits

This project is inspired by [@leoroese/template-cli](https://github.com/leoroese/template-cli)
