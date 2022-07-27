#!/usr/bin/env node

import childProcess from "node:child_process";
import { promisify } from "util";
import rulesByDesktop from "./rulesByDesktop.json" assert { type: "json" };
import configRules from "./configRules.json" assert { type: "json" };

const exec = promisify(childProcess.exec);

const addRule = async ({ className, desktop, follow }) => {
  let command = `bspc rule -a ${className} desktop='^${desktop}'`;
  if (follow) command += " follow=on";
  await exec(command);
};

const addConfigRule = async ({ arg, param }) => {
  const command = `bspc config ${arg} ${param}`;
  await exec(command);
};

const rules = rulesByDesktop.flatMap((elem) => {
  return elem.apps.map(({ className, follow,state }) => ({
    desktop: elem.desktop,
    className,
    follow,
    state: state||"tiled"
  }));
});

await exec("bspc monitor DisplayPort-0 -d 1 2 3 4 5 6 7");


let Promises = rules.map((rule) => addRule(rule));
await Promise.all(Promises);

Promises = Object.entries(configRules).map(([arg, param]) =>
  addConfigRule({ arg, param })
);
await Promise.all(Promises);

await exec("/home/stefan/.config/bspwm/autostart.sh");
