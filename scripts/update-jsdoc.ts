import * as fs from "fs";
import { execSync } from "child_process";

interface GitUser {
  name: string;
  email: string;
}

// Get git user info
const getGitUser = (): GitUser => {
  try {
    const name = execSync("git config user.name", { encoding: "utf-8" }).trim();
    const email = execSync("git config user.email", {
      encoding: "utf-8",
    }).trim();
    return { name, email };
  } catch (error) {
    return { name: "Unknown", email: "unknown@example.com" };
  }
};

// Get current date
const getCurrentDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

// Update JSDoc in file
const updateJSDoc = (filePath: string): boolean => {
  try {
    let content = fs.readFileSync(filePath, "utf-8");
    const { name, email } = getGitUser();
    const currentDate = getCurrentDate();

    const modifiedByPattern = /@modifiedBy\s+.+?\s+on\s+\d{4}-\d{2}-\d{2}/g;
    const newModifiedBy = `@modifiedBy  ${name} <${email}> on ${currentDate}`;

    if (modifiedByPattern.test(content)) {
      content = content.replace(modifiedByPattern, newModifiedBy);
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error);
    return false;
  }
};

// Get changed test files
const getChangedTestFiles = (): string[] => {
  try {
    const output = execSync("git diff --cached --name-only --diff-filter=M", {
      encoding: "utf-8",
    });

    return output
      .split("\n")
      .filter(
        (file) => file.endsWith(".spec.ts") && file.includes("src/tests/")
      )
      .filter((file) => file.length > 0);
  } catch (error) {
    console.error("❌ Error getting changed files:", error);
    return [];
  }
};

// Main execution
const main = (): void => {
  console.log("\n🔍 Checking for modified test files...\n");

  const changedFiles = getChangedTestFiles();

  if (changedFiles.length === 0) {
    console.log("ℹ️  No test files modified\n");
    return;
  }

  console.log(`📝 Found ${changedFiles.length} modified test file(s):\n`);
  changedFiles.forEach((file) => console.log(`   - ${file}`));
  console.log("");

  let updated = 0;
  changedFiles.forEach((file) => {
    if (updateJSDoc(file)) {
      updated++;
      // Re-add the file to staging
      try {
        execSync(`git add ${file}`);
      } catch (error) {
        console.error(`❌ Error re-staging ${file}:`, error);
      }
    }
  });

  console.log(`\n✨ Updated ${updated} file(s) with latest @modifiedBy\n`);
};

main();
