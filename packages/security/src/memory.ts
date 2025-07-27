import { SessionStorage, ISession } from "./session";

export class MemoryStorage implements SessionStorage {
  private sessions: Map<string, ISession> = new Map();

  async create(session: ISession): Promise<ISession> {
    this.sessions.set(session.id, session);
    return session;
  }

  async touch(session: ISession): Promise<void> {
    const existingSession = this.sessions.get(session.id);
    if (existingSession) {
      existingSession.touchedAt = new Date();
      this.sessions.set(session.id, existingSession);
    }
  }

  async findById(sessionId: string): Promise<ISession | null> {
    return this.sessions.get(sessionId) || null;
  }

  async delete(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }
}
