import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";

class SessionManager {
  private static instance: SessionManager;
  private sessionId: string;
  private sessionStartTime: Date;
  private sessionDir: string;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = new Date();
    this.sessionDir = this.createSessionDirectory();
    this.saveSessionMetadata();
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  private generateSessionId(): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const uuid = uuidv4().substring(0, 8);
    return `session_${timestamp}_${uuid}`;
  }

  private createSessionDirectory(): string {
    const baseDir = path.join(process.cwd(), "logs", "sessions");
    const sessionDir = path.join(baseDir, this.sessionId);

    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir, { recursive: true });
    }

    return sessionDir;
  }

  private saveSessionMetadata(): void {
    const metadata = {
      sessionId: this.sessionId,
      startTime: this.sessionStartTime.toISOString(),
      environment: process.env.ENV || "dev",
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      command: process.argv.join(" "),
    };

    const metadataPath = path.join(this.sessionDir, "session-metadata.json");
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public getSessionDir(): string {
    return this.sessionDir;
  }

  public getSessionStartTime(): Date {
    return this.sessionStartTime;
  }

  public getSessionDuration(): number {
    return Date.now() - this.sessionStartTime.getTime();
  }

  public endSession(summary?: any): void {
    const endTime = new Date();
    const duration = this.getSessionDuration();

    const sessionSummary = {
      sessionId: this.sessionId,
      startTime: this.sessionStartTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: `${Math.floor(duration / 1000)}s`,
      durationMs: duration,
      ...summary,
    };

    const summaryPath = path.join(this.sessionDir, "session-summary.json");
    fs.writeFileSync(summaryPath, JSON.stringify(sessionSummary, null, 2));

    console.log(`\n${"=".repeat(80)}`);
    console.log(`📊 SESSION SUMMARY`);
    console.log(`${"=".repeat(80)}`);
    console.log(`Session ID: ${this.sessionId}`);
    console.log(`Duration: ${sessionSummary.duration}`);
    console.log(`Logs Directory: ${this.sessionDir}`);
    console.log(`${"=".repeat(80)}\n`);
  }
}

export const sessionManager = SessionManager.getInstance();
