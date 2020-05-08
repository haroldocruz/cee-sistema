
describe('testando...', ()=>{
    beforeEach(()=>{
        var sei = require('./controller')
    })

    function helloWorld(){
        return "ola mundao"
    }
    
    it('teste 1', ()=>{
        expect(helloWorld()).toEqual('ola mundao');
    });
    
    it('teste 2', ()=>{
        expect(helloWorld()).toEqual('ola mundo');
    });
    
    it('teste 3', ()=>{
        expect(helloWorld()).toEqual('ola mundao');
    });
});