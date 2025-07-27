import { SessionStorage, Session } from "./session";

export class MemoryStorage implements SessionStorage {
  private sessions: Map<string, Session> = new Map();

  async create(session: Session): Promise<Session> {
    this.sessions.set(session.id, session);
    return session;
  }

  async touch(session: Session): Promise<void> {
    const existingSession = this.sessions.get(session.id);
    if (existingSession) {
      existingSession.touchedAt = new Date();
      this.sessions.set(session.id, existingSession);
    }
  }

  async findById(sessionId: string): Promise<Session | null> {
    return this.sessions.get(sessionId) || null;
  }

  async delete(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }
}
