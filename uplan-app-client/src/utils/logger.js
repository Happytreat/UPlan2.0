const logger = console;

const trace = (...args) => {
  logger.trace(...args);
};

const debug = (...args) => {
  logger.debug(...args);
};

const info = (...args) => {
  logger.info(...args);
};

const warn = (...args) => {
  logger.warn(...args);
};

const error = (...args) => {
  logger.error(...args);
};

const fatal = (...args) => {
  logger.fatal(...args);
};

export default {
  trace,
  debug,
  info,
  warn,
  error,
  fatal,
};
