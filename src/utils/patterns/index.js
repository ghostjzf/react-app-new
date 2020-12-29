import { each, camelCase } from 'lodash-es';

const urlPipe = '(?:[0-9a-z_-]+\\.)*';

const regs = {
    // 支持中文域名邮箱
    email: '(?![\\-_.])[\\w\\-.]+@(?:(?![\\-_])[\\w\\-\u4e00-\u9fa5]{1,63}\\.)+[A-Za-z0-9]{2,}',

    phone: '\\+?[0-9]+-?[0-9]{3,18}(?:-[0-9]{1,8})?',

    cn: '[\u4e00-\u9fa5]+',

    chinaName: '[\u4e00-\u9fa5]{2,7}(?:\u00B7[\u4e00-\u9fa5]{1,7}){0,2}', // 买买提-啦啦啦

    mobile:
        '(?:12593|12520|10193|17900|17911|17951|125930|125200|101930|179000|179110|179510|\\+?86)?' +
        '1' +
        '[3456789]' +
        '[0-9]{9}',

    idcard: '[xX0-9]{18}',
    otherIdCard: '[a-zA-Z0-9]{5,30}',
    qq: '[0-9]{5,10}',
    number: '[0-9]+(?:\\.[0-9]+)?',
    version: '[0-9a-zA-Z]+(?:\\.[0-9a-zA-Z]+)*',
    pinyin: '[a-zA-Z]+',
    safeUrl: `(?:(?:https?://)?${urlPipe}(?:laohu8\\.com|tigerbrokers\\.com|itiger\\.com))?(?:/(?!/).*)?`
};

const patterns = {};

each(regs, (pattern, name) => {
    const reg = new RegExp(`^${pattern}$`);

    patterns[camelCase(`is-${name}`)] = (str) => reg.test(str);
    patterns[name] = reg;
});

export default patterns;
