import { BoardContent } from '../../models/board-content.model';
import { BoardPreview } from '../../models/board-preview.model';

export interface BoardState {
  previewList: {
    boardsPreview: BoardPreview[];
    errorMessage: string | null;
  };
  boardContent: {
    boardContent: BoardContent | null;
    errorMessage: string | null;
  };
}
