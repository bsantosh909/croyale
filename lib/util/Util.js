const _tagCharacters = ['0', '2', '8', '9', 'P', 'Y', 'L', 'Q', 'G', 'R', 'J', 'C', 'U', 'V'];

class Util {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    static verifyTag(tag) {
        if (!tag) throw new Error('Invalid usage! Must provide the tag');
        if (typeof tag !== 'string') throw new TypeError('Tag must be string');
        tag = tag.toUpperCase().replace('#', '').replace(/O/g, '0');
        for (var i = 0; i < tag.length; i++) {
            if (!_tagCharacters.includes(tag[i])) throw new Error(`The tag you provided has some invalid character. Make sure it contains only the following characters: "${_tagCharacters.join(', ')}"`);
        }
        return tag;
    }

}

module.exports = Util;
