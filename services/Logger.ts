/**
 * Logger Service
 * 
 * A mock logging service that simulates real logging services like Sentry or Firebase Crashlytics.
 * In production, you would replace these mock implementations with actual service integrations.
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  error?: Error;
  userId?: string;
  screen?: string;
}

class LoggerService {
  private logs: LogEntry[] = [];
  private isDevelopment = __DEV__;
  private userId?: string;
  private enableConsole = true;

  /**
   * Initialize logger with user context
   */
  init(userId?: string) {
    this.userId = userId;
    this.info('Logger initialized', { userId });
  }

  /**
   * Set user ID for tracking
   */
  setUser(userId: string) {
    this.userId = userId;
    this.info('User context updated', { userId });
  }

  /**
   * Enable or disable console output
   */
  setConsoleEnabled(enabled: boolean) {
    this.enableConsole = enabled;
  }

  /**
   * Log debug information (only in development)
   */
  debug(message: string, context?: Record<string, any>) {
    if (!this.isDevelopment) return;
    
    this.log({
      level: LogLevel.DEBUG,
      message,
      timestamp: new Date(),
      context,
      userId: this.userId,
    });
  }

  /**
   * Log informational messages
   */
  info(message: string, context?: Record<string, any>) {
    this.log({
      level: LogLevel.INFO,
      message,
      timestamp: new Date(),
      context,
      userId: this.userId,
    });
  }

  /**
   * Log warnings
   */
  warn(message: string, context?: Record<string, any>) {
    this.log({
      level: LogLevel.WARN,
      message,
      timestamp: new Date(),
      context,
      userId: this.userId,
    });
  }

  /**
   * Log errors with optional Error object
   */
  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log({
      level: LogLevel.ERROR,
      message,
      timestamp: new Date(),
      error,
      context,
      userId: this.userId,
    });

    // In production, this would send to Sentry/Firebase
    if (!this.isDevelopment) {
      this.sendToRemoteService({
        level: LogLevel.ERROR,
        message,
        error,
        context,
        userId: this.userId,
      });
    }
  }

  /**
   * Log API errors
   */
  apiError(endpoint: string, error: Error, context?: Record<string, any>) {
    this.error(`API Error: ${endpoint}`, error, {
      ...context,
      endpoint,
      errorMessage: error.message,
      errorStack: error.stack,
    });
  }

  /**
   * Log navigation events
   */
  logNavigation(screen: string, params?: Record<string, any>) {
    this.info('Navigation', {
      screen,
      params,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log user actions/events
   */
  logEvent(eventName: string, properties?: Record<string, any>) {
    this.info(`Event: ${eventName}`, {
      event: eventName,
      properties,
      userId: this.userId,
    });
  }

  /**
   * Log performance metrics
   */
  logPerformance(metricName: string, duration: number, metadata?: Record<string, any>) {
    this.info(`Performance: ${metricName}`, {
      metric: metricName,
      duration: `${duration}ms`,
      ...metadata,
    });
  }

  /**
   * Internal logging method
   */
  private log(entry: LogEntry) {
    this.logs.push(entry);

    // Keep only last 100 logs in memory
    if (this.logs.length > 100) {
      this.logs.shift();
    }

    if (this.enableConsole) {
      this.logToConsole(entry);
    }
  }

  /**
   * Output to console with appropriate styling
   */
  private logToConsole(entry: LogEntry) {
    const timestamp = entry.timestamp.toISOString();
    const prefix = `[${entry.level}] ${timestamp}`;
    
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(prefix, entry.message, entry.context || '');
        break;
      case LogLevel.INFO:
        console.info(prefix, entry.message, entry.context || '');
        break;
      case LogLevel.WARN:
        console.warn(prefix, entry.message, entry.context || '');
        break;
      case LogLevel.ERROR:
        console.error(prefix, entry.message, entry.error || '', entry.context || '');
        if (entry.error?.stack) {
          console.error('Stack trace:', entry.error.stack);
        }
        break;
    }
  }

  /**
   * Mock method to simulate sending logs to a remote service
   * In production, this would integrate with Sentry, Firebase, etc.
   */
  private sendToRemoteService(entry: Partial<LogEntry>) {
    // Mock implementation
    if (this.isDevelopment) {
      console.log('📤 [MOCK] Sending to remote logging service:', {
        service: 'Sentry/Firebase',
        level: entry.level,
        message: entry.message,
        userId: entry.userId,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get all logs (useful for debugging or in-app log viewer)
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Clear all logs
   */
  clearLogs() {
    this.logs = [];
    this.info('Logs cleared');
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Export logs as JSON string
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Export singleton instance
export const Logger = new LoggerService();

// Export class for testing
export { LoggerService };
