import { ICurrencyOption } from '@interfaces/candidate';
import { CURRENCIES } from '@constants/currencies';
import { Validators } from '@angular/forms';

export const DEFAULT_CURRENCY = 'USD';
export const DEFAULT_CURRENCY_OPTION: ICurrencyOption = { id: DEFAULT_CURRENCY, name: CURRENCIES[DEFAULT_CURRENCY] };
export const NONE_ENGLISH_LEVEL_SYMBOL = '-';

export const ENGLISH_LEVELS = [
  { name: NONE_ENGLISH_LEVEL_SYMBOL, id: '0' },
  { name: '1', id: '1' }, { name: '2', id: '2' }, { name: '3', id: '3' }, { name: '4', id: '4' }, { name: '5', id: '5' }
];
export const MAX_LENGTH_ENGLISH_COMMENT = 100;
export const MAX_LENGTH_LANGUAGE_COMMENT = 999;
export const MAX_LENGTH_MESSAGE = `0 Text exceeds ${MAX_LENGTH_ENGLISH_COMMENT} character limit`;
export const MAX_LENGTH_LANGUAGE_MESSAGE = `0 ${MAX_LENGTH_LANGUAGE_COMMENT} character limit`;
export const ENGLISH_COMMENT_VALIDATORS = [Validators.maxLength(MAX_LENGTH_ENGLISH_COMMENT)];

export const NUMBER_OF_LANGUAGES_FIELDS = 4;
