import { ref, onMounted, reactive } from "vue";
import { defineStore } from "pinia";
import ApiServices from "../services/ApiServices";

export const useBebidasStore = defineStore("bebidas", () => {
    const categorias = ref([]);

    const busqueda = reactive({
        nombre: "",
        categoria: "",
    });

    const recetas = ref([]);

    onMounted(async () => {
        const {
            data: { drinks },
        } = await ApiServices.obtenerCategorias();
        // console.log(data);
        categorias.value = drinks;
    });

    const obtenerRecetas = async () => {
        const {
            data: { drinks },
        } = await ApiServices.buscarRecetas(busqueda);
        // console.log(drinks);
        recetas.value = drinks;
    };

    const seleccionarBebida = async (id) => {
        // console.log(id);
        const {
            data: { drinks },
        } = await ApiServices.buscarReceta(id);
        console.log(drinks[0]);
    };

    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida,
    };
});
