# TPC1 : Mapa das Ruas de Braga
## 2024-02-05

## Autor
- a100665
- Tiago Nuno de Magalhães Teixeira

## Resumo

- Neste trabalho foi inicialmente feito o parsing do ficheiro <b>mapa_virtual.json</b>. 
Com dados contidos no mesmo, foram criadas uma página para cada cidade, e uma página <b>home</b> com todas as cidades listadas, com recurso a um script em python.
De seguida, utilizamos um ficheiro ".js" para criar um servidor que corre no localhost, mais especificamente na porta <b>7780</b>, e que gere todas as chamadas feitas pelo cliente, respondendo com as páginas pretendidas.


- Página principal:
    - lista alfabética de cidades
    Cada cidadade é um link da forma: <li><a href="http:localhost:7778/c3">Braga</a>
        / => Pág. inicial
        /c1 => Pág. da cidade c1

    Página da cidade:
        - nome, id, distrito, população
        - ligação (link para abrir a página)
    

