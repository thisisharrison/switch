const childProcess = require("child_process");

function spawn(command, arguments) {
    const isWindows = process.platform === "win32";
    const result = childProcess.spawnSync(isWindows ? command + ".cmd" : command, arguments, {stdio: "inherit"});
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }
    if (result.status !== 0) {
        console.error(`Error while checking: ${command} ${arguments.join(" ")}`);
        process.exit(1);
    }
}

function checkPrettier() {
    console.info("Check Prettier ...");
    spawn("prettier", ["--config", "./prettier.json", "--list-different", "src/**/*.{ts,tsx,js,jsx,css}"]);
}

function checkTypeScript() {
    console.info("Check TypeScript ...");
    spawn("tsc", ["-p", "./tsconfig.json"]);
}

function checkLint() {
    console.info("Check Lint ...");
    spawn("tslint", ["--config", "./tslint.json", "src/**/*.{ts,tsx,js,jsx}"]);
    spawn("stylelint", ["--config", "./stylelint.json", "src/**/*.css"]);
}

function run() {
    checkPrettier();
    checkTypeScript();
    checkLint();
    console.info("Code check successfully!");
}

run();
