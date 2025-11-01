import { test as base, Page } from "@playwright/test";
import { testOnFailure } from "./onTestFailure";
import { testOnStart } from "./onTestStart";
import { testOnEnd } from "./onTestEnd";

export const test = base.extend<{ page: Page }>({});

testOnEnd(test);
testOnFailure(test);
testOnStart(test);
