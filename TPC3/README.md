# TPC1 : Mapa das Ruas de Braga
## 2024-02-05

## Autor
- a100665
- Tiago Nuno de Magalhães Teixeira

## Resumo

 - 1. Análise do dataset, e parsing dos dados para um novo json sem erros de sintaxe, e com três dicionários diferentes: filmes, generos e actores, normalização do dataset
 - 2. Incialização do json-server, que serve três rotas, cada uma corresponde a cada dicionário mencionado previamente.
 - 3. Servico que reponde ás seguintes rotas:
        -> GET / -> Listagem dos 3 dicionários (páginas) existentes, com links
        -> GET /filmes -> listagem de filmes (cada linha é um link para a página do filme)
        -> /filmes/idFilme
            /generos -> Listagem dos géneros existentes e dos filmes que estao etiquetados com esse mesmo género
            /generos/idGen
            /actores -> 
            /actores/idAtor
