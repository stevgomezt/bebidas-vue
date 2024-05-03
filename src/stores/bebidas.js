import { ref, onMounted, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useBebidasStore = defineStore("bebidas", () => {
    const categorias = ref([]);

    const busqueda = reactive({
        nombre: "",
        categoria: "",
    });

    onMounted(async () => {
        const {
            data: { drinks },
        } = await axios.get(
            "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
        );
        // console.log(data);
        categorias.value = drinks;
    });

    const obtenerRecetas = () => {
        console.log("Consultando Api...");
    };

    return {
        categorias,
        busqueda,
        obtenerRecetas,
    };
});
