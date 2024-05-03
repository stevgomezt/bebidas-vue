import { ref, onMounted, reactive } from "vue";
import { defineStore } from "pinia";
import ApiServices from "../services/ApiServices";
import { useModalStore } from "./modal.js";

export const useBebidasStore = defineStore("bebidas", () => {
    const modal = useModalStore();

    const categorias = ref([]);

    const busqueda = reactive({
        nombre: "",
        categoria: "",
    });

    const recetas = ref([]);

    const receta = ref({});

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
        receta.value = drinks[0];

        modal.handleClickModal();
    };

    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida,
        receta
    };
});
