<script setup>

</script>

<template>
    <div class="view-container">
        <div class="up-divider">
        </div>
        <div class="table-container">
            <div class="table-content">
                <hot-table :data="data" :rowHeaders="true" :colHeaders="true"></hot-table>
            </div>
        </div>
    </div>
</template>

<style>
    .view-container {
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .table-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .up-divider {
        position: absolute;
        height: 50vh;
        width: 100vw;
        background-color: #41B883;
        z-index: -1;
    }
    .table-content {
        width: 70vw;
        height: 60vh;
        box-shadow: 0px 0px 60px 40px rgb(34 60 80 / 20%);
    }
</style>