import produce from 'immer';

import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce<
  (state: CellsState | undefined, action: Action) => CellsState
>((state = initialState, action) => {
  switch (action.type) {
    case ActionType.MOVE_CELL: {
      const { id, direction } = action.payload;
      const index = state.order.findIndex((cellId) => cellId === id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;

      return state;
    }
    case ActionType.UPDATE_CELL: {
      const { id, content } = action.payload;
      state.data[id].content = content;

      return state;
    }
    case ActionType.DELETE_CELL: {
      const { id } = action.payload;
      delete state.data[id];
      state.order = state.order.filter((valIdx: string) => valIdx !== id);

      return state;
    }
    case ActionType.INSERT_CELL_AFTER: {
      const { id, type } = action.payload;
      const cell: Cell = {
        type,
        id: randomId(),
        content: '',
      };

      state.data[cell.id] = cell;

      const index = state.order.findIndex((cellId) => cellId === id);

      if (index < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }

      return state;
    }
    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
