export interface BoardMetadata {
  id: string;
  name: string;
  owner: string;
  admins: string[];
  members: string[];
  taskListsIds: string[];
}
