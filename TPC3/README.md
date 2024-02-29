# TPC1 : Mapa das Ruas de Braga
## 2024-02-05

## Autor
- a100665
- Tiago Nuno de Magalhães Teixeira

## Resumo

 - 1. Análise do dataset e criação da BD em json.server -> talvez não servir diretamente pelo servidor node, porque vai dar jeito ter redundância para responder a certas questões
 - 2. Aplicar normalização? Cuidado com estruturas aninhadas
 - 3. Servico que reponde ás seguintes rotas:
        -> GET /filmes -> listagem de filmes (cada linha é um link para a página do filme)
        -> /filmes/idFilme
            /generos
            /generos/idGen
            /ator
            /ator/idAtor


        filme -> cast, genre, title, year.