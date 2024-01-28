/**
 * Represents a user.
 * @property {string} id The unique identifier of the user.
 * @property {string} firstName The first name of the user.
 * @property {string} lastName The last name of the user.
 * @property {string} email The email of the user.
 * @property {'student' | 'teacher'} type The type of the user.
 */
export type User = {
  /** The unique identifier of the user. */
  id: string;
  /** The first name of the user. */
  firstName: string;
  /** The last name of the user. */
  lastName: string;
  /** The email of the user. */
  email: string;
  /** The type of the user. */
  type: 'student' | 'teacher';
}

/**
 * Represents a professor.
 * @property {string} id The id of the professor.
 * @property {string} firstName The first name of the professor.
 * @property {string} lastName The last name of the professor.
 * @property {string} email The email of the professor.
 * @property {'teacher'} type The type of the professor.
 */
export type Professor = User & {
  /**
  * The type of the professor.
  * @default 'teacher'
  * */
  type: 'teacher';
}

/**
 * Represents a student.
 * @property {string} id The id of the student.
 * @property {string} firstName The first name of the student.
 * @property {string} lastName The last name of the student.
 * @property {string} email The email of the student.
 * @property {'student'} type The type of the student.
 */
export type Student = User & {
  /**
   * The type of the student.
   * @default 'student'
   * */
  type: 'student';
}
