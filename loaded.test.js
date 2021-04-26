const Application = require("spectron").Application;
const electronPath = require("electron");
const path = require("path");

jest.setTimeout(20000);
let app;

beforeAll(() => {
  app = new Application({
    path: electronPath,
    args: [path.join(__dirname)]

  });

  return app.start();
});

afterAll(function () {
  if (app && app.isRunning()) {
    return app.stop();
  }
});

 test("Displays App window", async function () {

  let windowCount = await app.client.getWindowCount();
  expect(windowCount).toBe(1);

  // expect(await app.browserWindow.isMinimized()).toBe(false);
  // // Window is visible
  // expect(await app.browserWindow.isVisible()).toBe(true);
  // // Size is correct
  // const { width, height } = await app.browserWindow.getBounds();
  // expect(width).toBeGreaterThan(0);
  // expect(height).toBeGreaterThan(0);
});

test("Header displays appropriate text", async function () {
  const headerElement = await app.client.$("h1");
  let headerText = await headerElement.getText();

  expect(headerText).toBe("Hello World!");
});
