export const stringHasTag = (string: string): boolean => ['@', '#', '&'].includes(string[0]);

export const stringHasUrl = (string: string): boolean =>
	new RegExp('([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?').test(string);

export const delay = (millisec:number) => {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}

export const EMAIL_VALIDATOR = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
export const HASHTAG_VALIDATOR = /[`~!@#$%^&*()|+\-=?;:'",.<>{}[]\\\/\s]/gi;
export const validateHashtagInput = (q = ''): string => q.toLowerCase().replace(HASHTAG_VALIDATOR, '');
export const validateEmailInput = (q: string): boolean => q.match(EMAIL_VALIDATOR) && q.match(EMAIL_VALIDATOR)?.length ? true : false;
