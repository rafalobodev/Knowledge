module.exports = {//implementar aqui pronto as consultas com seus nomes
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}

/*WITH RECURSIVE: caso ocorra união de dados
subcategories: nome da tabela tendo apenas um id
pega id de pai categoria
UNION combinar os conjuntos de duas ou mais consultas no banco de dados e remove as linhas duplicadas entre as coisas feitas. 
O UNION ALL faz a mesma coisa mas não remove as linhas duplicadas.
junta subcategories com categories c
parentId: com camelCase coloca aspas igual subcategories.id para encontras do pai as filhas categorias
              SELECT id FROM subcategories
*/
