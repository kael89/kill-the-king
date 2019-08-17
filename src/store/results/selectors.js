import { isEmpty } from 'lodash';

export const isCheckmateFound = ({ results }) => !isEmpty(results.data);
