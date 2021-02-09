<template>
    <footer class="footer">
        <span>Copyright <strong>Cod3r</strong> © 2015-2018</span>
    </footer>
</template>

<script>
export default {
    name: "Footer" //nome do componente
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;/*centralizando no cros ax ou no box*/
        justify-content: flex-end;/*np final site lado direito */
        padding-right: 10px;/*espaçamento para não ficar colado a direita site */
    }
</style>
