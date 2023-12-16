/**
 * Represents a group of students having access to an exam
 * @property {string} id The unique identifier of the group.
 * @property {string} name The name of the group.
 * @property {string} description The description of the group.
 * */
export type Group = {
  /** The unique identifier of the group. */
  id: string;
  /** The name of the group. */
  name: string;
  /** The description of the group. */
  description: string;
}
