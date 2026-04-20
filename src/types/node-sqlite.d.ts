declare module 'node:sqlite' {
  export interface StatementResultingChanges {
    changes: number;
    lastInsertRowid: number | bigint;
  }

  export interface StatementSync {
    get<T = unknown>(params?: unknown): T | undefined;
    all<T = unknown>(params?: unknown): T[];
    run(params?: unknown): StatementResultingChanges;
  }

  export class DatabaseSync {
    constructor(path: string, options?: { open?: boolean; readonly?: boolean });
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
