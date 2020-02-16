import * as HttpStatus from 'http-status-codes';

import Error from './Error';

/**
 * @class UniqueUserError
 * @extends {Error}
 */
class UniqueUserError extends Error {
  /**
   * Error message to be thrown.
   *
   * @type {string}
   * @memberof UniqueUserError
   */
  message: string;

  /**
   * Creates an instance of UniqueUserError.
   *
   * @param {string} message
   * @memberof UniqueUserError
   */
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);

    this.message = message;
  }
}

export default UniqueUserError;
