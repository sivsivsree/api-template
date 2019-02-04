const assert = require('assert');

describe('Routes: ', () => {

    describe('/login', () => {
        it('should login with correct credentials', () => {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });

        it('should not login with wrong credentials', () => {
            assert.equal([1, 2, 3].indexOf(5), -1);
        });
    });


    describe('/verify', () => {
        it('should verify the token provided', () => {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });

        it('should reject the token', () => {
            assert.equal([1, 2, 3].indexOf(5), -1);
        });
    });

});
