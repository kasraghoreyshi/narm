import test, { ExecutionContext } from "ava";
import { convertCommandToTargetPackageManager } from "./src";

test("convert to npm", (t: ExecutionContext) => {
  const command = convertCommandToTargetPackageManager("yarn add react");
  t.is(command, "npm install react");
});

test("convert to npm with flags", (t: ExecutionContext) => {
  const command = convertCommandToTargetPackageManager(
    "yarn global add react --dev --optional"
  );
  t.is(command, "npm install react --save-dev --save-optional --global");
});

test("npm aliases", (t: ExecutionContext) => {
  const command = convertCommandToTargetPackageManager("npm i react -D");
  t.is(command, "yarn add react --dev");
});

test("dont change unknown flags", (t: ExecutionContext) => {
  const command = convertCommandToTargetPackageManager("yarn add react --haha");
  t.is(command, "npm install react --haha");
});

test("error on invalid package manager", (t: ExecutionContext) => {
  t.throws(
    () => {
      return convertCommandToTargetPackageManager("corn add react");
    },
    {
      instanceOf: Error,
    }
  );
});

test("error on invalid command", (t: ExecutionContext) => {
  t.throws(
    () => {
      return convertCommandToTargetPackageManager("npm add react");
    },
    {
      instanceOf: Error,
    }
  );
});
