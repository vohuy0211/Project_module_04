import searchSlice from './searchSlice';
import userSlice from './UserSlice';

export const rootReducer = {
  user: userSlice,
  search: searchSlice,
}

export default rootReducer;