import { createHash, timingSafeEqual } from 'node:crypto';
import { Toolbox } from "./toolbox";

export interface Session {
  id: string;
  userId: string;
  secretHash: Buffer;
  createdAt: Date;
  touchedAt: Date;
}

interface SessionWithToken extends Session {
  token: string;
}

export interface SessionStorage {
  create(session: Session): Promise<Session>;
  touch(session: Session): Promise<void>;
  findById(sessionId: string): Promise<Session | null>;
  delete(sessionId: string): Promise<void>;
}

export class SessionManager {
  private readonly TOKEN_SEPARATOR = '.';
  private readonly SESSION_EXPIRATION_MS = 60 * 60 * 24 * 10 * 1000; // 10 days
  private readonly TOUCH_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

  constructor(private readonly storage: SessionStorage) {}

  private hash(data: string): Buffer {
    return createHash('sha256').update(data, 'utf8').digest();
  }

  async createSession(userId: string) {
    const now = new Date();
    const id = Toolbox.generateSecureRandomString();
    const secret = Toolbox.generateSecureRandomString();
    const secretHash = this.hash(secret);

    const session: SessionWithToken = {
      id,
      userId,
      secretHash,
      createdAt: now,
      touchedAt: now,
      token: `${id}${this.TOKEN_SEPARATOR}${secret}`,
    }

    await this.storage.create({
      id: session.id,
      userId: session.userId,
      secretHash: session.secretHash,
      createdAt: session.createdAt,
      touchedAt: session.touchedAt,
    });

    return session;
  }

  async verifySession(token: string): Promise<Session | null> {
    const parts = token.split(this.TOKEN_SEPARATOR);
    if (parts.length !== 2) {
      return null;
    }

    const [id, secret] = parts;
    if (!id || !secret) {
      return null;
    }

    const now = new Date();
    const session = await this.storage.findById(id);
    if (!session) {
      return null;
    }

    // Check if session is expired
    const inactivityDuration = now.getTime() - session.createdAt.getTime();
    if (inactivityDuration >= this.SESSION_EXPIRATION_MS) {
      await this.storage.delete(session.id);
      return null;
    }

    const expectedHash = this.hash(secret);
    const isSecretValid = timingSafeEqual(session.secretHash, expectedHash);
    if (!isSecretValid) {
      return null;
    }

    // Update the touchedAt time
    if (inactivityDuration >= this.TOUCH_INTERVAL_MS) {
      const updatedSession = { ...session, touchedAt: now };
      await this.storage.touch(updatedSession);
      return updatedSession;
    }

    return session;
  }

  // Returns session details without the secret
  // Useful for injecting session into the request context
  async getSession(token: string) {
    const session = await this.verifySession(token);
    if (!session) {
      return null;
    }
    return {
      id: session.id,
      userId: session.userId,
      touchedAt: session.touchedAt,
      createdAt: session.createdAt,
    };
  }

  deleteSession(sessionId: string): Promise<void> {
    return this.storage.delete(sessionId);
  }
}
