interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  data?: any;
}

class SimpleLogger {
  private logs: LogEntry[] = [];
  private readonly MAX_LOGS = 1000;

  private log(level: string, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };
    
    this.logs.push(entry);
    
    // Console output with color coding
    const styles = {
      INFO: 'color: blue',
      ERROR: 'color: red',
      WARN: 'color: orange',
      DEBUG: 'color: gray'
    };
    // Use template string and pass style as argument
    console.log(`%c[${entry.timestamp}] ${level}: ${message}`,
      styles[level as keyof typeof styles] || '',
      data || ''
    );
    
    // Keep only last MAX_LOGS entries
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS);
    }
    
    // Save to localStorage
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('app-logs', JSON.stringify(this.logs.slice(-100))); // Save only last 100
    } catch (e) {
      console.error('Failed to save logs to localStorage', e);
    }
  }

  info(message: string, data?: any) {
    this.log('INFO', message, data);
  }

  error(message: string, data?: any) {
    this.log('ERROR', message, data);
  }

  warn(message: string, data?: any) {
    this.log('WARN', message, data);
  }

  debug(message: string, data?: any) {
    this.log('DEBUG', message, data);
  }

  getLogs() {
    return this.logs;
  }

  exportLogs() {
    const dataStr = JSON.stringify(this.logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `logs_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement); // Ensure the link is in the DOM
    linkElement.click();
    document.body.removeChild(linkElement); // Clean up
  }
}

export const logger = new SimpleLogger();