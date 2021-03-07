<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i><!--icone e estilo q sera colocado-->
        </div>
        <div class="stat-info">
            <span class="stat-title">{{ title }}</span>
            <span class="stat-value">{{ value }}</span><!--valor q foi mostrado no componente span-->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],//propriedades do array.. do home onde tem categoria artigos usuarios
    computed: {
        style() {/*estilo das cores passadas nos icones se não for passada || cor preta */
            return "color: " + (this.color || "#000")
        }
    }
}
</script>

<style>
    .stat {
        flex: 1;/*para crescer de acordo com a necessidade */
        display: flex;/*manter se alinhados modo flex um do lado do outro pois padrão linha */
        border-radius: 8px;/*arredondar um pouco */
        margin-right: 20px;/*espaçamento direita pra não grudar */
        margin-bottom: 20px;/*ao ter quebra de linha não fica grudado os flex */
        background-color: #FFF;/*cor de fundo dos 3 categ. artigos usuar. */
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);/*borda preta em linha solid */
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);/*sombreamento basico */
    }

    .stat-icon {/*editar os icones categoria artigos usuarios */
        display: flex;
        align-items: center;
    }

    .stat-icon i {/*editar os icones categoria artigos usuarios */
        font-size: 5rem;/*aumenta tamanho dos icones */
    }

    .stat-info {/*iformaçoes de titulos categorias artigos usuarios e valores tbm*/
        flex: 1;
        display: flex;
        flex-direction: column;/*coluna titulo em cima valor em baixo */
        align-items: flex-end;/*informaçoes final do flex box */
    }

    .stat-title {
        font-size: 1.2rem;
    }

    .stat-value {
        font-size: 3rem;
    }
</style>
