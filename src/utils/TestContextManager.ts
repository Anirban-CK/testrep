import * as fs from "fs";
import * as path from "path";

class TestContextManager {
  private static instance: TestContextManager;
  private currentTestFile: string | null = null;
  private sessionId: string;
  private logsBaseDir: string;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.logsBaseDir = path.join(process.cwd(), "logs", this.sessionId);
    this.createLogsDirectory();
  }

  public static getInstance(): TestContextManager {
    if (!TestContextManager.instance) {
      TestContextManager.instance = new TestContextManager();
    }
    return TestContextManager.instance;
  }

  private generateSessionId(): string {
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\./g, "-")
      .substring(0, 19);
    return `session_${timestamp}`;
  }

  private createLogsDirectory(): void {
    if (!fs.existsSync(this.logsBaseDir)) {
      fs.mkdirSync(this.logsBaseDir, { recursive: true });
    }
  }

  public setCurrentTest(testTitle: string): void {
    // Sanitize test title for filename
    const sanitized = testTitle
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 100);

    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\./g, "-")
      .substring(11, 19);

    this.currentTestFile = path.join(
      this.logsBaseDir,
      `${sanitized}_${timestamp}.log`
    );

    // Write test header
    this.writeToTestLog(`
${"=".repeat(100)}
TEST: ${testTitle}
STARTED: ${new Date().toISOString()}
${"=".repeat(100)}
`);
  }

  public getCurrentTestFile(): string | null {
    return this.currentTestFile;
  }

  public writeToTestLog(message: string): void {
    if (this.currentTestFile) {
      fs.appendFileSync(this.currentTestFile, message + "\n");
    }
  }

  public clearCurrentTest(): void {
    if (this.currentTestFile) {
      this.writeToTestLog(`
${"=".repeat(100)}
TEST ENDED: ${new Date().toISOString()}
${"=".repeat(100)}
`);
    }
    this.currentTestFile = null;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public getLogsBaseDir(): string {
    return this.logsBaseDir;
  }
}

export const testContextManager = TestContextManager.getInstance();
