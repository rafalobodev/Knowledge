<template><!--conteudo da administração do sistema-->
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" /><!--fa fa-cogs:engrenagem-->
        <div class="admin-pages-tabs">
            <b-card no-body><!--pegas no bootstrapvue.. cria uma area branca para cria tabelas  -->
                <b-tabs card><!--opçoes de card ou abas dentro da mesma pagina desta tabela abaixo os b-tabs-->
                    <b-tab title="Artigos" active>
                        <ArticleAdmin />
                    </b-tab><!--ArticleAdmin: referencia dos arquivos com tabela de cada aba-->
                    <b-tab title="Categorias">
                        <CategoryAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'//importando todos os 3 do cadastro adm aqui na page principal da tabela
import UserAdmin from './UserAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin }
}
</script>

<style>

</style>
