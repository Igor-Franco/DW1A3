function Produto (nome, descricao, preco, coodigo){
    Object.defineProperties (this,{ 
        nome: {
            value: nome,
            enumerable: true,
            writable: true,
            configurable: true
        },
        descricao:{
            value: descricao,  
            enumerable: true,
            writable: true,
            configurable: true
        },
        preco:{
            value: preco,
            enumerable: true,
            writable: true,
            configurable: true
        },
        coodigo:{
            value: coodigo,
            enumerable: true,
            writable: false,
            configurable: false
        }
    });

}

Produto.prototype.calcularDesconto = function(desconto){
    return this.preco * (1 - desconto/100);
}

Produto.prototype.aumentarPreco = function(percentual){
    return this.preco * (1 + percentual/100);
}

const produto1 = new Produto('Camiseta', 'Camiseta preta', 100, 1234);
const produto2 = new Produto('Calça', 'Calça jeans', 50, 2345); 
const produto3 = new Produto('Bermuda', 'Bermuda preta', 30, 3456);

console.log(produto1.calcularDesconto(10)); // Aplica 10% de desconto
console.log(produto2.aumentarPreco(15)); // Aumenta o preço em 15%
console.log(produto3.aumentarPreco(5)); // Aumenta o preço em 5%
