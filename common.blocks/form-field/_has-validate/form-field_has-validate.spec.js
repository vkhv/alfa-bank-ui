modules.define('spec', ['spec__utils', 'input', 'message', 'form-field'], function(provide, utils) {

    describe('form-field_has-validate', function() {

        var block, bemjson;

        beforeEach(function() {
            bemjson = {
                block : 'form-field',
                    mods : {
                    'has-validate' : true
                }
            };
        });

        afterEach(function() {
            block && utils.destruct(block);
        });

        it('should not throw without `type` mod', function() {
            block = utils.buildBlock('form-field', bemjson);
            block.getVal().should.equal('');
        });

        it('should validate on blur', function() {
            bemjson.mods.type = 'input';
            bemjson.mods.message = 'text';
            bemjson.content = {
                elem : 'control',
                content : {
                    block : 'input',
                    val : 'XXX'
                }
            };
            block = utils.buildBlock('form-field', bemjson);
            block.getControl().elem('control').focus();
            block.getVal().should.equal('XXX');

            var spy = sinon.spy(block, 'validate');
            block.getControl().elem('control').blur();
            block.getDirty().should.be.false; // value was not changed
            (!!spy.called).should.be.false; // validate should not be called if value is not dirty

            block.setVal('YYY');
            block.getControl().elem('control').blur();
            block.getDirty().should.be.true;
            (!!spy.called).should.be.true;
        });

        it('should call show message when changes status focused', function() {
            bemjson.mods.type = 'input';
            bemjson.mods.message = 'text';
            bemjson.content = {
                elem : 'control',
                content : {
                    block : 'input',
                    val : 'XXX'
                }
            };
            block = utils.buildBlock('form-field', bemjson);
            block.getControl().elem('control').focus();
            var spy = sinon.spy(block.getMessage(), 'show');
            block._updateStatus();
            (!!spy.called).should.be.true;
        });

    });

    provide();
});