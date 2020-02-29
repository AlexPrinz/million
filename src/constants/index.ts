import { constants } from '@/constants/statics';
import envConfig from '../../config/envConfig';
import * as COLORS from './colors';
export const API_ROOT = `${envConfig.backend.url}${constants['BASE_URL']}`;
export const ENV = envConfig.env;
export const ANIMATION_TIME = '300';
export const RESOURCES_ROOT = `${API_ROOT}src/styles/resources`;
export const BACKGROUND_IMAGE = `${RESOURCES_ROOT}/background.jpg`;
export const SMALL_GUI_WIDTH = 900;

export { COLORS };
