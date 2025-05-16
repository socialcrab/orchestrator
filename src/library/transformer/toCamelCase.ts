/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';

export const camelize = (obj: Record<string, any>) =>
	_.transform(obj, (acc: Record<string, any>, value, key: string, target) => {
		const camelKey = _.isArray(target) ? key : _.camelCase(key);
		acc[camelKey] = _.isObject(value) ? camelize(value) : value;
	});

export function capitalizeWords(str: any) {
	return str.replace(/\b\w/g, (match:any) => match.toUpperCase());
}
	
