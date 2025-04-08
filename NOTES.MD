
## ajustes -> poderiamos chamar de requisitos não funcionais? Verificar melhor isso.

[x] - criar no repositorio abstrato findContactsByProfession - sem paginação- para exportação.

[x] - pensar melhor forma de conduzir o método/consulta findByProfession, com ou sem paginação, sem ter de recriar outro (no momento está assim.) -> Solução:
    - Por enquanto deixar da forma como está aplicada no repository(contacts-repository.ts)

[x] - Paginar, totalizar a busca de contatos por cultivation
[x] - o delimitador no field Cultivos do Excel, tem de ser troca ',' por algo como: '/' ou '|' -> Solução :
    - Na exportação do arquivo .xlsx por padrão o app que o exporta (libreoffice ou Excel), ja entende que a coluna Cultivos tera 1 ou mais valores separados por vírgula (',') e transformara tudo em um campo string (fechado em "") quando exportar para .csv. Solucionado!

[] - Analisar melhor os nomes das use-case (fetch-contacts-all.ts/fetch-cultivations-all.ts)

[] - Verificar SE, QUANDO e COMO exportar para o excel com o conteudo de contacts inteiro.

[] - Exportar tambem o campo phone do contact para excel.
[] - Implementar a nova pagina (front) onde mostra um modal ou algo parecido conforme o ID do contato, e seus respectivos detalhes. Implementar essa funcionalidade no backend tambem
## ESTUDAR CI/CD
    -> COMEÇAR A SUBIR O PROJETO BACK-END PARA GITHUB []



 
## IMPORTANTÍSSIMO
Sempre que quiser preservar os dados antes de mexer em containers, use este comando para fazer um backup completo do banco:


docker exec -t <nome_do_container> pg_dump -U docker -d aaccin > backup.sql


## NOMEAR VOLUMES NO docker-compose.yml



## RESTAURAR BD POSTGRESQL
cat backup.sql | docker exec -i aaccin_api-solid-pg3-1 psql -U docker -d aaccin
